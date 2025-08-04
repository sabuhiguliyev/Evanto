import type { Event } from './Event';
import type { Meetup } from './Meetup';

export type UnifiedItem = (Event & { type: 'event' }) | (Meetup & { type: 'meetup' });
