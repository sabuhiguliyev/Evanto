import Container from '@/components/Container';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import ArrowCircle from '@/styles/assets/icons/arrowcircleleft.svg?react';
import TicketCard from '@/components/TicketCard';

function TicketDetails() {
    return (
        <Container>
            <Box className={'mb-4 flex w-full items-center gap-20'}>
                <ArrowCircle />
                <Typography variant='h4'>Your Ticket</Typography>
            </Box>
            <Stack
                direction={'row'}
                spacing={1}
                className='overflow-x-auto pb-2'
                sx={{
                    '&::-webkit-scrollbar': {
                        height: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'grey.500',
                        borderRadius: '2px',
                    },
                }}
            >
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
        </Container>
    );
}

export default TicketDetails;
