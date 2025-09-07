import { supabase } from '@/utils/supabase';
import { 
  eventSchema, 
  meetupSchema, 
  userSchema,
  bookingSchema,
  type Event, 
  type Meetup, 
  type User,
  type Booking,
  type EventParticipant,
  type MeetupParticipant
} from '@/utils/schemas';

// Simple CRUD functions for events
export const createEvent = async (data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> => {
  const validatedData = eventSchema.omit({ id: true, created_at: true, updated_at: true }).parse(data);
  const { data: result, error } = await supabase
    .from('events')
    .insert(validatedData)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw error;
  return data || [];
};

export const updateEvent = async (id: string, data: Partial<Event>): Promise<Event> => {
  const { data: result, error } = await supabase
    .from('events')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
};

// Simple CRUD functions for meetups
export const createMeetup = async (data: Omit<Meetup, 'id' | 'created_at' | 'updated_at'>): Promise<Meetup> => {
  const validatedData = meetupSchema.omit({ id: true, created_at: true, updated_at: true }).parse(data);
  const { data: result, error } = await supabase
    .from('meetups')
    .insert(validatedData)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const getMeetups = async (): Promise<Meetup[]> => {
  const { data, error } = await supabase.from('meetups').select('*');
  if (error) throw error;
  return data || [];
};

export const updateMeetup = async (id: string, data: Partial<Meetup>): Promise<Meetup> => {
  const { data: result, error } = await supabase
    .from('meetups')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const deleteMeetup = async (id: string): Promise<void> => {
  const { error } = await supabase.from('meetups').delete().eq('id', id);
  if (error) throw error;
};

// Simple CRUD functions for users
export const createUser = async (data: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const validatedData = userSchema.omit({ id: true, created_at: true, updated_at: true }).parse(data);
  const { data: result, error } = await supabase
    .from('users')
    .insert(validatedData)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data || [];
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  const { data: result, error } = await supabase
    .from('users')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const deleteUser = async (id: string): Promise<void> => {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw error;
};

// Join/Leave functions
export const joinEvent = async (userId: string, eventId: string): Promise<EventParticipant> => {
  const { data: result, error } = await supabase
    .from('event_participants')
    .upsert({
      user_id: userId,
      event_id: eventId,
      status: 'joined',
      joined_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const leaveEvent = async (userId: string, eventId: string): Promise<void> => {
  const { error } = await supabase
    .from('event_participants')
    .delete()
    .eq('user_id', userId)
    .eq('event_id', eventId);
  
  if (error) throw error;
};

export const joinMeetup = async (userId: string, meetupId: string): Promise<MeetupParticipant> => {
  const { data: result, error } = await supabase
    .from('meetup_participants')
    .upsert({
      user_id: userId,
      meetup_id: meetupId,
      status: 'joined',
      joined_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const leaveMeetup = async (userId: string, meetupId: string): Promise<void> => {
  const { error } = await supabase
    .from('meetup_participants')
    .delete()
    .eq('user_id', userId)
    .eq('meetup_id', meetupId);
  
  if (error) throw error;
};

// Simple CRUD functions for bookings
export const createBooking = async (data: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'confirmed_at'>): Promise<Booking> => {
  const validatedData = bookingSchema.omit({ id: true, created_at: true, updated_at: true, confirmed_at: true }).parse(data);
  const { data: result, error } = await supabase
    .from('bookings')
    .insert(validatedData)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status']): Promise<Booking> => {
  const updateData: any = { 
    status,
    updated_at: new Date().toISOString(),
    ...(status === 'confirmed' && { confirmed_at: new Date().toISOString() })
  };

  // If cancelling, clear selected_seats to make them available again
  if (status === 'cancelled') {
    updateData.selected_seats = [];
  }

  const { data: result, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

// Payment card functions
export const fetchPaymentCards = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching payment cards:', error);
    return [];
  }
  return data || [];
};

export const createPaymentCard = async (cardData: {
  type: string;
  card_type: string;
  last_four_digits: string;
  expiry_month: number;
  expiry_year: number;
  is_default?: boolean;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // If this is the first card, set it as default
  const existingCards = await fetchPaymentCards();
  const shouldSetDefault = existingCards.length === 0;

  const insertData = {
    type: cardData.type,
    card_type: cardData.card_type,
    last_four_digits: cardData.last_four_digits,
    expiry_month: cardData.expiry_month,
    expiry_year: cardData.expiry_year,
    user_id: user.id,
    is_default: shouldSetDefault,
  };

  const { data, error } = await supabase
    .from('payment_methods')
    .insert(insertData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePaymentCard = async (id: string, cardData: Partial<{
  card_type: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
}>) => {
  const updateData: any = { updated_at: new Date().toISOString() };
  
  if (cardData.card_type !== undefined) updateData.card_type = cardData.card_type;
  if (cardData.expiry_month !== undefined) updateData.expiry_month = cardData.expiry_month;
  if (cardData.expiry_year !== undefined) updateData.expiry_year = cardData.expiry_year;
  if (cardData.is_default !== undefined) updateData.is_default = cardData.is_default;

  const { data, error } = await supabase
    .from('payment_methods')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePaymentCard = async (id: string) => {
  const { error } = await supabase.from('payment_methods').delete().eq('id', id);
  if (error) throw error;
};

export const setDefaultPaymentCard = async (id: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Unset any existing default for this user
  await supabase.from('payment_methods').update({ is_default: false }).eq('user_id', user.id);

  // Set new default for this user
  const { error } = await supabase
    .from('payment_methods')
    .update({ is_default: true })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
};

// Favorites functions
export const fetchFavorites = async (userId: string) => {
  const { data, error } = await supabase.from('favorites').select('item_id,user_id,item_type').eq('user_id', userId);
  if (error) throw error;
  return data || [];
};

export const addFavorite = async (itemId: string, userId: string, itemType: 'event' | 'meetup') => {
  // First check if the favorite already exists
  const { data: existing, error: checkError } = await supabase
    .from('favorites')
    .select('*')
    .eq('item_id', itemId)
    .eq('user_id', userId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existing) {
    // Favorite already exists, return success
    return true;
  }

  // Add the favorite if it doesn't exist
  const { error } = await supabase
    .from('favorites')
    .insert([{ item_id: itemId, user_id: userId, item_type: itemType }]);
  if (error) throw error;
  return true;
};

export const deleteFavorite = async (itemId: string, userId: string) => {
  const { error } = await supabase.from('favorites').delete().match({ item_id: itemId, user_id: userId });
  if (error) throw error;
  return true;
};

// User profile functions
export const fetchUserProfile = async (userId?: string) => {
  let authUser;
  if (userId) {
    const { data } = await supabase.auth.getUser();
    authUser = data.user;
  } else {
    const { data } = await supabase.auth.getUser();
    authUser = data.user;
  }
  
  if (!authUser) return null;

  // First try to fetch existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .maybeSingle();

  if (fetchError) throw fetchError;

  // If user doesn't exist, create them
  if (!existingUser) {
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        avatar_url: authUser.user_metadata?.avatar_url,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) {
      // If it's a duplicate email error, try to fetch the existing user by email
      if (createError.code === '23505' && createError.message.includes('email')) {
        const { data: existingUserByEmail } = await supabase
          .from('users')
          .select('*')
          .eq('email', authUser.email)
          .maybeSingle();
        
        if (existingUserByEmail) {
          return existingUserByEmail;
        }
      }
      throw createError;
    }
    return newUser;
  }

  return existingUser;
};

export const updateUserProfile = async (profileData: {
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  user_interests?: string[];
}) => {
  const { data: { user } } = await supabase.auth.getUser();
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

  // Get bookings count (events user is attending)
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('id')
    .eq('user_id', user.id);

  if (bookingsError) throw bookingsError;

  return {
    events_created: events?.length || 0,
    events_attending: bookings?.length || 0,
    followers: 0,
    following: 0
  };
};
