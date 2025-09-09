import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { KeyboardArrowLeft, Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { supabase } from '@/utils/supabase';
import { resetPasswordSchema } from '@/utils/schemas';
import Container from '../../components/layout/Container';
import { TextField } from '@mui/material';

function ResetPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success('Password updated successfully!');
        setTimeout(() => navigate('/onboarding/congratulations', { state: { context: 'password' } }), 1500);
    };
    return (
        <Container className='relative justify-start'>
            <Box className='no-scrollbar w-full overflow-y-auto'>
                <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                        <KeyboardArrowLeft />
                    </IconButton>
                    <Typography variant='h4' className='font-poppins font-semibold'>Reset Password</Typography>
                    <Box className='w-10' />
                </Box>
                
                <Box className='auth-container'>
                    <img src='/illustrations/lockillustration.png' className='mb-8 max-w-xs mx-auto' alt='Lock illustration' />
                    
                    <Typography variant='body1' className='mb-8 text-center'>
                        Enter your new password below.
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
                        <TextField
                            label='New Password'
                            placeholder='Enter new password'
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockOutlined color='disabled' />
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
                            label='Confirm New Password'
                            placeholder='Confirm new password'
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockOutlined color='disabled' />
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
                            variant='contained'
                            type='submit'
                            disabled={isSubmitting}
                            size='large'
                            className='w-full h-12'
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Update Password'}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword;
