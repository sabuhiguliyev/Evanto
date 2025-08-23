// features/SelectSeats.tsx
import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import { Box, Button, Typography } from '@mui/material';
import IconMore from '@/components/icons/3dots.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import SeatPicker from '@/components/forms/SeatPicker';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '@/store/bookingStore';
import { showError } from '@/utils/notifications';
import GetTicket from '@/features/GetTicket';
import useEventStore from '@/store/eventStore';
import useItemsQuery from '@/hooks/useItemsQuery';

function SelectSeats() {
    const navigate = useNavigate();
    const { bookingData, addSeat, removeSeat } = useBookingStore();
    const { items } = useEventStore();
    const [showGetTicket, setShowGetTicket] = useState(false);

    useItemsQuery();

    const item = items.find(i => i.id === bookingData.event_id);

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

            <SeatPicker
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
                selectedSeats={bookingData.selected_seats}
                item={item}
            />

            <Button
                variant='contained'
                onClick={handleShowGetTicket}
                disabled={bookingData.selected_seats.length === 0}
                className='mt-4'
            >
                Get Ticket
            </Button>

            <GetTicket open={showGetTicket} onClose={() => setShowGetTicket(false)} item={item} />
        </Container>
    );
}

export default SelectSeats;
