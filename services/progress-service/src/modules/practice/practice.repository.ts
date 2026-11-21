import { Injectable } from '@nestjs/common';
import { ProblemSubmission, SupportedLanguage, ExecutionStatus } from '@system-atlas/contracts';

interface UserSolvedRecord {
  problemSlug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  solvedAt: string;
}

@Injectable()
export class PracticeRepository {
  // Resilient memory store with optional DB fallback
  private submissions: Map<string, ProblemSubmission[]> = new Map();
  private userSolved: Map<string, Map<string, UserSolvedRecord>> = new Map();

  saveSubmission(submission: ProblemSubmission): void {
    const list = this.submissions.get(submission.userId) || [];
    list.unshift(submission);
    this.submissions.set(submission.userId, list);
  }

  getSubmissions(userId: string, problemSlug?: string): ProblemSubmission[] {
    const list = this.submissions.get(userId) || [];
    if (problemSlug) {
      return list.filter((s) => s.problemSlug === problemSlug);
    }
    return list;
  }

  recordSolved(
    userId: string,
    problemSlug: string,
    difficulty: 'EASY' | 'MEDIUM' | 'HARD',
  ): void {
    if (!this.userSolved.has(userId)) {
      this.userSolved.set(userId, new Map());
    }
    const map = this.userSolved.get(userId)!;
    if (!map.has(problemSlug)) {
      map.set(problemSlug, {
        problemSlug,
        difficulty,
        solvedAt: new Date().toISOString(),
      });
    }
  }

  getUserSolvedProblems(userId: string): UserSolvedRecord[] {
    const map = this.userSolved.get(userId);
    if (!map) return [];
    return Array.from(map.values());
  }
}
