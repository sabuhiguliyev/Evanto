import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { getAllItems, getItemById } from '@/services';
import type { UnifiedItem } from '@/utils/schemas';

// Simplified unified hook using the new service functions
export const useUnifiedItems = (filters?: Record<string, any>) => {
  const query = useQuery({
    queryKey: queryKeys.items.list(filters || {}),
    queryFn: getAllItems,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error) => {
      return failureCount < 2; // Only retry twice
    },
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

// Simplified hook for single item using the new service function
export const useUnifiedItem = (id: string, type: 'event' | 'meetup') => {
  const query = useQuery({
    queryKey: queryKeys.items.detail(id),
    queryFn: () => getItemById(id, type),
    enabled: !!id && !!type,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
