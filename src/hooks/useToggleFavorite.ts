import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavoriteStore } from '@/store/favoriteStore';
import type { UnifiedItem } from '@/types/UnifiedItem';

export const useToggleFavorite = (userId?: string) => {
    const queryClient = useQueryClient();
    const { toggleFavorite } = useFavoriteStore();

    return useMutation({
        mutationFn: async (item: UnifiedItem) => {
            if (!userId) throw new Error('User not authenticated');
            return await toggleFavorite(item, userId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['favorites', userId],
            });
        },
    });
};
