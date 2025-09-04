import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';

// Base properties that all items have
interface BaseItem {
  id?: string | null;
  user_id?: string;
  category: string;
  featured: boolean;
  description?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

// Event-specific properties
interface EventItem extends BaseItem {
  type: 'event';
  title: string;
  start_date: Date;
  end_date: Date;
  ticket_price?: number;
  image?: string; // Changed from event_image to match schema
  member_avatars?: string[];
  member_count?: number;
  online?: boolean;
  max_participants?: number;
}

// Meetup-specific properties
interface MeetupItem extends BaseItem {
  type: 'meetup';
  meetup_name: string;
  meetup_date: Date;
  meetup_time?: string;
  meetup_price?: number;
  meetup_image?: string;
  description?: string;
  online: boolean;
  meetup_link?: string;
  member_avatars?: string[];
  member_count?: number;
}

// Unified item type that includes all possible properties
export type UnifiedItem = EventItem | MeetupItem;

// Helper type for accessing properties safely
export type UnifiedItemProperties = {
  // Common properties
  id?: string | null;
  user_id?: string;
  category: string;
  featured: boolean;
  description?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  
  // Event properties (optional for meetups)
  title?: string;
  start_date?: Date;
  end_date?: Date;
  ticket_price?: number;
  image?: string; // Changed from event_image to match schema
  member_avatars?: string[];
  member_count?: number;
  online?: boolean;
  max_participants?: number;
  
  // Meetup properties (optional for events)
  meetup_name?: string;
  meetup_date?: Date;
  meetup_time?: string;
  meetup_price?: number;
  meetup_image?: string;
  description?: string;
  meetup_link?: string;
  
  // Type discriminator
  type: 'event' | 'meetup';
};
