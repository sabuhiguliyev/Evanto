import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import Container from '@/components/Container';
import TicketCard2 from '@/components/TicketCard2';

function TicketDetails() {
    return (
        <Container className='relative overflow-hidden'>
            <Box className={'flex w-full items-center justify-between'}>
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
                    <TicketCard2
                        imageUrl='/illustrations/chairs.png'
                        eventName='International Conference 2024'
                        eventLocation='Baku Crystal Hall'
                        seatNumber='C1, C2, C4'
                        eventDate='Wed 12, Mar 2024'
                        eventTime='12:30'
                    />
                </Box>
            </Box>
            <Button variant='contained' className='mb-36'>
                Direction
            </Button>
        </Container>
    );
}

export default TicketDetails;
