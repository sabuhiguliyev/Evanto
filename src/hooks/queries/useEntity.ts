import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';

type EntityType = 'events' | 'meetups';

interface UseEntityOptions<T> {
  entityType: EntityType;
  getItems: () => Promise<T[]>;
  getItem: (id: string) => Promise<T | undefined>;
  createItem: (data: any) => Promise<T>;
  updateItem: (id: string, data: any) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
}

export function useEntity<T>({ 
  entityType, 
  getItems, 
  getItem, 
  createItem, 
  updateItem, 
  deleteItem 
}: UseEntityOptions<T>) {
  // Hook to fetch all items
  const useItems = (filters?: Record<string, any>) => {
    return useQuery({
      queryKey: queryKeys[entityType].list(filters || {}),
      queryFn: () => getItems(),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  // Hook to fetch a single item
  const useItem = (id: string) => {
    return useQuery({
      queryKey: queryKeys[entityType].detail(id),
      queryFn: () => getItem(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Hook to create a new item
  const useCreateItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: createItem,
      onSuccess: (newItem: any) => {
        // Invalidate and refetch items list
        queryClient.invalidateQueries({ queryKey: queryKeys[entityType].lists() });
        
        // Add the new item to the cache
        queryClient.setQueryData(
          queryKeys[entityType].detail(newItem.id!),
          newItem
        );
      },
      onError: (error) => {
        console.error(`Failed to create ${entityType}:`, error);
      },
    });
  };

  // Hook to update an item
  const useUpdateItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ id, updates }: { id: string; updates: Partial<T> }) => 
        updateItem(id, updates),
      onSuccess: (updatedItem: any, { id }) => {
        // Update the specific item in cache
        queryClient.setQueryData(
          queryKeys[entityType].detail(id),
          updatedItem
        );
        
        // Invalidate items list to ensure consistency
        queryClient.invalidateQueries({ queryKey: queryKeys[entityType].lists() });
      },
      onError: (error) => {
        console.error(`Failed to update ${entityType}:`, error);
      },
    });
  };

  // Hook to delete an item
  const useDeleteItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: deleteItem,
      onSuccess: (_, deletedId) => {
        // Remove the item from cache
        queryClient.removeQueries({ queryKey: queryKeys[entityType].detail(deletedId) });
        
        // Invalidate items list
        queryClient.invalidateQueries({ queryKey: queryKeys[entityType].lists() });
      },
      onError: (error) => {
        console.error(`Failed to delete ${entityType}:`, error);
      },
    });
  };

  return {
    useItems,
    useItem,
    useCreateItem,
    useUpdateItem,
    useDeleteItem,
  };
}
