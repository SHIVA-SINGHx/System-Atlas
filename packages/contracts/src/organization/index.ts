import { z } from 'zod';

export const OrgRoleSchema = z.enum(['OWNER', 'ADMIN', 'MEMBER']);
export type OrgRole = z.infer<typeof OrgRoleSchema>;

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  clerkOrgId: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(2).max(100),
  logoUrl: z.string().url().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Organization = z.infer<typeof OrganizationSchema>;

export const OrgMembershipSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  role: OrgRoleSchema,
  joinedAt: z.string().datetime(),
});
export type OrgMembership = z.infer<typeof OrgMembershipSchema>;

export const CreateOrganizationDtoSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(2).max(100),
  logoUrl: z.string().url().optional(),
});
export type CreateOrganizationDto = z.infer<typeof CreateOrganizationDtoSchema>;
