import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/userStore';

export default function useSupabaseAuthSync() {
    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        // Initial session load
        supabase.auth.getSession().then(({ data }) => {
            const user = data?.session?.user;
            if (user) {
                setUser({
                    id: user.id,
                    email: user.email ?? '',
                    avatar_url: user.user_metadata?.avatar_url,
                    full_name: user.user_metadata?.full_name,
                });
            }
        });

        // Real-time auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session?.user;
            if (user) {
                setUser({
                    id: user.id,
                    email: user.email ?? '',
                    avatar_url: user.user_metadata?.avatar_url,
                    full_name: user.user_metadata?.full_name,
                });
            } else {
                setUser(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, [setUser]);
}
