import { z } from 'zod';

export const RedisConfigSchema = z.object({
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().default(6379),
  REDIS_PASSWORD: z.string().optional().default(''),
  REDIS_KEY_PREFIX: z.string().default('atlas'),
  REDIS_DEFAULT_TTL_SECONDS: z.coerce.number().int().default(3600),
});
export type RedisConfig = z.infer<typeof RedisConfigSchema>;
