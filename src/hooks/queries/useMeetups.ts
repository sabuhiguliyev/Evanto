import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { getMeetups, createMeetup, updateMeetup, deleteMeetup } from '@/services';
import type { Meetup } from '@/utils/schemas';

// Hook to fetch all meetups
export const useMeetups = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: queryKeys.meetups.list(filters || {}),
    queryFn: () => getMeetups(),
    staleTime: 2 * 60 * 1000, // 2 minutes for meetups
  });
};

// Hook to fetch a single meetup
export const useMeetup = (id: string) => {
  return useQuery({
    queryKey: queryKeys.meetups.detail(id),
    queryFn: () => getMeetups().then(meetups => meetups.find(m => m.id === id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for individual meetups
  });
};

// Hook to create a new meetup
export const useCreateMeetup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createMeetup,
    onSuccess: (newMeetup) => {
      // Invalidate and refetch meetups list
      queryClient.invalidateQueries({ queryKey: queryKeys.meetups.lists() });
      
      // Add the new meetup to the cache
      queryClient.setQueryData(
        queryKeys.meetups.detail(newMeetup.id!),
        newMeetup
      );
    },
    onError: (error) => {
      console.error('Failed to create meetup:', error);
    },
  });
};

// Hook to update a meetup
export const useUpdateMeetup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Meetup> }) => 
      updateMeetup(id, updates),
    onSuccess: (updatedMeetup, { id }) => {
      // Update the specific meetup in cache
      queryClient.setQueryData(
        queryKeys.meetups.detail(id),
        updatedMeetup
      );
      
      // Invalidate meetups list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.meetups.lists() });
    },
    onError: (error) => {
      console.error('Failed to update meetup:', error);
    },
  });
};

// Hook to delete a meetup
export const useDeleteMeetup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteMeetup,
    onSuccess: (_, deletedId) => {
      // Remove the meetup from cache
      queryClient.removeQueries({ queryKey: queryKeys.meetups.detail(deletedId) });
      
      // Invalidate meetups list
      queryClient.invalidateQueries({ queryKey: queryKeys.meetups.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete meetup:', error);
    },
  });
};
