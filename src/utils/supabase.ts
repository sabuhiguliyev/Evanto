import { createClient } from '@supabase/supabase-js';

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

export async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data || [];
}

export async function fetchMeetups() {
    const { data, error } = await supabase.from('meetups').select('*');
    if (error) throw error;
    return data || [];
}
