import { supabase } from '@/utils/supabase';
import { UnifiedItem } from '@/types/UnifiedItem';

export async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data || [];
}

export async function fetchMeetups() {
    const { data, error } = await supabase.from('meetups').select('*');
    if (error) throw error;
    return data || [];
}

export async function fetchFavorites(userId: string) {
    const { data, error } = await supabase.from('favorites').select('item_id,user_id, online').eq('user_id', userId);
    if (error) throw error;
    return data || [];
}

export async function addFavorite(item: UnifiedItem, userId: string) {
    const { error } = await supabase
        .from('favorites')
        .insert([{ item_id: item.id, user_id: userId, online: item.type === 'meetup' }]);
    if (error) throw error;
    return true;
}

export async function deleteFavorite(item: UnifiedItem, userId: string) {
    const { error } = await supabase.from('favorites').delete().match({ item_id: item.id, user_id: userId });

    if (error) throw error;
    return true;
}
