import { z } from 'zod';

export const DifficultyLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']);
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

export const TopicSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string(),
  order: z.number().int().min(0),
  icon: z.string().optional().nullable(),
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
});
export type Topic = z.infer<typeof TopicSchema>;

export const LessonSchema = z.object({
  id: z.string().uuid(),
  topicId: z.string().uuid(),
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string(),
  contentMarkdown: z.string(),
  difficulty: DifficultyLevelSchema,
  estimatedMinutes: z.number().int().positive(),
  order: z.number().int().min(0),
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const CreateTopicDtoSchema = TopicSchema.omit({ id: true, createdAt: true });
export type CreateTopicDto = z.infer<typeof CreateTopicDtoSchema>;

export const CreateLessonDtoSchema = LessonSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateLessonDto = z.infer<typeof CreateLessonDtoSchema>;
