import React, { useEffect } from 'react';
import { Box, Button, Checkbox, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { EmailOutlined, FlagRounded, KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useBookingStore from '@/store/bookingStore';
import { showError } from '@/utils/notifications';
import { useSearchParams } from 'react-router-dom';

const bookingSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    gender: z.enum(['male', 'female']),
    birth_date: z.date(),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    country: z.string().min(1, 'Country is required'),
    accept_terms: z.boolean().refine(val => val, 'You must accept the terms'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

function BookEvent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('itemId');
    const { bookingData } = useBookingStore();
    const setBookingData = useBookingStore(state => state.setBookingData); // Get stable reference

    useEffect(() => {
        if (itemId) {
            setBookingData({ event_id: itemId });
        }
    }, [itemId]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: bookingData,
    });

    const onSubmit = (data: BookingFormData) => {
        setBookingData(data);
        navigate('/select-seats');
    };

    const onError = () => {
        showError('Please fix the errors in the form before submitting.');
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-10 flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className='mx-auto'>
                    Book Event
                </Typography>
            </Box>
            <Box
                component='form'
                className='flex w-full flex-col justify-start gap-4'
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <TextField
                    label='First name'
                    className='text-input'
                    {...register('first_name')}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                />
                <TextField
                    label='Last name'
                    className='text-input'
                    {...register('last_name')}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                />
                <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label='Gender'
                            className='text-input'
                            {...field}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                        >
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </TextField>
                    )}
                />
                <Controller
                    name='birth_date'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type='date'
                            label='Birth Date'
                            className='text-input w-full'
                            error={!!errors.birth_date}
                            helperText={errors.birth_date?.message}
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={e => field.onChange(new Date(e.target.value))}
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                        />
                    )}
                />
                <TextField
                    label='Email'
                    className='text-input'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                        input: {
                            startAdornment: <EmailOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
                        },
                    }}
                />
                <TextField
                    label='Phone'
                    className='text-input'
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    slotProps={{
                        input: {
                            startAdornment: <FlagRounded sx={{ mr: 1, color: 'text.secondary' }} />,
                        },
                    }}
                />
                <Controller
                    name='country'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label='Country'
                            className='text-input'
                            {...field}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        >
                            <MenuItem value='United States'>United States</MenuItem>
                            {/* Add more countries as needed */}
                        </TextField>
                    )}
                />
                <Controller
                    name='accept_terms'
                    control={control}
                    render={({ field }) => (
                        <Box className='flex items-start'>
                            <Checkbox {...field} checked={field.value} size='small' color='primary' />
                            <Typography variant='body2' className='ml-2 text-text-3'>
                                I accept the evanto{' '}
                                <span className='text-primary-1'>Terms of services. Community guideline</span>, and{' '}
                                <span className='text-primary-1'> Privacy Policy</span> (Required)
                            </Typography>
                        </Box>
                    )}
                />
                {errors.accept_terms && (
                    <Typography variant='caption' color='error'>
                        {errors.accept_terms.message}
                    </Typography>
                )}
                <Button variant='contained' type='submit' className='mt-4'>
                    Continue to Seats
                </Button>
            </Box>
        </Container>
    );
}

export default BookEvent;
