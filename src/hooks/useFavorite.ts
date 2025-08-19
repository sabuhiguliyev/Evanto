// hooks/useFavorite.ts
import useUserStore from '@/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, fetchFavorites } from '@/utils/supabaseService';
import type { UnifiedItem } from '@/types/UnifiedItem';

type Favorite = {
    item_id: string;
    online: boolean;
    user_id: string;
};

export function useFavorite(itemId?: string | null | undefined | number) {
    const { user } = useUserStore();
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading } = useQuery<Favorite[]>({
        queryKey: ['favorites', user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            return await fetchFavorites(user.id);
        },
        enabled: !!user?.id,
    });

    const toggle = useMutation({
        mutationFn: async () => {
            if (!user?.id || !itemId) return;

            const isCurrentlyFavorite = favorites.some(fav => fav.item_id === itemId);

            if (isCurrentlyFavorite) {
                await deleteFavorite({ id: itemId } as UnifiedItem, user.id);
            } else {
                await addFavorite({ id: itemId } as UnifiedItem, user.id);
            }
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({
                    queryKey: ['favorites', user?.id],
                });
            } catch (error) {
                console.error('Failed to invalidate queries:', error);
            }
        },
    });

    return {
        favorites,
        isFavorite: itemId ? favorites.some(fav => fav.item_id === itemId) : false,
        toggle: toggle.mutate,
        isLoading: isLoading || toggle.isPending,
        isEnabled: !!user?.id && !!itemId,
    };
}
