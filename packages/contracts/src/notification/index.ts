import { z } from 'zod';

export const NotificationTypeSchema = z.enum([
  'LEARNING_REMINDER',
  'STREAK_AT_RISK',
  'TEAM_INVITATION',
  'SYSTEM_ALERT',
]);
export type NotificationType = z.infer<typeof NotificationTypeSchema>;

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: NotificationTypeSchema,
  title: z.string(),
  body: z.string(),
  isRead: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
});
export type Notification = z.infer<typeof NotificationSchema>;

export const SendNotificationJobPayloadSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  type: NotificationTypeSchema,
  title: z.string(),
  body: z.string(),
  metadata: z.record(z.unknown()).optional(),
});
export type SendNotificationJobPayload = z.infer<typeof SendNotificationJobPayloadSchema>;
