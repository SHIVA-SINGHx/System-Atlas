import { z } from 'zod';

export const UserRoleSchema = z.enum(['USER', 'STAFF', 'ADMIN']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  role: UserRoleSchema,
  activeOrganizationId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const SyncClerkUserDtoSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
});
export type SyncClerkUserDto = z.infer<typeof SyncClerkUserDtoSchema>;

export const UpdateProfileDtoSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
  activeOrganizationId: z.string().uuid().optional().nullable(),
});
export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>;
