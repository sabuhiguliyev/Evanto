import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';
import { signUpSchema } from '@/utils/schemas';
import { Box, Divider, Typography, Button } from '@mui/material';
import { FacebookOutlined, Apple as AppleIcon, Google as GoogleIcon } from '@mui/icons-material';
import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import Link from '../../components/navigation/Link';

function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) {
            toast(error.message);
            return;
        }

        if (authData.user) {
            await supabase.from('users').insert({
                full_name: data.fullName,
                email: data.email,
                password: data.password,
            });
            navigate('/main-page-1');
        }
    };

    return (
        <Container>
            <Box className={'flex flex-col gap-4 text-start'}>
                <Typography variant='h1' className={'w-[193px]'}>
                    Create your account
                </Typography>
                <Typography variant={'body2'}>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <Input
                        label='Full Name'
                        placeholder='Enter your full name'
                        type='text'
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        {...register('fullName')}
                    />
                    <Input
                        label='Email'
                        type='email'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email')}
                    />
                    <Input
                        label='Password'
                        type='password'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password')}
                    />
                    <Input
                        label='Confirm Password'
                        type='password'
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />
                    <Button type='submit' variant={'contained'}>
                        Sign Up
                    </Button>
                </form>

                <Box className={'flex w-full flex-col items-center gap-4'}>
                    <Divider className='text-text-gray3 before:bg-[#E8E8E8] after:bg-[#E8E8E8]'>
                        Or continue with
                    </Divider>{' '}
                    <Box className='flex w-72 justify-center gap-4'>
                        <Button variant='outlined' className={'h-9'}>
                            <AppleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <GoogleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <FacebookOutlined className={'text-primary-1'} />
                        </Button>
                    </Box>
                    <Box className='w-full text-center'>
                        <Typography variant='body1'>
                            Already have an account? <Link href={'/signin'}>Sign In</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
