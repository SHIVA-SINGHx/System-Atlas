import { z, ZodSchema } from 'zod';
import * as dotenv from 'dotenv';

export function loadAndValidateConfig<T>(schema: ZodSchema<T>, envFilePath?: string): T {
  if (envFilePath) {
    dotenv.config({ path: envFilePath });
  } else {
    dotenv.config();
  }

  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid Environment Configuration:', result.error.format());
    throw new Error('Service startup aborted due to missing or invalid environment variables.');
  }
  return result.data;
}
