import { z } from 'zod';
import { serverSchema } from './schema';

const rawEnv = process.env as any;

const PREVIEW_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;

export const BASE_URL =
  process.env.BASE_URL || PREVIEW_URL || 'http://localhost:3000';

const serverEnv: z.infer<typeof serverSchema> = {
  baseUrl: BASE_URL,
  clerk: {
    secretKey: rawEnv.CLERK_SECRET_KEY,
    publishableKey: rawEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
};

const parsed = serverSchema.safeParse(serverEnv);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 4),
  );
  process.exit(1);
}

export const env = parsed.data;
