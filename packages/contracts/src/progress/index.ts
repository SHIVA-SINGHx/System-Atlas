import { z } from 'zod';

export const LessonProgressStatusSchema = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']);
export type LessonProgressStatus = z.infer<typeof LessonProgressStatusSchema>;

export const LessonProgressSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  lessonId: z.string().uuid(),
  status: LessonProgressStatusSchema,
  completedAt: z.string().datetime().nullable(),
  timeSpentSeconds: z.number().int().min(0),
  lastAccessedAt: z.string().datetime(),
});
export type LessonProgress = z.infer<typeof LessonProgressSchema>;

export const UpdateProgressDtoSchema = z.object({
  lessonId: z.string().uuid(),
  status: LessonProgressStatusSchema,
  timeSpentSeconds: z.number().int().min(0).default(0),
});
export type UpdateProgressDto = z.infer<typeof UpdateProgressDtoSchema>;

export const BookmarkSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  lessonId: z.string().uuid(),
  createdAt: z.string().datetime(),
});
export type Bookmark = z.infer<typeof BookmarkSchema>;

export const UserLearningStatsSchema = z.object({
  userId: z.string().uuid(),
  totalLessonsCompleted: z.number().int(),
  totalMinutesSpent: z.number().int(),
  currentStreakDays: z.number().int(),
  longestStreakDays: z.number().int(),
  lastActivityDate: z.string().nullable(),
  // DSA specific progress additions
  dsaSolvedTotal: z.number().int().default(0),
  dsaSolvedEasy: z.number().int().default(0),
  dsaSolvedMedium: z.number().int().default(0),
  dsaSolvedHard: z.number().int().default(0),
});
export type UserLearningStats = z.infer<typeof UserLearningStatsSchema>;

// DSA Code Sandbox Execution & Submissions
export const SupportedLanguageSchema = z.enum(['python', 'javascript', 'cpp', 'java']);
export type SupportedLanguage = z.infer<typeof SupportedLanguageSchema>;

export const ExecutionStatusSchema = z.enum([
  'ACCEPTED',
  'WRONG_ANSWER',
  'TIME_LIMIT_EXCEEDED',
  'MEMORY_LIMIT_EXCEEDED',
  'COMPILATION_ERROR',
  'RUNTIME_ERROR',
]);
export type ExecutionStatus = z.infer<typeof ExecutionStatusSchema>;

export const TestCaseResultSchema = z.object({
  testCaseIndex: z.number().int(),
  input: z.string(),
  expectedOutput: z.string(),
  actualOutput: z.string(),
  passed: z.boolean(),
  executionTimeMs: z.number(),
  errorMessage: z.string().optional().nullable(),
  logs: z.string().optional().nullable(),
});
export type TestCaseResult = z.infer<typeof TestCaseResultSchema>;

export const CodeExecutionRequestSchema = z.object({
  problemSlug: z.string(),
  language: SupportedLanguageSchema,
  code: z.string().max(50000, 'Submitted code exceeds maximum size limit of 50KB'),
  customInput: z.string().optional(),
});
export type CodeExecutionRequest = z.infer<typeof CodeExecutionRequestSchema>;

export const CodeExecutionResultSchema = z.object({
  status: ExecutionStatusSchema,
  runtimeMs: z.number(),
  memoryKb: z.number(),
  passedTestCases: z.number().int(),
  totalTestCases: z.number().int(),
  testResults: z.array(TestCaseResultSchema),
  stdout: z.string().optional().nullable(),
  stderr: z.string().optional().nullable(),
  compileError: z.string().optional().nullable(),
});
export type CodeExecutionResult = z.infer<typeof CodeExecutionResultSchema>;

export const ProblemSubmissionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  problemSlug: z.string(),
  language: SupportedLanguageSchema,
  code: z.string(),
  status: ExecutionStatusSchema,
  runtimeMs: z.number(),
  memoryKb: z.number(),
  passedTestCases: z.number().int(),
  totalTestCases: z.number().int(),
  createdAt: z.string().datetime(),
});
export type ProblemSubmission = z.infer<typeof ProblemSubmissionSchema>;
