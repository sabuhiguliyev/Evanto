import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeftOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@/components/layout/Container';
import TicketCard from '@/components/cards/TicketCard';

function TicketDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const ticket = location.state?.ticket;

    const handleBack = () => {
        navigate('/tickets');
    };

    // If no ticket data, show placeholder or redirect
    if (!ticket) {
        return (
            <Container className='relative justify-start gap-4 overflow-hidden whitespace-nowrap'>
                <Box className='mb-6 flex w-full items-center justify-between'>
                    <IconButton 
                        size='medium' 
                        disableRipple 
                        className='text-text-3' 
                        sx={{ border: '1px solid #EEEEEE' }}
                        onClick={handleBack}
                    >
                        <KeyboardArrowLeftOutlined />
                    </IconButton>
                    <Typography variant='h4'>Ticket Details</Typography>
                    <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                        <DeleteOutlineOutlined />
                    </IconButton>
                </Box>
                <Box className='text-center py-12'>
                    <Typography variant='h6' className='text-text-3 mb-4'>
                        No ticket selected
                    </Typography>
                    <Typography className='text-sm text-text-3'>
                        Please go back and select a ticket to view details
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container className='relative justify-start gap-4 overflow-hidden whitespace-nowrap'>
            <Box className='mb-6 flex w-full items-center justify-between'>
                <IconButton 
                    size='medium' 
                    disableRipple 
                    className='text-text-3' 
                    sx={{ border: '1px solid #EEEEEE' }}
                    onClick={handleBack}
                >
                    <KeyboardArrowLeftOutlined />
                </IconButton>
                <Typography variant='h4'>Ticket Details</Typography>
                <IconButton size='medium' disableRipple className='text-text-3' sx={{ border: '1px solid #EEEEEE' }}>
                    <DeleteOutlineOutlined />
                </IconButton>
            </Box>
            <Box className='-mx-5 w-[375px]'>
                <Box className='overflow-hidden px-5 relative'>
                    <TicketCard
                        imageUrl={ticket.imageUrl}
                        eventName={ticket.eventName}
                        eventLocation={ticket.eventLocation}
                        seatNumber={ticket.seatNumber}
                        eventDate={ticket.eventDate}
                        eventTime={ticket.eventTime}
                    />
                    
                    {/* Status indicator on card - positioned within the card, moved further left */}
                    <Box className='absolute top-2 right-6 z-10'>
                        <Box className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {ticket.status === 'upcoming' ? 'Upcoming' :
                             ticket.status === 'completed' ? 'Completed' :
                             'Cancelled'}
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <Box className='flex-1' />
            <Button variant='contained' className='w-full bg-primary-1 font-header normal-case'>
                Direction
            </Button>
        </Container>
    );
}

export default TicketDetails;
