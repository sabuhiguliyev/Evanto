import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';

function CreateMeetupStep3() {
    const navigate = useNavigate();
    const { setMeetupDescription, setMeetupLink, setMeetupStep } = useDataStore();
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    const handleCreate = () => {
        if (description.trim()) {
            setMeetupDescription(description.trim());
            if (link.trim()) {
                setMeetupLink(link.trim());
            }
            // Navigate to success or home page
            navigate('/');
        }
    };

    const handleBack = () => {
        setMeetupStep(2);
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
                    onChange={(e) => setDescription(e.target.value)}
                    variant='outlined'
                    size='large'
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
                    onChange={(e) => setLink(e.target.value)}
                    variant='outlined'
                    size='large'
                />
            </Box>

            <Box className='mt-auto'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleCreate}
                    disabled={!description.trim()}
                    className='bg-primary-1 text-white h-12'
                >
                    Create Meetup
                </Button>
            </Box>
        </Container>
    );
}

export default CreateMeetupStep3;

