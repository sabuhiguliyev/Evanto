import { Box, Typography, Button, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import Container from '../../components/layout/Container';
import { TextField } from '@mui/material';
import { KeyboardArrowLeft, MailOutline as MailOutlineIcon } from '@mui/icons-material';
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
        const toastId = toast.loading('Sending verification code...');

        const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${window.location.origin}/auth/verify-code`,
        });

        if (error) {
            toast.error(error.message, { id: toastId, duration: 5000 });
            return;
        }

        toast.success('Verification code sent!', { id: toastId, duration: 5000 });

        localStorage.setItem('reset_email', data.email);
        navigate('/auth/email-sent');

        reset();
    };
    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4' className='font-poppins font-semibold'>Forgot Password</Typography>
                    <Box className='w-10' />
                </Box>
                <Box className='auth-container'>
                    <Typography variant='body1'>
                        Enter the email associated with your account and we'll send an email with instructions to reset your
                        password.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
                        <TextField
                            label='Email'
                            placeholder='example@gmail.com'
                            type='email'
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <MailOutlineIcon color='disabled' />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            className='text-input'
                        />
                        <Button 
                            variant='contained' 
                            type='submit' 
                            disabled={isSubmitting}
                            fullWidth
                            className='h-12 font-jakarta text-base font-medium mt-4'
                            style={{ 
                                width: '100%',
                                minWidth: '100%',
                                maxWidth: '100%'
                            }}
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Send'}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
