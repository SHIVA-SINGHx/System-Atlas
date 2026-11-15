import { z } from 'zod';

export const ServiceBaseConfigSchema = z.object({
  PORT: z.coerce.number().int(),
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  SERVICE_NAME: z.string(),
  SERVICE_VERSION: z.string().default('0.1.0'),
  INTERNAL_SERVICE_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  SENTRY_DSN: z.string().optional(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().optional(),
});
export type ServiceBaseConfig = z.infer<typeof ServiceBaseConfigSchema>;
