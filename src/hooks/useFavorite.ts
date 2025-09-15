// hooks/useFavorite.ts
import { useUserStore } from '@/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, fetchFavorites } from '@/services';
import type { UnifiedItem } from '@/utils/schemas';

type Favorite = {
    item_id: string;
    item_type: 'event' | 'meetup';
    user_id: string;
};

export function useFavorite(itemId?: string | null | undefined | number, itemType?: 'event' | 'meetup') {
    const { user } = useUserStore();
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading, error } = useQuery<Favorite[]>({
        queryKey: ['favorites', user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            return await fetchFavorites(user.id);
        },
        enabled: !!user?.id,
    });

    const toggle = useMutation({
        mutationFn: async () => {
            if (!user?.id || !itemId || !itemType) return;

            // Ensure user profile exists in database before adding favorite
            try {
                const { fetchUserProfile } = await import('@/services');
                await fetchUserProfile();
            } catch (error) {
                console.log('Could not ensure user profile:', error);
            }

            const isCurrentlyFavorite = favorites.some(fav => fav.item_id === itemId.toString());

            if (isCurrentlyFavorite) {
                await deleteFavorite(itemId.toString(), user.id);
            } else {
                await addFavorite(itemId.toString(), user.id, itemType);
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
        onError: (error) => {
            console.error('Failed to toggle favorite:', error);
        },
    });

    return {
        favorites,
        isFavorite: itemId ? favorites.some(fav => fav.item_id === itemId.toString()) : false,
        toggle: toggle.mutate,
        isLoading: isLoading || toggle.isPending,
        isEnabled: !!user?.id && !!itemId && !!itemType,
    };
}
