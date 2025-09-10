import React from 'react';
import Container from '@/components/layout/Container';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import { Box, Typography } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';

function BottomAppBarTest() {
    const { isDarkMode } = useDarkMode();

    return (
        <Container className={isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}>
            <Box className="flex flex-col items-center justify-center h-full">
                <Typography 
                    variant="h4" 
                    className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    BottomAppBar Test
                </Typography>
                
                <Typography 
                    variant="body1" 
                    className={`mb-8 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    Test the BottomAppBar positioning and width alignment with Container
                </Typography>

                <Box 
                    className={`p-4 rounded-lg border-2 ${isDarkMode ? 'border-white/20' : 'border-gray-300'}`}
                >
                    <Typography 
                        variant="body2" 
                        className={isDarkMode ? 'text-white' : 'text-gray-700'}
                    >
                        Container width: 375px + 40px padding = 415px total
                    </Typography>
                    <Typography 
                        variant="body2" 
                        className={isDarkMode ? 'text-white' : 'text-gray-700'}
                    >
                        BottomAppBar should fill this exact width
                    </Typography>
                </Box>
            </Box>

            <BottomAppBar />
        </Container>
    );
}

export default BottomAppBarTest;
