import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/userStore';

export default function AuthCallback() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                });
                navigate('/main-page-1');
            }
        });
    }, [navigate, setUser]);

    return <div>Loading...</div>;
}
