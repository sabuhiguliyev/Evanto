import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { supabase } from '@/utils/supabase';
import { Container } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/assets/icons/logo.svg?react';
import { Apple, Google, Facebook } from '@mui/icons-material';

function Welcome() {
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();

    const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + '/home',
                scopes: provider === 'google' ? 'openid email profile https://www.googleapis.com/auth/userinfo.profile' : undefined,
                queryParams: provider === 'google' ? {
                    access_type: 'offline',
                    prompt: 'consent',
                    include_granted_scopes: 'true',
                } : undefined,
            },
        });

        if (error) {
            toast.error('OAuth sign-in failed: ' + error.message);
        }
    };

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className="relative min-h-screen">
                <Box className={'flex flex-col gap-6 text-start'}>
                    <Box className="flex justify-center">
                        <Logo className={`w-32 h-32 text-white my-4`} />
                    </Box>
                    
                    <Box className='flex flex-col gap-5'>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/auth/sign-in')}
                            className='font-jakarta h-12 text-base font-medium bg-white bg-opacity-15 text-white'
                        >
                            Sign In
                        </Button>
                        
                        <Button
                            variant="contained"
                            onClick={() => navigate('/auth/sign-up')}
                            className='font-jakarta h-12 text-base font-medium bg-white text-primary'
                        >
                            Sign Up
                        </Button>
                    </Box>
                    
                    <Box className='flex items-center'>
                        <Box className='flex-1 h-px bg-gray-300' />
                        <Typography className='px-4 text-caption font-poppins text-gray-300'>
                            Or continue with
                        </Typography>
                        <Box className='flex-1 h-px bg-gray-300' />
                    </Box>
                    
                    <Box className='flex flex-row items-center justify-center gap-8'>
                        <Button
                            variant="contained"
                            className='w-button-social h-button-social rounded-button-secondary p-0 bg-white bg-opacity-15'
                        >
                            <Apple className='w-6 h-6 text-white' />
                        </Button>
                        
                        <Button
                            variant="contained"
                            onClick={() => handleOAuthSignIn('google')}
                            className='w-button-social h-button-social rounded-button-secondary p-0 bg-white bg-opacity-15'
                        >
                            <Google className='w-6 h-6 text-white' />
                        </Button>
                        
                        <Button
                            variant="contained"
                            className='w-button-social h-button-social rounded-button-secondary p-0 bg-white bg-opacity-15'
                        >
                            <Facebook className='w-6 h-6 text-white' />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Welcome;