import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { supabase } from '@/utils/supabase';
import { Container } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/assets/icons/logo.svg?react';
import LogoDark from '@/assets/icons/logo-dark.svg?react';
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
            
            <Container className="relative min-h-screen flex items-center justify-center">
                <Box className={'flex flex-col gap-6 items-center text-center w-full max-w-sm'}>
                    <Box className="flex justify-center">
                        {isDarkMode ? (
                            <Logo className="w-24 h-24 my-4" />
                        ) : (
                            <LogoDark className="w-24 h-24 my-4" />
                        )}
                    </Box>
                    
                    <Box className='flex flex-col gap-5 w-full'>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/auth/sign-in')}
                            className={`font-jakarta h-12 text-base font-medium ${
                                isDarkMode 
                                    ? 'bg-white bg-opacity-15 text-white' 
                                    : 'bg-primary text-white'
                            }`}
                        >
                            Sign In
                        </Button>
                        
                        <Button
                            variant="contained"
                            onClick={() => navigate('/auth/sign-up')}
                            className={`font-jakarta h-12 text-base font-medium ${
                                isDarkMode 
                                    ? 'bg-gray-700 text-white border border-gray-600' 
                                    : 'bg-gray-100 text-primary'
                            }`}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    
                    <Box className='flex items-center'>
                        <Box className={`flex-1 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
                        <Typography variant="caption" className={`px-4 font-jakarta ${isDarkMode ? 'text-gray-400' : 'text-muted'}`}>
                            Or continue with
                        </Typography>
                        <Box className={`flex-1 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`} />
                    </Box>
                    
                    <Box className='flex flex-row items-center justify-center gap-8 w-full'>
                        <Button
                            variant="contained"
                            className={`w-12 h-12 rounded-full p-0 ${
                                isDarkMode 
                                    ? 'bg-white bg-opacity-15' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            <Apple className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                        </Button>
                        
                        <Button
                            variant="contained"
                            onClick={() => handleOAuthSignIn('google')}
                            className={`w-12 h-12 rounded-full p-0 ${
                                isDarkMode 
                                    ? 'bg-white bg-opacity-15' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            <Google className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                        </Button>
                        
                        <Button
                            variant="contained"
                            className={`w-12 h-12 rounded-full p-0 ${
                                isDarkMode 
                                    ? 'bg-white bg-opacity-15' 
                                    : 'bg-gray-100'
                            }`}
                        >
                            <Facebook className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Welcome;