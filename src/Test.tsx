import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@/components/layout/Container';

function Test() {
    return (
        <Container>
            <Box className="flex items-center justify-center h-full">
                <Typography variant="h4" className="text-center text-text-3">
                    Test Component
                </Typography>
            </Box>
        </Container>
    );
}

export default Test;
