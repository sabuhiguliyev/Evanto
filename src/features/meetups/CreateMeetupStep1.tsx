import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft, Add } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { useDarkMode } from '@/contexts/DarkModeContext';

function CreateMeetupStep1() {
    const navigate = useNavigate();
    const { setMeetupCreationName, setMeetupCreationStep } = useDataStore();
    const [name, setNameLocal] = useState('');
    const { isDarkMode } = useDarkMode();

    const handleNext = () => {
        if (name.trim()) {
            setMeetupCreationName(name.trim());
            setMeetupCreationStep(2);
            navigate('/meetups/create/step-2');
        }
    };

    return (
        <>
            
            <Container className="relative min-h-screen">
            <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton size='medium' onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className="font-jakarta font-semibold text-primary">Create Meetup</Typography>
                <Box className='w-10' />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className="mb-2 font-jakarta font-semibold text-primary">What's your meetup called?</Typography>
                <Typography variant='body2' className="mb-4 font-jakarta text-muted">
                    Choose a name that will help people understand what your meetup is about.
                </Typography>
                <TextField
                    fullWidth
                    placeholder='Enter meetup name...'
                    value={name}
                    onChange={(e) => setNameLocal(e.target.value)}
                    variant='outlined'
                                            size='medium'
                />
            </Box>

            <Box className='mt-auto'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleNext}
                    disabled={!name.trim()}
                    className='font-jakarta h-12 rounded-xl bg-primary text-white hover:bg-primary-light'
                >
                    Continue
                </Button>
            </Box>
            </Container>
        </>
    );
}

export default CreateMeetupStep1;

