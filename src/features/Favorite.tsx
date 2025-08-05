import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@/components/layout/Container';
import IconMore from '@/components/icons/3dots.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';

function Favorite() {
    return (
        <Container>
            <Box className={'mb-6 flex w-full items-center justify-between'}>
                <ArrowCircle />

                <Typography variant='h4'>Favorite</Typography>
                <IconMore />
            </Box>
        </Container>
    );
}

export default Favorite;
