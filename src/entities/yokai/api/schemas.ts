import { z } from 'zod';

export const yokaiSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string(),
  status: z.enum(['active', 'captured']),
});

export const yokaiListSchema = z.array(yokaiSchema);

export const captureResponseSchema = z.object({
  success: z.boolean(),
  yokaiId: z.string(),
  capturedAt: z.string(),
});

export const sseEventSchema = z.object({
  yokaiId: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  timestamp: z.string(),
});
