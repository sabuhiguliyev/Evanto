import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';
import { useDataStore } from '@/store/dataStore';
import { useCreateMeetup } from '@/hooks/useMeetups';

function CreateMeetupStep3() {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const { meetupCreation, setMeetupCreationStep, resetMeetupCreation } = useDataStore();
    const createMeetupMutation = useCreateMeetup();
    const [description, setDescriptionLocal] = useState('');
    const [link, setLinkLocal] = useState('');

    const handleCreate = async () => {
        if (!description.trim()) {
            toast.error('Please enter a description');
            return;
        }

        if (!user?.id) {
            toast.error('User not authenticated');
            return;
        }

        if (!meetupCreation.name || !meetupCreation.date) {
            toast.error('Missing meetup information. Please go back and complete all steps.');
            return;
        }

        // Use TanStack Query mutation instead of direct Supabase call
        createMeetupMutation.mutate({
            user_id: user.id,
            title: meetupCreation.name,
            start_date: meetupCreation.date,
            description: description.trim(),
            meetup_link: link.trim() || null,
            category: 'Other', // Default category since meetup creation doesn't collect category
            online: true, // Default to online meetup
            featured: false,
        }, {
            onSuccess: () => {
                toast.success('Meetup created successfully!');
                // Clear the store data
                resetMeetupCreation();
                navigate('/');
            },
            onError: (error: any) => {
                console.error('Error creating meetup:', error);
                toast.error('Error creating meetup: ' + error.message);
            }
        });
    };

    const handleBack = () => {
        setMeetupCreationStep(2);
        navigate('/meetups/create/step-2');
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={handleBack} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Create Meetup</Typography>
                <Box className='w-10' />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className='mb-2'>Describe your meetup</Typography>
                <Typography variant='body2' className='text-text-3 mb-4'>
                    Tell people what to expect and why they should join.
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder='Enter meetup description...'
                    value={description}
                    onChange={(e) => setDescriptionLocal(e.target.value)}
                    variant='outlined'
                                            size='medium'
                />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className='mb-2'>Meeting link (optional)</Typography>
                <Typography variant='body2' className='text-text-3 mb-4'>
                    Add a link if this is an online meetup.
                </Typography>
                <TextField
                    fullWidth
                    placeholder='https://meet.google.com/...'
                    value={link}
                    onChange={(e) => setLinkLocal(e.target.value)}
                    variant='outlined'
                                            size='medium'
                />
            </Box>

            <Box className='mt-auto'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleCreate}
                    disabled={!description.trim() || createMeetupMutation.isPending}
                    className='bg-primary-1 text-white h-12'
                >
                    {createMeetupMutation.isPending ? 'Creating...' : 'Create Meetup'}
                </Button>
            </Box>
        </Container>
    );
}

export default CreateMeetupStep3;

