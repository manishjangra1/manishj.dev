import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('http://localhost:3000'),
  GITHUB_TOKEN: z.string().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.warn('Environment validation warning:', result.error.format());
    return process.env;
  }
  return result.data;
}

export const env = validateEnv();
