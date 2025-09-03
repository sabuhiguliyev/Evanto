import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/userStore';
import { showError } from '@/utils/notifications';

export default function AuthCallback() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                if (session?.user) {
                    const userData = {
                        id: session.user.id,
                        email: session.user.email || '',
                        full_name: session.user.user_metadata?.full_name,
                        avatar_url: session.user.user_metadata?.avatar_url,
                    };

                    setUser(userData);
                    navigate('/');
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                showError('Authentication failed. Please try again. error: ' + error.message);
            });
    }, [navigate, setUser]);

    return <div>Loading...</div>;
}
