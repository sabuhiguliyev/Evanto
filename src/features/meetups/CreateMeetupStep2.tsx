import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton, MenuItem } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useFiltersStore } from '@/store/filtersStore';

function CreateMeetupStep2() {
    const navigate = useNavigate();
    const { setMeetupCreationDate, setMeetupCreationStep, setMeetupCreationCategory, setMeetupCreationMaxParticipants } = useDataStore();
    const [date, setDateLocal] = useState('');
    const [category, setCategoryLocal] = useState('Other');
    const [maxParticipants, setMaxParticipantsLocal] = useState('');
    const { isDarkMode } = useDarkMode();
    const { categories } = useFiltersStore();

    const handleNext = () => {
        if (date && category) {
            setMeetupCreationDate(new Date(date).toISOString());
            setMeetupCreationCategory(category);
            setMeetupCreationMaxParticipants(maxParticipants ? parseInt(maxParticipants) : null);
            setMeetupCreationStep(3);
            navigate('/meetups/create/step-3');
        }
    };

    const handleBack = () => {
        setMeetupCreationStep(1);
        navigate('/meetups/create/step-1');
    };

    return (
        <>
            <Box className='absolute top-4 right-4 z-10'>
                <ThemeToggle />
            </Box>
            
            <Container className={` ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
            <Box className='mb-8 flex w-full items-center justify-between'>
                <IconButton onClick={handleBack} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4' className={`font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Meetup</Typography>
                <Box className='w-10' />
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className={`mb-2 font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>When is your meetup?</Typography>
                <Typography variant='body2' className={`mb-4 font-poppins ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
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

            <Box className='mb-6'>
                <Typography variant='h5' className={`mb-2 font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What category?</Typography>
                <Typography variant='body2' className={`mb-4 font-poppins ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                    Choose a category that best describes your meetup.
                </Typography>
                <TextField
                    fullWidth
                    select
                    value={category}
                    onChange={(e) => setCategoryLocal(e.target.value)}
                    variant='outlined'
                    size='medium'
                >
                    {categories.filter(cat => cat.name !== 'All').map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box className='mb-6'>
                <Typography variant='h5' className={`mb-2 font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Max participants (optional)</Typography>
                <Typography variant='body2' className={`mb-4 font-poppins ${isDarkMode ? 'text-gray-300' : 'text-text-3'}`}>
                    Set a limit on how many people can join. Leave empty for unlimited.
                </Typography>
                <TextField
                    fullWidth
                    type='number'
                    placeholder='e.g., 50'
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipantsLocal(e.target.value)}
                    variant='outlined'
                    size='medium'
                    inputProps={{ min: 1 }}
                />
            </Box>

            <Box className='mt-auto'>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={handleNext}
                    disabled={!date || !category}
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

export default CreateMeetupStep2;

