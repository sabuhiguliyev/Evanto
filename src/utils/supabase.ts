import { createClient } from '@supabase/supabase-js';
import type { Event } from '@/types/Event';

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

export const fetchEvents = async (): Promise<Event[]> => {
    const { data, error } = await supabase.from('events').select('*');
    if (error || !data) throw error;

    return data.map(event => ({
        ...event,
        member_avatars: event.member_avatars ?? [],
        member_count: event.member_count ?? 0,
        category: event.category ?? '',
        event_image: event.event_image ?? '',
        ticket_price: event.ticket_price ?? '',
        start_date: event.start_date ? new Date(event.start_date) : null,
        end_date: event.end_date ? new Date(event.end_date) : null,
        featured: event.featured ?? false,
        organizer: event.organizer ?? '',
    }));
};
