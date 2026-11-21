import { Injectable } from '@nestjs/common';
import { PracticeRepository } from './practice.repository';
import { CodeSandboxService } from './code-sandbox.service';
import {
  CodeExecutionRequest,
  CodeExecutionResult,
  ProblemSubmission,
  DSA_PRACTICE_PROBLEMS,
} from '@system-atlas/contracts';
import { randomUUID } from 'crypto';

@Injectable()
export class PracticeService {
  constructor(
    private readonly repo: PracticeRepository,
    private readonly sandbox: CodeSandboxService,
  ) {}

  async runCode(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    return this.sandbox.executeCode(request, false);
  }

  async submitSolution(userId: string, request: CodeExecutionRequest): Promise<{
    result: CodeExecutionResult;
    submission: ProblemSubmission;
    isNewSolve: boolean;
  }> {
    const result = await this.sandbox.executeCode(request, true);

    const submission: ProblemSubmission = {
      id: randomUUID(),
      userId,
      problemSlug: request.problemSlug,
      language: request.language,
      code: request.code,
      status: result.status,
      runtimeMs: result.runtimeMs,
      memoryKb: result.memoryKb,
      passedTestCases: result.passedTestCases,
      totalTestCases: result.totalTestCases,
      createdAt: new Date().toISOString(),
    };

    this.repo.saveSubmission(submission);

    let isNewSolve = false;
    if (result.status === 'ACCEPTED') {
      const problem = DSA_PRACTICE_PROBLEMS.find((p) => p.slug === request.problemSlug);
      const difficulty = problem?.difficulty || 'EASY';
      const existing = this.repo.getUserSolvedProblems(userId).some((p) => p.problemSlug === request.problemSlug);
      if (!existing) {
        this.repo.recordSolved(userId, request.problemSlug, difficulty);
        isNewSolve = true;
      }
    }

    return { result, submission, isNewSolve };
  }

  getSubmissions(userId: string, problemSlug?: string): ProblemSubmission[] {
    return this.repo.getSubmissions(userId, problemSlug);
  }

  getUserStats(userId: string) {
    const solved = this.repo.getUserSolvedProblems(userId);
    const easy = solved.filter((s) => s.difficulty === 'EASY').length;
    const medium = solved.filter((s) => s.difficulty === 'MEDIUM').length;
    const hard = solved.filter((s) => s.difficulty === 'HARD').length;

    return {
      totalSolved: solved.length,
      easy,
      medium,
      hard,
      solvedSlugs: solved.map((s) => s.problemSlug),
    };
  }
}
