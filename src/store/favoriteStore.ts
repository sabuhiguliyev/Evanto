import { create } from 'zustand';
import { addFavorite, deleteFavorite, fetchFavorites } from '@/utils/supabaseService';
import useUserStore from '@/store/userStore';
import type { UnifiedItem } from '@/types/UnifiedItem';

type Favorite = {
    item_id: string;
    online: boolean;
    user_id: string;
};

type FavoriteStore = {
    favorites: Favorite[];
    toggleFavorite: (item: UnifiedItem) => Promise<void>;
    loadFavorites: () => Promise<void>;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => {
    const user = useUserStore.getState().user!;

    return {
        favorites: [],
        toggleFavorite: async item => {
            const isFavorite = get().favorites.some(fav => fav.item_id === item.id);
            if (isFavorite) {
                await deleteFavorite(item, user.id);
            } else {
                await addFavorite(item, user.id);
            }
            await get().loadFavorites();
        },
        loadFavorites: async () => {
            const result = await fetchFavorites(user.id);
            set({
                favorites: result.map(fav => ({
                    item_id: fav.item_id,
                    online: fav.online,
                    user_id: user.id,
                })),
            });
        },
    };
});
