import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { Box, Divider, Button } from '@mui/material';
import { FacebookOutlined, Apple as AppleIcon, Google as GoogleIcon } from '@mui/icons-material';
import { showError, showSuccess } from '@/utils/notifications';
import Container from '../../components/layout/Container';
import Logo from '@/components/icons/logo.svg?react';

function Welcome2() {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            showError(error.message);
            return;
        }

        showSuccess('Google login initiated');
    };

    const handleFacebookLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: { redirectTo: 'http://localhost:5173/auth/callback' },
        });
    };

    return (
        <Container className='bg-primary-1'>
            <Logo className={'flex-grow'} />
            <Box className={'flex w-full flex-col gap-4'}>
                <Button variant={'contained'} className={'bg-[#FFFFFF26]'} onClick={() => navigate('/signin')}>
                    Sign In
                </Button>
                <Button variant={'contained'} className={'bg-white text-primary-1'} onClick={() => navigate('/signup')}>
                    Sign Up
                </Button>
                <Divider className='before:bg-gray-200 after:bg-gray-200 [&_.MuiDivider-wrapper]:text-text-5'>
                    Or continue with
                </Divider>{' '}
                <Box className='flex justify-center gap-4'>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2'>
                        <AppleIcon />
                    </Button>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2' onClick={handleGoogleLogin}>
                        <GoogleIcon />
                    </Button>
                    <Button variant='contained' className='h-10 bg-[#FFFFFF26] p-2' onClick={handleFacebookLogin}>
                        <FacebookOutlined />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Welcome2;
