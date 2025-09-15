import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getMeetups, 
  createMeetup, 
  updateMeetup, 
  deleteMeetup,
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserBookings, 
  createBooking, 
  updateBookingStatus,
  getSeatAvailability,
  fetchUserStats
} from '@/services';
import { queryKeys } from '@/lib/queryClient';
import { createEntityHooks } from './useEntity';
import type { Event, Meetup, User, Booking } from '@/utils/schemas';
import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';

// Event entity configuration
export const eventConfig = {
  entityName: 'events',
  listQueryKey: [...queryKeys.events.list({})],
  detailQueryKey: (id: string) => [...queryKeys.events.detail(id)],
  listService: getEvents,
  detailService: async (id: string) => {
    const events = await getEvents();
    const event = events.find(e => e.id === id);
    if (!event) throw new Error('Event not found');
    return event;
  },
  createService: createEvent,
  updateService: updateEvent,
  deleteService: deleteEvent,
  staleTime: 2 * 60 * 1000,
};

// Meetup entity configuration
export const meetupConfig = {
  entityName: 'meetups',
  listQueryKey: [...queryKeys.meetups.list({})],
  detailQueryKey: (id: string) => [...queryKeys.meetups.detail(id)],
  listService: getMeetups,
  detailService: async (id: string) => {
    const meetups = await getMeetups();
    const meetup = meetups.find(m => m.id === id);
    if (!meetup) throw new Error('Meetup not found');
    return meetup;
  },
  createService: createMeetup,
  updateService: updateMeetup,
  deleteService: deleteMeetup,
  staleTime: 2 * 60 * 1000,
};

// User entity configuration
export const userConfig = {
  entityName: 'users',
  listQueryKey: [...queryKeys.user.all],
  detailQueryKey: (id: string) => [...queryKeys.user.profile()],
  listService: getUsers,
  detailService: async (id: string) => {
    const users = await getUsers();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },
  createService: createUser,
  updateService: updateUser,
  deleteService: deleteUser,
  staleTime: 2 * 60 * 1000,
};

// Booking entity configuration
export const bookingConfig = {
  entityName: 'bookings',
  listQueryKey: [...queryKeys.booking.all],
  detailQueryKey: (id: string) => [...queryKeys.booking.detail(id)],
  listService: getUserBookings,
  detailService: async (id: string) => {
    const bookings = await getUserBookings();
    const booking = bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
  },
  createService: createBooking,
  updateService: async (id: string, data: Partial<Booking>) => {
    // For bookings, we only update status
    if ('status' in data && typeof data.status === 'string') {
      return updateBookingStatus(id, data.status as "pending" | "confirmed" | "cancelled" | "refunded");
    }
    throw new Error('Only status updates are supported for bookings');
  },
  deleteService: async (id: string) => {
    throw new Error('Booking deletion not implemented');
  },
  staleTime: 2 * 60 * 1000,
};

// Generated entity hooks
const eventHooks = createEntityHooks<Event>(eventConfig);
const meetupHooks = createEntityHooks<Meetup>(meetupConfig);
const userHooks = createEntityHooks<User>(userConfig);
const bookingHooks = createEntityHooks<Booking>(bookingConfig);

// Export individual hooks
export const useEvents = eventHooks.useList;
export const useEvent = eventHooks.useDetail;
export const useCreateEvent = eventHooks.useCreate;
export const useUpdateEvent = eventHooks.useUpdate;
export const useDeleteEvent = eventHooks.useDelete;

export const useMeetups = meetupHooks.useList;
export const useMeetup = meetupHooks.useDetail;
export const useCreateMeetup = meetupHooks.useCreate;
export const useUpdateMeetup = meetupHooks.useUpdate;
export const useDeleteMeetup = meetupHooks.useDelete;

export const useUsers = userHooks.useList;
export const useUser = userHooks.useDetail;
export const useCreateUser = userHooks.useCreate;
export const useUpdateUser = userHooks.useUpdate;
export const useDeleteUser = userHooks.useDelete;

export const useBookings = bookingHooks.useList;
export const useBooking = bookingHooks.useDetail;
export const useCreateBooking = bookingHooks.useCreate;
export const useUpdateBooking = bookingHooks.useUpdate;
export const useDeleteBooking = bookingHooks.useDelete;

// Additional centralized hooks for specialized functions
export const useSeatAvailability = (eventId: string) => {
  return useQuery({
    queryKey: ['seatAvailability', eventId],
    queryFn: () => getSeatAvailability(eventId),
    enabled: !!eventId,
    staleTime: 30 * 1000, // 30 seconds for real-time data
  });
};

export const useUserStats = (userId?: string) => {
  return useQuery({
    queryKey: ['userStats', userId],
    queryFn: () => fetchUserStats(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
};

