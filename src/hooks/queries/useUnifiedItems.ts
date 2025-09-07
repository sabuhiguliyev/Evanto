import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { queryKeys } from '@/lib/queryClient';
import { getEvents, getMeetups } from '@/services';
import type { UnifiedItem } from '@/types/UnifiedItem';

// Hook to fetch unified items (events + meetups)
export const useUnifiedItems = (filters?: Record<string, any>) => {
  const eventsQuery = useQuery({
    queryKey: queryKeys.events.list(filters || {}),
    queryFn: () => getEvents(),
    staleTime: 2 * 60 * 1000,
  });

  const meetupsQuery = useQuery({
    queryKey: queryKeys.meetups.list(filters || {}),
    queryFn: () => getMeetups(),
    staleTime: 2 * 60 * 1000,
  });

  // Combine events and meetups into unified items
  const unifiedItems = useMemo(() => {
    const events = eventsQuery.data || [];
    const meetups = meetupsQuery.data || [];
    
    const eventItems: UnifiedItem[] = events.map(event => ({
      ...event,
      type: 'event' as const,
    }));
    
    const meetupItems: UnifiedItem[] = meetups.map(meetup => ({
      ...meetup,
      type: 'meetup' as const,
    }));
    
    return [...eventItems, ...meetupItems];
  }, [eventsQuery.data, meetupsQuery.data]);

  return {
    data: unifiedItems,
    isLoading: eventsQuery.isLoading || meetupsQuery.isLoading,
    isError: eventsQuery.isError || meetupsQuery.isError,
    error: eventsQuery.error || meetupsQuery.error,
    refetch: () => {
      eventsQuery.refetch();
      meetupsQuery.refetch();
    },
  };
};

// Hook to fetch a single unified item by ID
export const useUnifiedItem = (id: string) => {
  const eventsQuery = useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => getEvents().then(events => events.find(e => e.id === id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const meetupsQuery = useQuery({
    queryKey: queryKeys.meetups.detail(id),
    queryFn: () => getMeetups().then(meetups => meetups.find(m => m.id === id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const unifiedItem = useMemo(() => {
    if (eventsQuery.data) {
      return { ...eventsQuery.data, type: 'event' as const };
    }
    if (meetupsQuery.data) {
      return { ...meetupsQuery.data, type: 'meetup' as const };
    }
    return undefined;
  }, [eventsQuery.data, meetupsQuery.data]);

  return {
    data: unifiedItem,
    isLoading: eventsQuery.isLoading || meetupsQuery.isLoading,
    isError: eventsQuery.isError || meetupsQuery.isError,
    error: eventsQuery.error || meetupsQuery.error,
  };
};
