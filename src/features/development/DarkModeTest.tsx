import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Container } from '@mui/material';

function DarkModeTest() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <Container className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <Box className="p-8">
                <Typography 
                    variant="h3" 
                    className={`mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Dark Mode Test
                </Typography>
                
                <Paper 
                    elevation={3}
                    className={`p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                    <Typography 
                        variant="h5" 
                        className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                        Current Mode: {isDarkMode ? 'Dark' : 'Light'}
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        This is a test component to verify dark mode functionality across the application.
                    </Typography>
                    
                    <Button
                        variant="contained"
                        onClick={toggleDarkMode}
                        className="mr-4"
                    >
                        Toggle Dark Mode
                    </Button>
                    
                    <Button
                        variant="outlined"
                        onClick={() => window.location.href = '/home'}
                        className={isDarkMode ? 'text-white border-gray-600' : 'text-gray-700 border-gray-300'}
                    >
                        Go to Home
                    </Button>
                </Paper>
                
                <Box className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Typography 
                        variant="h6" 
                        className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                        Test Elements
                    </Typography>
                    <Typography 
                        variant="body2" 
                        className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                        • Background colors adapt to dark/light mode
                    </Typography>
                    <Typography 
                        variant="body2" 
                        className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                        • Text colors are properly contrasted
                    </Typography>
                    <Typography 
                        variant="body2" 
                        className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    >
                        • Interactive elements maintain visibility
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default DarkModeTest;
