import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Box, Divider, Typography, Button, IconButton } from '@mui/material';
import {
    Apple as AppleIcon,
    Google as GoogleIcon,
    FacebookOutlined,
    MailOutline as MailOutlineIcon,
    LockOutlined as LockOutlinedIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { signInSchema } from '@/utils/schemas';
import { Container } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import LogoDark from '@/assets/icons/logo-dark.svg?react';
import useUserStore from '@/store/userStore';
import { useDarkMode } from '@/contexts/DarkModeContext';

function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const credentials = {
            email: data.email.trim().toLowerCase(),
            password: data.password.trim(),
        };

        const { data: authData, error } = await supabase.auth.signInWithPassword(credentials);

        if (error) {
            console.error('SignIn error:', error);
            
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.message.includes('Invalid login credentials') || 
                error.message.includes('Invalid email or password') ||
                error.message.includes('Invalid credentials')) {
                errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Please check your email and click the confirmation link before signing in.';
            } else if (error.message.includes('Too many requests')) {
                errorMessage = 'Too many login attempts. Please wait a moment before trying again.';
            } else if (error.message.includes('User not found')) {
                errorMessage = 'No account found with this email address. Please sign up first.';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Please enter a valid email address.';
            }
            
            toast.error(errorMessage);
            return;
        }

        if (authData.session && authData.user) {
            // For email/password users, get profile from database
            try {
                const { fetchUserProfile } = await import('@/services');
                const userProfile = await fetchUserProfile();
                
                if (userProfile) {
                    setUser({
                        id: userProfile.id,
                        email: userProfile.email,
                        full_name: userProfile.full_name,
                        avatar_url: userProfile.avatar_url,
                    });
                } else {
                    // Fallback to auth data
                    setUser({
                        id: authData.user.id,
                        email: authData.user.email || '',
                        full_name: authData.user.user_metadata?.full_name || authData.user.user_metadata?.name || 'User',
                        avatar_url: authData.user.user_metadata?.avatar_url || authData.user.user_metadata?.picture,
                    });
                }
            } catch (error) {
                // Fallback to auth data if database fetch fails
                setUser({
                    id: authData.user.id,
                    email: authData.user.email || '',
                    full_name: authData.user.user_metadata?.full_name || authData.user.user_metadata?.name || 'User',
                    avatar_url: authData.user.user_metadata?.avatar_url || authData.user.user_metadata?.picture,
                });
            }
            
            toast.success('Signed in successfully!');
            navigate('/home');
        } else {
            toast.error('No session created');
        }
    };

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
            console.error('OAuth sign-in error:', error);
            
            let errorMessage = 'OAuth sign-in failed. Please try again.';
            
            if (error.message.includes('popup_closed_by_user')) {
                errorMessage = 'Sign-in was cancelled. Please try again if you want to continue.';
            } else if (error.message.includes('access_denied')) {
                errorMessage = 'Access denied. Please try again or use a different sign-in method.';
            } else if (error.message.includes('network')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }
            
            toast.error(errorMessage);
        }
    };
    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <Button
                    onClick={toggleDarkMode}
                    size="small"
                    variant="outlined"
                    className={`text-xs ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}`}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Box>
            
            <Container className={`${isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}`}>
                <Box className={'flex flex-col gap-6 text-start'}>
                <Box className="flex justify-center">
                    {isDarkMode ? (
                        <Logo className={'my-4'} />
                    ) : (
                        <LogoDark className={'my-4'} />
                    )}
                </Box>
                <Typography variant='h3' className='font-jakarta font-semibold'>
                    Sign in your account
                </Typography>
                <Typography variant='body2' className='font-jakarta text-text-secondary leading-relaxed'>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <TextField
                    label='Email'
                    placeholder='example@gmail.com'
                    type='email'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MailOutlineIcon color={'disabled'} />
                            </InputAdornment>
                        ),
                    }}
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className='text-input'
                />
                <TextField
                    label='Password'
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LockOutlinedIcon color={'disabled'} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className='text-input'
                />
                    <Link to={'/auth/forgot-password'} className={'mb-2 text-text-muted underline text-primary text-sm'}>
                        Forgot Password?
                    </Link>
                    <Button 
                        type='submit' 
                        variant={'contained'} 
                        className='font-jakarta h-12 text-base font-medium'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <Box className={'flex w-full flex-col items-center gap-6'}>
                    <Divider className='before:bg-gray-200 after:bg-gray-200 [&_.MuiDivider-wrapper]:text-text-muted text-sm'>
                        Or continue with
                    </Divider>
                    <Box className='flex w-full justify-center gap-3'>
                        <Button variant='outlined' className='h-12 w-12 font-jakarta min-w-12'>
                            <AppleIcon className='text-primary text-xl' />
                        </Button>
                        <Button variant='outlined' className='h-12 w-12 font-jakarta min-w-12' onClick={() => handleOAuthSignIn('google')}>
                            <GoogleIcon className='text-primary text-xl' />
                        </Button>
                        <Button variant='outlined' className='h-12 w-12 font-jakarta min-w-12' onClick={() => handleOAuthSignIn('facebook')}>
                            <FacebookOutlined className='text-primary text-xl' />
                        </Button>
                    </Box>
                    <Box className='w-full text-center mt-2'>
                        <Typography variant='body2' className='font-jakarta text-text-secondary'>
                            Don&#39;t have an account? <Link to={'/auth/sign-up'} className='text-primary font-medium'>Sign Up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            </Container>
        </>
    );
}

export default SignIn;
