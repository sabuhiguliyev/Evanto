import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://clehbjayiqmhpeazcrqg.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZWhiamF5aXFtaHBlYXpjcnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTcwNDksImV4cCI6MjA2NDQ5MzA0OX0.T8sHPbnZoa3CDMHKjonjjQEcg3QB-K8qEyLxaFVhVY0';
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true, // Crucial for session creation
        autoRefreshToken: true,
        detectSessionInUrl: false, // Set to true if using OAuth
    },
});

export const handleEvent = async (eventData: Partial<Event> & { id?: string }, isUpdate?: boolean) => {
    const { data, error } = isUpdate
        ? await supabase.from('events').update(eventData).eq('id', eventData.id)
        : await supabase.from('events').insert([eventData]).select();

    if (error) throw error;
    return data?.[0];
};
