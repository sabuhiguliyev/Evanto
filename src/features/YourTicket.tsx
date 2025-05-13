import React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import Container from '@/components/layout/Container';
import TicketCard from '@/components/cards/TicketCard';
import BottomAppBar from '@/components/navigation/BottomAppBar';

function YourTicket() {
    return (
        <Container className='relative overflow-hidden whitespace-nowrap pb-[80px]'>
            <Box className={'mb-4 flex w-full items-center justify-between'}>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Ticket Details</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <DeleteOutlineOutlined />
                </IconButton>
            </Box>
            <Box className='-mx-5 w-[375px]'>
                <Box className='overflow-hidden px-5'>
                    <Stack direction={'row'} spacing={2} className='w-max pb-4'>
                        <TicketCard
                            imageUrl='/illustrations/chairs.png'
                            eventName='Victory Day'
                            eventLocation='Baku Crystal Hall'
                            seatNumber='C1, C2, C4'
                            eventDate='Wed 12, Mar 2024'
                            eventTime='12:30'
                        />
                        <TicketCard
                            imageUrl='/illustrations/chairs.png'
                            eventName='Foolish Day'
                            eventLocation='Baku Crystal Hall'
                            seatNumber='C1, C2, C4'
                            eventDate='Wed 12, Mar 2024'
                            eventTime='12:30'
                        />
                    </Stack>
                </Box>
            </Box>
            <Button variant='contained' className='mb-32'>
                Ticket Details
            </Button>
            <BottomAppBar className='fixed bottom-0 z-10 w-full' />{' '}
        </Container>
    );
}

export default YourTicket;
