import Container from '@/components/Container';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import IconMore from '@/styles/assets/icons/3dots.svg?react';
import ArrowCircle from '@/styles/assets/icons/arrowcircleleft.svg?react';
import SeatPicker from '@/components/SeatPicker';

function SelectSeats() {
    return (
        <Container>
            <Box className={'flex w-full items-center justify-between'}>
                <ArrowCircle />
                <Typography variant='h4'>Select Seats</Typography>
                <IconMore />
            </Box>
            <Stack direction={'row'} spacing={1} className='mt-4 h-8 w-full overflow-hidden'>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
            </Stack>
            <SeatPicker />
            <Button variant='contained'>Get ticket</Button>
        </Container>
    );
}

export default SelectSeats;
