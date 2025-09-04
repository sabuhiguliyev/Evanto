import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button } from '@mui/material';
import { supabase } from '@/utils/supabase';
import { resetPasswordSchema } from '@/utils/schemas';
import Container from '../../components/layout/Container';
import { TextField } from '@mui/material';
import CircleArrowIcon from '@/components/icons/arrowcircleleft.svg?react';

function CreatePassword() {
    const navigate = useNavigate();

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
        setTimeout(() => navigate('/congratulation', { state: { context: 'password' } }), 1500);
    };
    return (
        <Container>
            <Box className={'mb-12 flex flex-row items-center gap-10 self-start py-4'}>
                <CircleArrowIcon onClick={() => navigate(-1)} className={'cursor-pointer'} />
                <Typography variant='h4'>Create New Password</Typography>
            </Box>
            <img src='/illustrations/lockillustration.png' className={'mb-12'} alt='lock illustration  ' />
            <Typography variant={'h3'} className={'self-start'}>
                Create New Password
            </Typography>
            <Box className={'flex w-full flex-col gap-2'} component='form' onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label={'Password'}
                    type='password'
                    fullWidth
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    className='text-input'
                />
                <TextField
                    label={'Confirm Password'}
                    type='password'
                    fullWidth
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    className='text-input'
                />
                <Button variant={'contained'} type='submit'>
                    {isSubmitting ? 'Submitting...' : 'Continue'}
                </Button>
            </Box>
        </Container>
    );
}

export default CreatePassword;
