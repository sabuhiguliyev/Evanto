import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';
import { useDataStore } from '@/store/dataStore';

function CreateMeetupStep3() {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const { meetupCreation, setMeetupCreationStep, resetMeetupCreation } = useDataStore();
    const [description, setDescriptionLocal] = useState('');
    const [link, setLinkLocal] = useState('');
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            const { error } = await supabase.from('meetups').insert({
                user_id: user.id,
                meetup_name: meetupCreation.name,
                meetup_date: meetupCreation.date,
                description: description.trim(),
                meetup_link: link.trim() || null,
                category: 'Other', // Default category since meetup creation doesn't collect category
                online: true, // Default to online meetup
                featured: false,
            });

            if (error) {
                console.error('Error creating meetup:', error);
                toast.error('Error creating meetup: ' + error.message);
            } else {
                toast.success('Meetup created successfully!');
                // Clear the store data
                resetMeetupCreation();
                navigate('/');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setMeetupCreationStep(2);
        navigate('/meetups/create/step-2');
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={handleBack} className="text-text-3 border border-neutral-200">
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
                    disabled={!description.trim() || loading}
                    className='bg-primary-1 text-white h-12'
                >
                    {loading ? 'Creating...' : 'Create Meetup'}
                </Button>
            </Box>
        </Container>
    );
}

export default CreateMeetupStep3;

