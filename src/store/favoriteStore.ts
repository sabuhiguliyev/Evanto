import { create } from 'zustand';
import { supabase } from '@/utils/supabase';
import type { UnifiedItem } from '@/types/UnifiedItem';

type FavoriteStore = {
    favorites: UnifiedItem[];
    toggleFavorite: (item: UnifiedItem, userId: string) => Promise<boolean>;
    setFavorites: (items: UnifiedItem[]) => void;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],
    toggleFavorite: async (item, userId) => {
        const isFavorite = get().favorites.some(fav => fav.id === item.id);

        if (isFavorite) {
            const { error } = await supabase.from('favorites').delete().match({ item_id: item.id, user_id: userId });

            if (!error) {
                set({ favorites: get().favorites.filter(fav => fav.id !== item.id) });
                return true;
            }
        } else {
            const { error } = await supabase.from('favorites').insert([
                {
                    user_id: userId,
                    item_id: item.id,
                    online: item.type === 'meetup',
                },
            ]);

            if (!error) {
                set({ favorites: [...get().favorites, item] });
                return true;
            }
        }
        return false;
    },
    setFavorites: items => set({ favorites: items }),
}));
