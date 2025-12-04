import { z } from 'zod';
import { yokaiSchema } from '../api/schemas';

export type Yokai = z.infer<typeof yokaiSchema>;
export type YokaiStatus = 'active' | 'captured';
export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';
