import { z } from 'zod';

export const ResourceCategorySchema = z.enum([
  'ARTICLE',
  'WHITE_PAPER',
  'BOOK_REFERENCE',
  'VIDEO_DEEP_DIVE',
  'CASE_STUDY',
  'TOOLING',
]);
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;

export const ResourceSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  url: z.string().url(),
  category: ResourceCategorySchema,
  author: z.string().optional().nullable(),
  tags: z.array(z.string()),
  publishedYear: z.number().int().optional().nullable(),
  createdAt: z.string().datetime(),
});
export type Resource = z.infer<typeof ResourceSchema>;
