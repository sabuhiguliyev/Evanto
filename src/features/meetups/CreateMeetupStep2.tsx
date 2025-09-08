import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';

function CreateMeetupStep2() {
    const navigate = useNavigate();
    const { setMeetupCreationDate, setMeetupCreationStep } = useDataStore();
    const [date, setDateLocal] = useState('');

    const handleNext = () => {
        if (date) {
            setMeetupCreationDate(new Date(date).toISOString());
            setMeetupCreationStep(3);
            navigate('/meetups/create/step-3');
        }
    };

    const handleBack = () => {
        setMeetupCreationStep(1);
        navigate('/meetups/create/step-1');
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
                <Typography variant='h5' className='mb-2'>When is your meetup?</Typography>
                <Typography variant='body2' className='text-text-3 mb-4'>
                    Choose a date and time that works for your audience.
                </Typography>
                <TextField
                    fullWidth
                    type='datetime-local'
                    value={date}
                    onChange={(e) => setDateLocal(e.target.value)}
                    variant='outlined'
                                            size='medium'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>

            <Box className='mt-auto'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleNext}
                    disabled={!date}
                    className='bg-primary-1 text-white h-12'
                >
                    Continue
                </Button>
            </Box>
        </Container>
    );
}

export default CreateMeetupStep2;

