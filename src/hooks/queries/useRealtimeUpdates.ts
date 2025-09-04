import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { supabase } from '@/utils/supabase';

// Hook to set up real-time subscriptions for events and meetups
export const useRealtimeUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to events table changes
    const eventsChannel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
        },
        (payload) => {
          console.log('Event change received:', payload);
          
          // Invalidate events queries to refetch data
          queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
          
          // If it's an update or delete, also invalidate the specific event
          if (payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            queryClient.invalidateQueries({ 
              queryKey: queryKeys.events.detail(payload.old.id) 
            });
          }
          
          // If it's an insert, add to cache
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData(
              queryKeys.events.detail(payload.new.id),
              payload.new
            );
          }
        }
      )
      .subscribe();

    // Subscribe to meetups table changes
    const meetupsChannel = supabase
      .channel('meetups-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'meetups',
        },
        (payload) => {
          console.log('Meetup change received:', payload);
          
          // Invalidate meetups queries to refetch data
          queryClient.invalidateQueries({ queryKey: queryKeys.meetups.lists() });
          
          // If it's an update or delete, also invalidate the specific meetup
          if (payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            queryClient.invalidateQueries({ 
              queryKey: queryKeys.meetups.detail(payload.old.id) 
            });
          }
          
          // If it's an insert, add to cache
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData(
              queryKeys.meetups.detail(payload.new.id),
              payload.new
            );
          }
        }
      )
      .subscribe();

    // Subscribe to bookings table changes
    const bookingsChannel = supabase
      .channel('bookings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          console.log('Booking change received:', payload);
          
          // Invalidate user bookings
          queryClient.invalidateQueries({ queryKey: queryKeys.user.bookings() });
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(meetupsChannel);
      supabase.removeChannel(bookingsChannel);
    };
  }, [queryClient]);
};

// Hook to set up real-time updates for a specific user's data
export const useUserRealtimeUpdates = (userId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    // Subscribe to user's bookings
    const userBookingsChannel = supabase
      .channel(`user-${userId}-bookings`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('User booking change received:', payload);
          queryClient.invalidateQueries({ queryKey: queryKeys.user.bookings() });
        }
      )
      .subscribe();

    // Subscribe to user's favorites
    const userFavoritesChannel = supabase
      .channel(`user-${userId}-favorites`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorites',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('User favorite change received:', payload);
          queryClient.invalidateQueries({ queryKey: queryKeys.user.favorites() });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(userBookingsChannel);
      supabase.removeChannel(userFavoritesChannel);
    };
  }, [userId, queryClient]);
};
