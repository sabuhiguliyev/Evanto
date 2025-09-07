import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
      // Retry failed requests
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Events
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.events.lists(), { filters }] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.events.details(), id] as const,
  },
  
  // Meetups
  meetups: {
    all: ['meetups'] as const,
    lists: () => [...queryKeys.meetups.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.meetups.lists(), { filters }] as const,
    details: () => [...queryKeys.meetups.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.meetups.details(), id] as const,
  },
  
  // Unified items (events + meetups)
  items: {
    all: ['items'] as const,
    lists: () => [...queryKeys.items.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.items.lists(), { filters }] as const,
    details: () => [...queryKeys.items.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.items.details(), id] as const,
  },
  
  // User data
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    bookings: () => [...queryKeys.user.all, 'bookings'] as const,
    favorites: () => [...queryKeys.user.all, 'favorites'] as const,
  },
  
  // Bookings
  booking: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.booking.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.booking.lists(), { filters }] as const,
    details: () => [...queryKeys.booking.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.booking.details(), id] as const,
  },
  
  // Categories
  categories: {
    all: ['categories'] as const,
  },
} as const;
