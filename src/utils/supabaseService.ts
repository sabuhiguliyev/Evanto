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

// Change from named exports to individual exports
export const fetchPaymentCards = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return [];

    const { data, error } = await supabase
        .from('payment_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

export const createPaymentCard = async (cardData: {
    card_holder: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    card_type: string;
    is_default?: boolean;
}) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // If this is the first card, set it as default
    const existingCards = await fetchPaymentCards();
    const shouldSetDefault = existingCards.length === 0;

    const { data, error } = await supabase
        .from('payment_cards')
        .insert({
            ...cardData,
            user_id: user.id,
            is_default: shouldSetDefault,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};
export const updatePaymentCard = async (
    id: string,
    cardData: Partial<{
        card_holder: string;
        expiry_date: string;
        is_default: boolean;
    }>,
) => {
    const { data, error } = await supabase
        .from('payment_cards')
        .update({ ...cardData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deletePaymentCard = async (id: string) => {
    const { error } = await supabase.from('payment_cards').delete().eq('id', id);

    if (error) throw error;
};

export const setDefaultPaymentCard = async (id: string) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // Unset any existing default for this user
    await supabase.from('payment_cards').update({ is_default: false }).eq('user_id', user.id);

    // Set new default for this user
    const { error } = await supabase
        .from('payment_cards')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) throw error;
};
