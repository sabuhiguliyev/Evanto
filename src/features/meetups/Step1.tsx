import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft, Add } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';

function CreateMeetupStep1() {
    const navigate = useNavigate();
    const { setMeetupCreationName, setMeetupCreationStep } = useDataStore();
    const [name, setNameLocal] = useState('');

    const handleNext = () => {
        if (name.trim()) {
            setMeetupCreationName(name.trim());
            setMeetupCreationStep(2);
            navigate('/meetups/create/step-2');
        }
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Create Meetup</Typography>
                <Box className='w-10' />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className='mb-2'>What's your meetup called?</Typography>
                <Typography variant='body2' className='text-text-3 mb-4'>
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
                    className='bg-primary-1 text-white h-12'
                >
                    Continue
                </Button>
            </Box>
        </Container>
    );
}

export default CreateMeetupStep1;

