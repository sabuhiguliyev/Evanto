import { create } from 'zustand';
import { supabase } from '@/utils/supabase';
import type { UnifiedItem } from '@/types/UnifiedItem';

type FavoriteStore = {
    favorites: UnifiedItem[];
    addFavorite: (item: UnifiedItem, userId: string) => Promise<void>;
    removeFavorite: (id: string | number, userId: string) => Promise<void>;
    isFavorite: (id: string | number) => boolean;
    setFavorites: (items: UnifiedItem[]) => void;
    fetchFavorites: (userId: string) => Promise<void>;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],

    addFavorite: async (item, userId) => {
        const { error } = await supabase
            .from('favorites')
            .insert([{ user_id: userId, item_id: item.id, online: false }]);

        if (!error) {
            set({ favorites: [...get().favorites, item] });
        }
        console.log(get().favorites, 'Favorites after adding');
    },

    removeFavorite: async (id, userId) => {
        const { error } = await supabase.from('favorites').delete().match({ item_id: id, user_id: userId });

        if (!error) {
            set({ favorites: get().favorites.filter(fav => fav.id !== id) });
        }
    },

    fetchFavorites: async userId => {
        const { data: favorites, error } = await supabase
            .from('favorites')
            .select('item_id, online')
            .eq('user_id', userId);

        if (!error && favorites) {
            const eventIds = favorites.filter(f => !f.online).map(f => f.item_id);
            const meetupIds = favorites.filter(f => f.online).map(f => f.item_id);

            const { data: events } =
                eventIds.length > 0 ? await supabase.from('events').select('*').in('id', eventIds) : { data: [] };

            const { data: meetups } =
                meetupIds.length > 0 ? await supabase.from('meetups').select('*').in('id', meetupIds) : { data: [] };

            set({ favorites: [...(events || []), ...(meetups || [])] });
        }
    },

    isFavorite: id => {
        return get().favorites.some(fav => fav.id === id);
    },

    setFavorites: items => {
        set({ favorites: items });
    },
}));
