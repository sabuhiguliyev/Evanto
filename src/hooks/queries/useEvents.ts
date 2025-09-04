import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/services';
import type { Event } from '@/utils/schemas';

// Hook to fetch all events
export const useEvents = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: queryKeys.events.list(filters || {}),
    queryFn: () => getEvents(),
    staleTime: 2 * 60 * 1000, // 2 minutes for events
  });
};

// Hook to fetch a single event
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => getEvents().then(events => events.find(e => e.id === id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for individual events
  });
};

// Hook to create a new event
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createEvent,
    onSuccess: (newEvent) => {
      // Invalidate and refetch events list
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
      
      // Add the new event to the cache
      queryClient.setQueryData(
        queryKeys.events.detail(newEvent.id!),
        newEvent
      );
    },
    onError: (error) => {
      console.error('Failed to create event:', error);
    },
  });
};

// Hook to update an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Event> }) => 
      updateEvent(id, updates),
    onSuccess: (updatedEvent, { id }) => {
      // Update the specific event in cache
      queryClient.setQueryData(
        queryKeys.events.detail(id),
        updatedEvent
      );
      
      // Invalidate events list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
    onError: (error) => {
      console.error('Failed to update event:', error);
    },
  });
};

// Hook to delete an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: (_, deletedId) => {
      // Remove the event from cache
      queryClient.removeQueries({ queryKey: queryKeys.events.detail(deletedId) });
      
      // Invalidate events list
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete event:', error);
    },
  });
};
