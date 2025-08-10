import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import type { UnifiedItem } from '@/types/UnifiedItem';
import { useFavoriteStore } from '@/store/favoriteStore';

export const useFavoritesQuery = (userId?: string) => {
    const { setFavorites } = useFavoriteStore();

    return useQuery<UnifiedItem[]>({
        queryKey: ['favorites', userId],
        queryFn: async () => {
            if (!userId) return [];

            const { data: favorites, error } = await supabase
                .from('favorites')
                .select('item_id, online')
                .eq('user_id', userId);

            if (error || !favorites) return [];

            const eventPromises = favorites
                .filter(f => !f.online)
                .map(f => supabase.from('events').select('*').eq('id', f.item_id).single());

            const meetupPromises = favorites
                .filter(f => f.online)
                .map(f => supabase.from('meetups').select('*').eq('id', f.item_id).single());

            const results = await Promise.all([...eventPromises, ...meetupPromises]);

            const data = results
                .filter(res => res.data)
                .map(res => ({
                    ...res.data!,
                    type: 'meetup_name' in res.data! ? 'meetup' : 'event',
                }));

            setFavorites(data);
            return data;
        },
        enabled: !!userId,
    });
};
