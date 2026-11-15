import { z } from 'zod';

export const ArchitectureProjectSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid().nullable(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  isPublic: z.boolean().default(false),
  nodes: z.array(z.record(z.unknown())).default([]),
  edges: z.array(z.record(z.unknown())).default([]),
  viewport: z.record(z.unknown()).default({}),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ArchitectureProject = z.infer<typeof ArchitectureProjectSchema>;

export const CreateProjectDtoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  isPublic: z.boolean().default(false),
  nodes: z.array(z.record(z.unknown())).default([]),
  edges: z.array(z.record(z.unknown())).default([]),
  viewport: z.record(z.unknown()).default({}),
});
export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

export const SimulationRequestSchema = z.object({
  projectId: z.string().uuid(),
  trafficRps: z.number().positive().max(1000000),
  durationSeconds: z.number().int().min(5).max(300),
  failoverScenario: z.enum(['NONE', 'AZ_OUTAGE', 'DATABASE_PRIMARY_DOWN', 'CACHE_FLUSH']).default('NONE'),
});
export type SimulationRequest = z.infer<typeof SimulationRequestSchema>;
