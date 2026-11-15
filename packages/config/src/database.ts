import { z } from 'zod';

export const DatabaseConfigSchema = z.object({
  DATABASE_URL: z.string().url(),
  DB_POOL_MIN: z.coerce.number().int().default(2),
  DB_POOL_MAX: z.coerce.number().int().default(10),
  DB_CONNECTION_TIMEOUT_MS: z.coerce.number().int().default(5000),
});
export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
