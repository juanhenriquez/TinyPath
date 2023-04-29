import { z } from 'zod';

export const serverSchema = z.object({
  baseUrl: z.string(),
  clerk: z.object({
    secretKey: z.string(),
    publishableKey: z.string(),
  }),
});

export const clientSchema = z.object({
  baseUrl: z.string(),
  clerk: z.object({
    publishableKey: z.string(),
  }),
});
