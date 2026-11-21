import { z } from 'zod';
import { DifficultyLevelSchema } from '../common';
export type { DifficultyLevel } from '../common';

export const ResourceCategorySchema = z.enum([
  'DOCUMENTATION',
  'GITHUB_REPO',
  'ENGINEERING_BLOG',
  'BOOK',
  'BOOK_REFERENCE',
  'UNIVERSITY_COURSE',
  'VIDEO_TUTORIAL',
  'VIDEO_DEEP_DIVE',
  'INTERVIEW_PREP',
  'SYSTEM_DESIGN_CASE_STUDY',
  'DSA_RESOURCE',
  'ARTICLE',
  'WHITE_PAPER',
  'TOOLING',
]);
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;

export const ContentStatusSchema = z.enum([
  'DRAFT',
  'IN_REVIEW',
  'APPROVED',
  'REJECTED',
  'PUBLISHED',
]);
export type ContentStatus = z.infer<typeof ContentStatusSchema>;

export const ResourceSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  url: z.string().url(),
  category: ResourceCategorySchema,
  relatedTopics: z.array(z.string()).default([]),
  difficulty: DifficultyLevelSchema.default('INTERMEDIATE'),
  contentType: z.string().default('article'),
  author: z.string().optional().nullable(),
  publisher: z.string().optional().nullable(),
  license: z.string().optional().nullable(),
  attribution: z.string().optional().nullable(),
  lastVerifiedDate: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  publishedYear: z.number().int().optional().nullable(),
  status: ContentStatusSchema.default('PUBLISHED'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});
export type Resource = z.infer<typeof ResourceSchema>;

export const CreateResourceDtoSchema = ResourceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateResourceDto = z.infer<typeof CreateResourceDtoSchema>;

// Content Ingestion Pipeline Schemas
export const IngestionJobStatusSchema = z.enum([
  'PENDING',
  'VALIDATING',
  'FETCHING',
  'PARSED',
  'FAILED',
  'APPROVED',
  'REJECTED',
]);
export type IngestionJobStatus = z.infer<typeof IngestionJobStatusSchema>;

export const IngestionAuditEntrySchema = z.object({
  timestamp: z.string(),
  action: z.string(),
  actor: z.string(),
  details: z.string().optional(),
});
export type IngestionAuditEntry = z.infer<typeof IngestionAuditEntrySchema>;

export const IngestionJobSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  domain: z.string(),
  status: IngestionJobStatusSchema,
  robotsAllowed: z.boolean().default(true),
  licenseNotes: z.string().optional().nullable(),
  extractedTitle: z.string().optional().nullable(),
  extractedDescription: z.string().optional().nullable(),
  extractedHeadings: z.array(z.string()).default([]),
  extractedTopics: z.array(z.string()).default([]),
  contentSummary: z.string().optional().nullable(),
  editorialNotes: z.string().optional().nullable(),
  submittedBy: z.string(),
  reviewedBy: z.string().optional().nullable(),
  reviewedAt: z.string().nullable().optional(),
  failureReason: z.string().optional().nullable(),
  auditLog: z.array(IngestionAuditEntrySchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type IngestionJob = z.infer<typeof IngestionJobSchema>;

export const CreateIngestionJobDtoSchema = z.object({
  url: z.string().url(),
  editorialNotes: z.string().optional(),
});
export type CreateIngestionJobDto = z.infer<typeof CreateIngestionJobDtoSchema>;

export const ReviewIngestionJobDtoSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT']),
  editorialNotes: z.string().optional(),
  targetModule: z.enum(['SYSTEM_DESIGN', 'DSA', 'RESOURCE_ONLY']).default('RESOURCE_ONLY'),
  editedTitle: z.string().optional(),
  editedDescription: z.string().optional(),
  editedCategory: ResourceCategorySchema.optional(),
  verifiedLicense: z.string().optional(),
});
export type ReviewIngestionJobDto = z.infer<typeof ReviewIngestionJobDtoSchema>;
