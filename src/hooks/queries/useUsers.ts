import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { getUsers, createUser, updateUser, deleteUser } from '@/services';
import type { User } from '@/utils/schemas';

// Hook to fetch all users
export const useUsers = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getUsers(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to fetch a single user
export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: async () => {
      const users = await getUsers();
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
      
      // Add the new user to the cache
      queryClient.setQueryData(
        queryKeys.user.profile(),
        newUser
      );
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
};

// Hook to update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) => 
      updateUser(id, updates),
    onSuccess: (updatedUser, { id }) => {
      // Update the specific user in cache
      queryClient.setQueryData(
        queryKeys.user.profile(),
        updatedUser
      );
      
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};

// Hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, deletedId) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: queryKeys.user.profile() });
      
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
    onError: (error) => {
      console.error('Failed to delete user:', error);
    },
  });
};
