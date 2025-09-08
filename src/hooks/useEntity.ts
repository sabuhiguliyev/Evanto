import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';

// Generic CRUD hook configuration
interface EntityConfig<T> {
  entityName: string;
  listQueryKey: readonly unknown[];
  detailQueryKey: (id: string) => readonly unknown[];
  listService: () => Promise<T[]>;
  detailService: (id: string) => Promise<T>;
  createService: (data: Omit<T, 'id' | 'created_at' | 'updated_at'>) => Promise<T>;
  updateService: (id: string, data: Partial<T>) => Promise<T>;
  deleteService: (id: string) => Promise<void>;
  staleTime?: number;
}

// Generic list hook
export const useEntityList = <T>(config: EntityConfig<T>) => {
  return useQuery({
    queryKey: config.listQueryKey,
    queryFn: config.listService,
    staleTime: config.staleTime || 2 * 60 * 1000,
  });
};

// Generic detail hook
export const useEntityDetail = <T>(config: EntityConfig<T>, id: string) => {
  return useQuery({
    queryKey: config.detailQueryKey(id),
    queryFn: () => config.detailService(id),
    enabled: !!id,
    staleTime: config.staleTime || 5 * 60 * 1000,
  });
};

// Generic create hook
export const useEntityCreate = <T>(config: EntityConfig<T>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: config.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.listQueryKey });
    },
  });
};

// Generic update hook
export const useEntityUpdate = <T>(config: EntityConfig<T>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => 
      config.updateService(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: config.listQueryKey });
      queryClient.invalidateQueries({ queryKey: config.detailQueryKey(id) });
    },
  });
};

// Generic delete hook
export const useEntityDelete = <T>(config: EntityConfig<T>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: config.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: config.listQueryKey });
    },
  });
};

// Generic CRUD hook factory
export const createEntityHooks = <T>(config: EntityConfig<T>) => {
  return {
    useList: () => useEntityList(config),
    useDetail: (id: string) => useEntityDetail(config, id),
    useCreate: () => useEntityCreate(config),
    useUpdate: () => useEntityUpdate(config),
    useDelete: () => useEntityDelete(config),
  };
};
