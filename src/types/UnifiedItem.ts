import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';

export type UnifiedItem = (Event & { type: 'event' }) | (Meetup & { type: 'meetup' });
