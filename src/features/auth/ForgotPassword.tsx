import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Container from '../../components/layout/Container';
import { TextField } from '@mui/material';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from '@/utils/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/utils/supabase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        const toastId = toast.loading('Sending OTP...');

        const { error } = await supabase.auth.signInWithOtp({
            email: data.email,
            options: {
                shouldCreateUser: false, // Prevent new account creation
                emailRedirectTo: `${window.location.origin}/reset-password?type=email`,
            },
        });

        if (error) {
            toast.error(error.message, { id: toastId, duration: 5000 });
            return;
        }

        toast.success('OTP sent to your email!', { id: toastId, duration: 5000 });

        localStorage.setItem('reset_email', data.email);
        navigate('/check-email');

        reset();
    };
    return (
        <Container className={'items-start justify-start'}>
            <Box className={'flex cursor-pointer flex-row items-center gap-10'}>
                <CircleArrowIcon onClick={() => navigate(-1)} />
                <Typography variant={'h3'}>Forgot Password</Typography>
            </Box>
            <Typography variant={'body1'} className={'mt-20'}>
                Enter the email associated with your account and we’ll send an email with instructions to reset your
                password.
            </Typography>
            <Box
                component='form'
                className={'mt-20 flex w-full flex-col items-center gap-4'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label={'Email'}
                    type='email'
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    className='text-input'
                />
                <Button variant={'contained'} type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : 'Send'}
                </Button>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
