import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { getUserBookings, createBooking, updateBookingStatus } from '@/services';
import type { Booking } from '@/utils/schemas';

// Hook to fetch user's bookings
export const useUserBookings = () => {
  return useQuery({
    queryKey: queryKeys.booking.all,
    queryFn: getUserBookings,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (newBooking) => {
      // Invalidate and refetch bookings list
      queryClient.invalidateQueries({ queryKey: queryKeys.booking.all });
    },
    onError: (error) => {
      console.error('Failed to create booking:', error);
    },
  });
};

// Hook to update booking status
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) => 
      updateBookingStatus(bookingId, status),
    onSuccess: (updatedBooking, { bookingId }) => {
      // Update the specific booking in cache
      queryClient.setQueryData(
        queryKeys.booking.detail(bookingId),
        updatedBooking
      );
      
      // Invalidate bookings list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.booking.all });
    },
    onError: (error) => {
      console.error('Failed to update booking status:', error);
    },
  });
};
