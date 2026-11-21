import { z } from 'zod';
import { DifficultyLevelSchema } from '../common';
export type { DifficultyLevel } from '../common';

export const TopicCategorySchema = z.enum(['SYSTEM_DESIGN', 'DSA']);
export type TopicCategory = z.infer<typeof TopicCategorySchema>;

export const CodeSnippetsSchema = z.object({
  cpp: z.string().default(''),
  java: z.string().default(''),
  python: z.string().default(''),
  javascript: z.string().default(''),
});
export type CodeSnippets = z.infer<typeof CodeSnippetsSchema>;

export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number().int().min(0),
  explanation: z.string(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const InterviewQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  companies: z.array(z.string()).default([]),
  difficulty: DifficultyLevelSchema.default('INTERMEDIATE'),
});
export type InterviewQuestion = z.infer<typeof InterviewQuestionSchema>;

export const PracticeExerciseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  difficulty: DifficultyLevelSchema,
  hint: z.string().optional(),
});
export type PracticeExercise = z.infer<typeof PracticeExerciseSchema>;

export const TopicSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string(),
  category: TopicCategorySchema.default('SYSTEM_DESIGN'),
  order: z.number().int().min(0),
  icon: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
  createdAt: z.string().datetime(),
});
export type Topic = z.infer<typeof TopicSchema>;

export const LessonSchema = z.object({
  id: z.string().uuid(),
  topicId: z.string().uuid(),
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string(),
  category: TopicCategorySchema.default('SYSTEM_DESIGN'),
  contentMarkdown: z.string(),
  analogy: z.string().optional().nullable(),
  dryRunMarkdown: z.string().optional().nullable(),
  codeSnippets: CodeSnippetsSchema.optional().nullable(),
  timeComplexity: z.string().optional().nullable(),
  spaceComplexity: z.string().optional().nullable(),
  commonMistakes: z.array(z.string()).default([]),
  interviewQuestions: z.array(InterviewQuestionSchema).default([]),
  practiceExercises: z.array(PracticeExerciseSchema).default([]),
  revisionNotes: z.string().optional().nullable(),
  quizQuestions: z.array(QuizQuestionSchema).default([]),
  provenance: z.string().optional().nullable(),
  difficulty: DifficultyLevelSchema.default('BEGINNER'),
  estimatedMinutes: z.number().int().positive().default(15),
  order: z.number().int().min(0),
  isPublished: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const CreateTopicDtoSchema = TopicSchema.omit({ id: true, createdAt: true });
export type CreateTopicDto = z.infer<typeof CreateTopicDtoSchema>;

export const CreateLessonDtoSchema = LessonSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateLessonDto = z.infer<typeof CreateLessonDtoSchema>;

// DSA Practice Problem Schemas
export const ProblemDifficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);
export type ProblemDifficulty = z.infer<typeof ProblemDifficultySchema>;

export const ProblemExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});
export type ProblemExample = z.infer<typeof ProblemExampleSchema>;

export const ProblemTestCaseSchema = z.object({
  id: z.string().optional(),
  input: z.string(),
  expectedOutput: z.string(),
  isHidden: z.boolean().default(false),
});
export type ProblemTestCase = z.infer<typeof ProblemTestCaseSchema>;

export const DSAPracticeProblemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  difficulty: ProblemDifficultySchema,
  topicSlug: z.string(),
  description: z.string(),
  constraints: z.array(z.string()),
  examples: z.array(ProblemExampleSchema),
  hints: z.array(z.string()),
  starterCode: CodeSnippetsSchema,
  testCases: z.array(ProblemTestCaseSchema),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type DSAPracticeProblem = z.infer<typeof DSAPracticeProblemSchema>;

export * from './dsa-curriculum-data';
