import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useUserStore } from '@/store/userStore';

export const useSupabaseAuthSync = () => {
    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        // Check localStorage for existing session
        const storedSession = localStorage.getItem('sb-zbtxsoiubkfjkaakljgt-auth-token');
        if (storedSession) {
            try {
                const session = JSON.parse(storedSession);
                const user = session?.user;
                if (user) {
                    setUser({
                        id: user.id,
                        email: user.email ?? '',
                        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
                        full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
                    });
                    return;
                }
            } catch (error) {
                console.log('Error parsing stored session:', error);
            }
        }
        
        setUser(null);

        // Real-time auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const user = session?.user;
            if (user) {
                // Try to get user profile from database first
                try {
                    const { fetchUserProfile } = await import('@/services');
                    const userProfile = await fetchUserProfile();
                    if (userProfile) {
                        setUser(userProfile);
                        return;
                    }
                } catch (error) {
                    console.log('Could not fetch user profile, using auth data');
                }
                
                // Fallback to auth session data
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
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
                });
            } else {
                setUser(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, [setUser]);
};