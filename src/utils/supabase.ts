import { createClient } from '@supabase/supabase-js';
import type { Event } from '@/types/Event';
import type { Meetup } from '@/types/Meetup';

const supabaseUrl = 'https://clehbjayiqmhpeazcrqg.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZWhiamF5aXFtaHBlYXpjcnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTcwNDksImV4cCI6MjA2NDQ5MzA0OX0.T8sHPbnZoa3CDMHKjonjjQEcg3QB-K8qEyLxaFVhVY0';
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
});

interface RawEvent {
    id: string;
    title: string;
    location: string;
    category?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    featured?: boolean | null;
    member_avatars?: string[] | null;
    member_count?: number | string | null;
    ticket_price?: number | string | null;
    description?: string | undefined;
    event_image?: string;
    organizer?: string | null;
}

interface RawMeetup {
    id: number;
    title: string;
    meetup_date?: string | null;
    category?: string | null;
    meetup_name?: string | null;
    created_at?: string;
    user_id?: string;
    meetup_link?: string;
    image_url?: string;
    meetup_description?: string;
    featured?: boolean | null;
}

function normalizeEvent(event: RawEvent): Event {
    return {
        ...event,
        member_avatars: event.member_avatars ?? [],
        member_count: Number(event.member_count) || 0,
        category: event.category ?? '',
        event_image: event.event_image ?? '',
        ticket_price: Number(event.ticket_price) || 0,
        start_date: event.start_date ? new Date(event.start_date) : new Date(0),
        end_date: event.end_date ? new Date(event.end_date) : new Date(0),
        featured: event.featured ?? false,
        description: event.description ?? undefined,
    };
}

function normalizeMeetup(meetup: RawMeetup): Meetup {
    return {
        ...meetup,
        meetup_date: meetup.meetup_date ? new Date(meetup.meetup_date) : new Date(0),
        category: meetup.category ?? '',
        meetup_name: meetup.meetup_name ?? '',
        meetup_link: meetup.meetup_link ?? '',
        image_url: meetup.image_url ?? '',
        meetup_description: meetup.meetup_description ?? '',
        user_id: meetup.user_id ?? '',
        featured: meetup.featured ?? false,
    };
}

export const fetchEvents = async (): Promise<Event[]> => {
    const { data, error } = await supabase.from('events').select('*');
    if (error || !data) throw error;

    return data.map(normalizeEvent);
};

export async function fetchMeetups(): Promise<Meetup[]> {
    const { data, error } = await supabase.from('meetups').select('*');
    if (error || !data) throw error;

    return data.map(normalizeMeetup);
}
