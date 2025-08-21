// features/SelectSeats.tsx
import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconMore from '@/components/icons/3dots.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import SeatPicker from '@/components/forms/SeatPicker';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '@/store/bookingStore';
import { showError } from '@/utils/notifications';
import GetTicket from '@/features/GetTicket';

function SelectSeats() {
    const navigate = useNavigate();
    const { bookingData, addSeat, removeSeat } = useBookingStore();
    const [showGetTicket, setShowGetTicket] = useState(false);

    const handleSeatSelect = (seat: { row: number; column: number; type: string; price: number }) => {
        addSeat(seat);
    };

    const handleSeatDeselect = (seatId: string) => {
        removeSeat(seatId);
    };

    const handleShowGetTicket = () => {
        if (bookingData.selected_seats.length === 0) {
            showError('Please select at least one seat');
            return;
        }
        setShowGetTicket(true);
    };

    return (
        <Container className='justify-start'>
            <Box className='flex w-full items-center justify-between'>
                <ArrowCircle onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
                <Typography variant='h4' className='mx-auto'>
                    Select Seats
                </Typography>
                <IconMore />
            </Box>
            <Stack direction={'row'} spacing={1} className='mt-4 h-8 w-full overflow-hidden'>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
                <Button className='w-full whitespace-nowrap bg-primary-1 px-2 text-white'>11:00 AM</Button>
            </Stack>

            <SeatPicker
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
                selectedSeats={bookingData.selected_seats}
            />

            <Button
                variant='contained'
                onClick={handleShowGetTicket}
                disabled={bookingData.selected_seats.length === 0}
                className='mt-4'
            >
                Get Ticket
            </Button>

            <GetTicket open={showGetTicket} onClose={() => setShowGetTicket(false)} />
        </Container>
    );
}

export default SelectSeats;
