import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Box, Divider, Typography, Button } from '@mui/material';
import {
    Apple as AppleIcon,
    Google as GoogleIcon,
    FacebookOutlined,
    MailOutline as MailOutlineIcon,
    LockOutlined as LockOutlinedIcon,
    VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { signInSchema } from '@/utils/schemas';
import Container from '../../components/layout/Container';
import { TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@/components/icons/logo-dark.svg?react';

function SignIn() {
    const navigate = useNavigate();

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
            toast.error(
                error.message.includes('Invalid') ? 'Invalid email or password' : 'Login failed. Please try again.',
            );
            return;
        }

        if (authData.session) {
            toast.success('Signed in successfully!');
            navigate('/main-page-1');
        } else {
            toast.error('No session created');
        }
    };

    const handleOAuthSignIn = async (provider: 'google' | 'facebook') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + '/main-page-1',
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
        <Container>
            <Logo className={'my-4 flex-grow'} />
            <Box className={'flex flex-col gap-4 text-start'} component='form' onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h1' className='font-poppins'>
                    Sign in your account
                </Typography>
                <Typography variant='body1' className='font-poppins text-text-secondary'>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
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
                    type='password'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LockOutlinedIcon color={'disabled'} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <VisibilityOutlinedIcon color={'disabled'} />
                            </InputAdornment>
                        ),
                    }}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className='text-input'
                />
                <Link to={'/forgot-password'} className={'mb-4 text-text-muted underline text-primary'}>
                    Forgot Password?
                </Link>
                <Box className={'flex w-full flex-col items-center gap-4'}>
                    <Button variant={'contained'} type='submit' disabled={isSubmitting} className='font-jakarta'>
                        Sign In
                    </Button>
                    <Divider className='before:bg-gray-200 after:bg-gray-200 [&_.MuiDivider-wrapper]:text-text-muted'>
                        Or continue with
                    </Divider>
                    <Box className='flex w-72 justify-center gap-4'>
                        <Button variant='outlined' className='h-9 font-jakarta'>
                            <AppleIcon className='text-primary' />
                        </Button>
                        <Button variant='outlined' className='h-9 font-jakarta' onClick={() => handleOAuthSignIn('google')}>
                            <GoogleIcon className='text-primary' />
                        </Button>
                        <Button variant='outlined' className='h-9 font-jakarta' onClick={() => handleOAuthSignIn('facebook')}>
                            <FacebookOutlined className='text-primary' />
                        </Button>
                    </Box>
                    <Box className='w-full text-center'>
                        <Typography variant='body1' className='font-poppins text-text-secondary'>
                            Don&#39;t have an account? <Link href={'/signup'}>Sign Up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;
