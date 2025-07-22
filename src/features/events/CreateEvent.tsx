import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import { KeyboardArrowLeft, ImageOutlined } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { DateTimeField } from '@mui/x-date-pickers';

import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import { eventSchema } from '@/utils/schemas';
import { supabase } from '@/utils/supabase';
import useUserStore from '@/store/userStore';

const CreateEvent: React.FC = () => {
    const navigate = useNavigate();

    const userId = useUserStore(state => state.user?.id);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.output<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            location: '',
            start_date: new Date(),
            end_date: new Date(Date.now() + 60 * 60 * 1000),
            ticket_price: 0,
            description: '',
            event_image: undefined,
        },
    });

    const onSubmit = async (data: z.infer<typeof eventSchema>) => {
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
            start_date: data.start_date,
            end_date: data.end_date,
            ticket_price: data.ticket_price,
            description: data.description,
            event_image: image_url,
        });

        if (error) {
            toast.error('Error creating event: ' + error.message);
        } else {
            toast.success('Event created successfully!');
            reset();
            navigate('/main-page-1'); // Redirect to the main page or any other page after creation
        }
    };

    return (
        <Container className='no-scrollbar justify-start overflow-y-auto'>
            <Box className='flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className='text-text-3' sx={{ border: '1px solid #eee' }}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className='mx-auto'>
                    Create Event
                </Typography>
            </Box>
            <Box
                component='form'
                className='flex w-full flex-col justify-start gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    placeholder='Title'
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <Input
                    placeholder='Location'
                    {...register('location')}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                />
                <Controller
                    name='start_date'
                    control={control}
                    render={({ field }) => (
                        <DateTimeField
                            {...field}
                            label='Start Date'
                            format='MM-dd-yyyy HH:mm'
                            className='w-full [&_.MuiOutlinedInput-root]:rounded-full'
                            slotProps={{
                                textField: {
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
                        <DateTimeField
                            {...field}
                            label='End Date'
                            format='MM-dd-yyyy HH:mm'
                            className='w-full [&_.MuiOutlinedInput-root]:rounded-full'
                            slotProps={{
                                textField: {
                                    error: !!errors.end_date,
                                    helperText: errors.end_date?.message,
                                },
                            }}
                        />
                    )}
                />
                <Input
                    placeholder='Ticket Price'
                    {...register('ticket_price', {
                        valueAsNumber: true,
                        min: { value: 0, message: 'Ticket price can not be negative' },
                    })}
                    helperText={errors.ticket_price?.message}
                    error={!!errors.ticket_price}
                />
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
                    rules={{ validate: value => !value || (Array.isArray(value) && value[0] instanceof File) }}
                    render={({ field }) => (
                        <>
                            <Button
                                component='label'
                                className='flex h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-primary-1 bg-[#5D9BFC26] text-primary-1'
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
