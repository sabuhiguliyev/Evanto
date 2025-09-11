import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import { KeyboardArrowLeft, Add } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

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
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className={`justify-start ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
            <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className={`font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Meetup</Typography>
                <Box className='w-10' />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className={`mb-2 font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What's your meetup called?</Typography>
                <Typography variant='body2' className={`mb-4 font-poppins ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
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
                    className='font-jakarta w-button-primary h-button-primary rounded-button-primary'
                    sx={{
                        backgroundColor: '#5D9BFC',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#4A8BFC',
                        },
                        '&:disabled': {
                            backgroundColor: '#E5E7EB',
                            color: '#9CA3AF',
                        }
                    }}
                >
                    Continue
                </Button>
            </Box>
            </Container>
        </>
    );
}

export default CreateMeetupStep1;

