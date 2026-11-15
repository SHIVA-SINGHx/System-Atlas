import { z } from 'zod';
import { DifficultyLevelSchema } from '../learning';

export const InterviewProblemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string(),
  requirements: z.string(),
  trafficEstimation: z.string(),
  difficulty: DifficultyLevelSchema,
  companies: z.array(z.string()),
  tags: z.array(z.string()),
  hints: z.array(z.string()),
  rubricCriteria: z.array(z.record(z.unknown())),
  createdAt: z.string().datetime(),
});
export type InterviewProblem = z.infer<typeof InterviewProblemSchema>;

export const QueryInterviewProblemsSchema = z.object({
  difficulty: DifficultyLevelSchema.optional(),
  company: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});
export type QueryInterviewProblems = z.infer<typeof QueryInterviewProblemsSchema>;
