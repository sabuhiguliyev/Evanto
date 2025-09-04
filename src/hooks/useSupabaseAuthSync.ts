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
                // Google OAuth user metadata received successfully
                
                // Try to get Google profile picture using the provider_id
                let avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || user.user_metadata?.photo_url;
                
                // If no avatar from metadata, try to construct Google profile picture URL
                if (!avatarUrl && user.user_metadata?.provider_id) {
                    // Try multiple Google avatar URL patterns
                    const googleId = user.user_metadata.provider_id;
                    avatarUrl = `https://lh3.googleusercontent.com/a/default-user=${googleId}`;
                }
                
                setUser({
                    id: user.id,
                    email: user.email ?? '',
                    avatar_url: avatarUrl,
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name,
                });
            }
        });

        // Real-time auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session?.user;
            if (user) {
                // Auth state change - Google OAuth user metadata received
                
                // Try to get Google profile picture using the provider_id
                let avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || user.user_metadata?.photo_url;
                
                // If no avatar from metadata, try to construct Google profile picture URL
                if (!avatarUrl && user.user_metadata?.provider_id) {
                    // Try multiple Google avatar URL patterns
                    const googleId = user.user_metadata.provider_id;
                    avatarUrl = `https://lh3.googleusercontent.com/a/default-user=${googleId}`;
                }
                
                setUser({
                    id: user.id,
                    email: user.email ?? '',
                    avatar_url: avatarUrl,
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name,
                });
            } else {
                setUser(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, [setUser]);
}
