import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';
import { signUpSchema } from '@/utils/schemas';
import { Box, Divider, Typography, Button, IconButton } from '@mui/material';
import { 
    FacebookOutlined, 
    Apple as AppleIcon, 
    Google as GoogleIcon, 
    Visibility, 
    VisibilityOff,
    MailOutline as MailOutlineIcon,
    LockOutlined as LockOutlinedIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import Container from '../../components/layout/Container';
import { TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import LogoDark from '@/assets/icons/logo-dark.svg?react';
import useUserStore from '@/store/userStore';
import { useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { mode } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            // First, create the auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    }
                    // For development, you might want to disable email confirmation
                    // emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });

            console.log('Full auth response:', { authData, authError });

            if (authError) {
                console.error('Auth error:', authError);
                console.log('Auth error message:', authError.message);
                console.log('Auth error code:', authError.status);
                
                if (authError.message.includes('already registered') || 
                    authError.message.includes('already exists') ||
                    authError.message.includes('User already registered')) {
                    toast.error('An account with this email already exists. Please sign in instead.');
                } else if (authError.message.includes('email')) {
                    toast.error('Email error: Please use a valid email address or check your Supabase email settings');
                } else {
                    toast.error(`Signup failed: ${authError.message}`);
                }
                return;
            }

            if (authData.user) {
                // Create user profile in database
                try {
                    const { fetchUserProfile } = await import('@/services');
                    await fetchUserProfile();
                } catch (error) {
                    console.log('Could not create user profile:', error);
                }

                // Set user in store for immediate authentication
                setUser({
                    id: authData.user.id,
                    email: authData.user.email || '',
                    full_name: data.fullName,
                    avatar_url: authData.user.user_metadata?.avatar_url,
                });

                // Check if email confirmation is required
                if (authData.user.email_confirmed_at === null) {
                    console.log('Email confirmation required');
                    toast.success('Account created! Please check your email to confirm your account.');
                    // Navigate to choose interests first
                    navigate('/onboarding/interests');
                } else {
                    console.log('Email already confirmed');
                    // Email already confirmed, user profile will be created automatically via database trigger
                    toast.success('Account created successfully!');
                    // Navigate to choose interests first
                    navigate('/onboarding/interests');
                }
            } else {
                console.log('No user in auth data:', authData);
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('An unexpected error occurred during signup');
        }
    };

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className={`${mode === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <Box className={'flex flex-col gap-6 text-start'}>
                <Box className="flex justify-center">
                    {mode === 'dark' ? (
                        <Logo className={'my-4'} />
                    ) : (
                        <LogoDark className={'my-4'} />
                    )}
                </Box>
                <Typography variant='h3' className='font-poppins font-semibold'>
                    Create your account
                </Typography>
                <Typography variant='body2' className='font-poppins text-text-secondary leading-relaxed'>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <TextField
                        label='Full Name'
                        placeholder='Enter your full name'
                        type='text'
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <PersonIcon color={'disabled'} />
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        {...register('fullName')}
                        className='text-input'
                    />
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
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email')}
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
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password')}
                        className='text-input'
                    />
                    <TextField
                        label='Confirm Password'
                        placeholder='Confirm Password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LockOutlinedIcon color={'disabled'} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                        className='text-input'
                    />
                    <Button 
                        type='submit' 
                        variant={'contained'} 
                        className='font-jakarta h-12 text-base font-medium'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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
                        <Button variant='outlined' className='h-12 w-12 font-jakarta min-w-12'>
                            <GoogleIcon className='text-primary text-xl' />
                        </Button>
                        <Button variant='outlined' className='h-12 w-12 font-jakarta min-w-12'>
                            <FacebookOutlined className='text-primary text-xl' />
                        </Button>
                    </Box>
                    <Box className='w-full text-center mt-2'>
                        <Typography variant='body2' className='font-poppins text-text-secondary'>
                            Already have an account? <Link to={'/auth/sign-in'} className='text-primary font-medium'>Sign In</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            </Container>
        </>
    );
}

export default SignUp;
