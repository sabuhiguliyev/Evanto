import { z } from 'zod';
import { meetupSchema } from '@/utils/schemas';

export type Meetup = z.infer<typeof meetupSchema>;
