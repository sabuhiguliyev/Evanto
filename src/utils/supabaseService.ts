import { supabase } from '@/utils/supabase';
import { UnifiedItem } from '@/types/UnifiedItem';

export async function fetchEvents() {
    // First fetch events
    const { data: events, error: eventsError } = await supabase.from('events').select('*');
    if (eventsError) throw eventsError;

    // Then fetch participants for each event with user avatars
    const eventsWithParticipants = await Promise.all(
        (events || []).map(async (event) => {
            const { data: participants, error: participantsError } = await supabase
                .from('event_participants')
                .select(`
                    user_id,
                    status
                `)
                .eq('event_id', event.id)
                .eq('status', 'joined');

            if (participantsError) {
                console.error('Error fetching participants for event:', event.id, participantsError);
                return {
                    ...event,
                    member_avatars: [],
                    member_count: 0
                };
            }

            // Extract avatar URLs from participants
            const memberAvatars = participants
                ?.map(p => p.user_id)
                .filter(Boolean) || [];

            return {
                ...event,
                member_avatars: memberAvatars,
                member_count: participants?.length || 0
            };
        })
    );

    return eventsWithParticipants;
}

export async function fetchMeetups() {
    // First fetch meetups
    const { data: meetups, error: meetupsError } = await supabase.from('meetups').select('*');
    if (meetupsError) throw meetupsError;

    // Then fetch participants for each meetup with user avatars
    const meetupsWithParticipants = await Promise.all(
        (meetups || []).map(async (meetup) => {
            const { data: participants, error: participantsError } = await supabase
                .from('meetup_participants')
                .select(`
                    user_id,
                    status
                `)
                .eq('meetup_id', meetup.id)
                .eq('status', 'joined');

            if (participantsError) {
                console.error('Error fetching participants for meetup:', meetup.id, participantsError);
                return {
                    ...meetup,
                    member_avatars: [],
                    member_count: 0
                };
            }

            // Extract avatar URLs from participants
            const memberAvatars = participants
                ?.map(p => p.user_id)
                .filter(Boolean) || [];

            return {
                ...meetup,
                member_avatars: memberAvatars,
                member_count: participants?.length || 0
            };
        })
    );

    return meetupsWithParticipants;
}

export async function fetchFavorites(userId: string) {
    const { data, error } = await supabase.from('favorites').select('item_id,user_id, online').eq('user_id', userId);
    if (error) throw error;
    return data || [];
}

export async function addFavorite(item: UnifiedItem, userId: string) {
    const { error } = await supabase
        .from('favorites')
        .insert([{ item_id: item.id, user_id: userId, online: item.type === 'meetup' }]);
    if (error) throw error;
    return true;
}

export async function deleteFavorite(item: UnifiedItem, userId: string) {
    const { error } = await supabase.from('favorites').delete().match({ item_id: item.id, user_id: userId });

    if (error) throw error;
    return true;
}

// Change from named exports to individual exports
export const fetchPaymentCards = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return [];

    const { data, error } = await supabase
        .from('payment_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

export const createPaymentCard = async (cardData: {
    card_holder: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    card_type: string;
    is_default?: boolean;
}) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // If this is the first card, set it as default
    const existingCards = await fetchPaymentCards();
    const shouldSetDefault = existingCards.length === 0;

    const { data, error } = await supabase
        .from('payment_cards')
        .insert({
            ...cardData,
            user_id: user.id,
            is_default: shouldSetDefault,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};
export const updatePaymentCard = async (
    id: string,
    cardData: Partial<{
        card_holder: string;
        expiry_date: string;
        is_default: boolean;
    }>,
) => {
    const { data, error } = await supabase
        .from('payment_cards')
        .update({ ...cardData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deletePaymentCard = async (id: string) => {
    const { error } = await supabase.from('payment_cards').delete().eq('id', id);

    if (error) throw error;
};

export const setDefaultPaymentCard = async (id: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // Unset any existing default for this user
    await supabase.from('payment_cards').update({ is_default: false }).eq('user_id', user.id);

    // Set new default for this user
    const { error } = await supabase
        .from('payment_cards')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) throw error;
};

export const fetchUserBookings = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return [];

    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

// Profile-related functions
export const fetchUserProfile = async (userId?: string) => {
    let user;
    if (userId) {
        user = { id: userId };
    } else {
        const authUser = (await supabase.auth.getUser()).data.user;
        if (!authUser) return null;
        user = authUser;
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully

    if (error) throw error;
    return data; // This will be null if no user found, instead of throwing an error
};

export const updateUserProfile = async (profileData: {
    full_name?: string;
    bio?: string;
    location?: string;
    avatar_url?: string;
    user_interests?: string[];
}) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('users')
        .update({
            ...profileData,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const fetchUserStats = async (userId?: string) => {
    let user;
    if (userId) {
        user = { id: userId };
    } else {
        const authUser = (await supabase.auth.getUser()).data.user;
        if (!authUser) return null;
        user = authUser;
    }

    // Get events count (events user created)
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('id')
        .eq('user_id', user.id);

    if (eventsError) throw eventsError;

    // Get bookings count (events user is attending) - use booking_id instead of id
    const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('booking_id')  // Changed from 'id' to 'booking_id'
        .eq('user_id', user.id);

    if (bookingsError) throw bookingsError;

    return {
        events_created: events?.length || 0,
        events_attending: bookings?.length || 0,
        followers: 0, // Placeholder for future implementation
        following: 0   // Placeholder for future implementation
    };
};

export const fetchUserEvents = async (userId?: string) => {
    let user;
    if (userId) {
        user = { id: userId };
    } else {
        const authUser = (await supabase.auth.getUser()).data.user;
        if (!authUser) return [];
        user = authUser;
    }

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

export const updateUserPreferences = async (preferences: {
    notifications_enabled?: boolean;
    language?: string;
    dark_mode?: boolean;
}) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('users')
        .update({
            ...preferences,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Event management functions
export const deleteEvent = async (eventId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
        .eq('user_id', user.id); // Ensure user owns the event

    if (error) throw error;
    return { success: true };
};

export const updateEvent = async (eventId: string, updates: any) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('events')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', eventId)
        .eq('user_id', user.id) // Ensure user owns the event
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Meetup management functions
export const deleteMeetup = async (meetupId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
        .from('meetups')
        .delete()
        .eq('id', meetupId)
        .eq('user_id', user.id); // Ensure user owns the meetup

    if (error) throw error;
    return { success: true };
};

export const updateMeetup = async (meetupId: number, updates: any) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('meetups')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', meetupId)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Participant management functions
export const joinEvent = async (eventId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('event_participants')
        .insert({
            event_id: eventId,
            user_id: user.id,
            status: 'joined'
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const leaveEvent = async (eventId: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
        .from('event_participants')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

    if (error) throw error;
    return { success: true };
};

export const joinMeetup = async (meetupId: string) => {  // Changed from number to string
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
        .from('meetup_participants')
        .insert({
            meetup_id: meetupId,
            user_id: user.id,
            status: 'joined'
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const leaveMeetup = async (meetupId: string) => {  // Changed from number to string
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
        .from('meetup_participants')
        .delete()
        .eq('meetup_id', meetupId)
        .eq('user_id', user.id);

    if (error) throw error;
    return { success: true };
};
