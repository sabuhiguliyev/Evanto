import { z } from 'zod';
import { eventSchema } from '@/utils/schemas';

export type Event = z.infer<typeof eventSchema>;
