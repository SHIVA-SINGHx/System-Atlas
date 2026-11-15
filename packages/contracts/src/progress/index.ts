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
});
export type UserLearningStats = z.infer<typeof UserLearningStatsSchema>;
