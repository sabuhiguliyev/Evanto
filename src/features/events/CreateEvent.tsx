import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, IconButton, TextField, MenuItem } from '@mui/material';
import { KeyboardArrowLeft, ImageOutlined } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { DateTimePicker } from '@mui/x-date-pickers';

import Container from '@/components/layout/Container';
import LocationPicker from '@/components/forms/LocationPicker';
import { eventSchema } from '@/utils/schemas';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/userStore';
import { useAppStore } from '@/store/appStore';
import type { Event } from '@/utils/schemas';
import { showError } from '@/utils/notifications';

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();
    const userId = useUserStore(state => state.user?.id);
    const categories = useAppStore(state => state.categories);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Event>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            location: '',
            category: categories[0]?.name || '',
            start_date: new Date(),
            end_date: new Date(Date.now() + 60 * 60 * 1000),
            ticket_price: 0,
            description: '',
            event_image: undefined,
            featured: false,
            member_avatars: [],
            member_count: 0,
        },
    });

    const onSubmit = async (data: Event) => {
        if (!userId) return toast.error('User not authenticated');

        let image_url = null;

        if (data.event_image && data.event_image.length > 0) {
            const file = data.event_image[0];
            const safeFileName = file.name.replaceAll(/[^a-zA-Z0-9.-]/g, '_');
            const filePath = `${userId}/${Date.now()}_${safeFileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('event-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                console.error('Upload failed:', uploadError);
                toast.error('Image upload failed: ' + uploadError.message);
                return;
            }

            const { data: publicUrlData } = supabase.storage.from('event-images').getPublicUrl(uploadData.path);

            image_url = publicUrlData.publicUrl;
        }

        const { error } = await supabase.from('events').insert({
            user_id: userId,
            title: data.title,
            location: data.location,
            category: data.category,
            start_date: data.start_date,
            end_date: data.end_date,
            ticket_price: data.ticket_price,
            description: data.description,
            event_image: image_url,
            featured: data.featured,
            member_avatars: data.member_avatars,
            member_count: data.member_count,
        });

        if (error) {
            toast.error('Error creating event: ' + error.message);
        } else {
            toast.success('Event created successfully!');
            reset();
            navigate('/'); // Redirect to the main page or any other page after creation
        }
    };

    const onError = (errors: FieldErrors<Event>) => {
        showError('Please fix the errors in the form before submitting.' + JSON.stringify(errors, null, 2));
    };

    return (
        <Container className='no-scrollbar justify-start overflow-y-auto'>
            <Box className='flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className='mx-auto'>
                    Create Event
                </Typography>
            </Box>
            <Box
                component='form'
                className='flex w-full flex-col justify-start gap-4'
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <TextField
                    label='Title'
                    className='text-input'
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                        <LocationPicker
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.location}
                            helperText={errors.location?.message}
                        />
                    )}
                />

                <Controller
                    name='start_date'
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            label='Start Date'
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{
                                textField: {
                                    className: 'w-full',
                                    error: !!errors.start_date,
                                    helperText: errors.start_date?.message,
                                },
                            }}
                        />
                    )}
                />
                <Controller
                    name='end_date'
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            label='End Date'
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{
                                textField: {
                                    className: 'w-full',
                                    error: !!errors.end_date,
                                    helperText: errors.end_date?.message,
                                },
                            }}
                        />
                    )}
                />
                <Box className='flex w-full gap-2'>
                    <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                select
                                label='Category'
                                className='text-input'
                                {...field}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.name} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    <TextField
                        label='Ticket Price'
                        className='text-input'
                        {...register('ticket_price', {
                            valueAsNumber: true,
                            min: { value: 0, message: 'Ticket price can not be negative' },
                        })}
                        helperText={errors.ticket_price?.message}
                        error={!!errors.ticket_price}
                    />
                </Box>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Description'
                            multiline
                            rows={3}
                            className='w-full'
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    )}
                />

                <Controller
                    name='event_image'
                    control={control}
                    render={({ field }) => (
                        <>
                            <Button
                                component='label'
                                className='flex h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-primary-1 bg-primary-500/10 text-primary-1'
                            >
                                <ImageOutlined />
                                Add Photo +
                                <input
                                    type='file'
                                    hidden
                                    onChange={e => field.onChange(Array.from(e.target.files ?? []))}
                                ></input>
                            </Button>
                            {errors.event_image?.message && (
                                <Typography variant='caption' color='error'>
                                    {String(errors.event_image.message)}
                                </Typography>
                            )}
                            {field.value?.[0] && (
                                <Typography variant='body2' color='textSecondary'>
                                    {field.value[0].name}
                                </Typography>
                            )}
                        </>
                    )}
                />

                <Button variant='contained' type='submit'>
                    Create
                </Button>
            </Box>
        </Container>
    );
};
export default CreateEvent;
