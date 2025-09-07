// features/SelectSeats.tsx
import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import IconMore from '@/components/icons/3dots.svg?react';
import ArrowCircle from '@/components/icons/arrowcircleleft.svg?react';
import SeatPicker from '@/components/forms/SeatPicker';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import useBookingStore from '@/store/bookingStore';
import { showError } from '@/utils/notifications';
import GetTicket from '@/features/tickets/GetTicket';

import { useQuery } from '@tanstack/react-query';
import { getEvents, getMeetups } from '@/services';

function SelectSeats() {
    const navigate = useNavigate();
        const { bookingData: bookingFlow, addSeat, removeSeat } = useBookingStore();
    const [showGetTicket, setShowGetTicket] = useState(false);

    // Fetch events and meetups
    const { data: events = [] } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    const { data: meetups = [] } = useQuery({
        queryKey: ['meetups'],
        queryFn: getMeetups,
    });

    // Merge events and meetups into unified items
    const items = [
        ...events.map(event => ({ ...event, type: 'event' as const })),
        ...meetups.map(meetup => ({ ...meetup, type: 'meetup' as const })),
    ];

    const item = items.find(i => i.id === bookingFlow.event_id);

    const handleSeatSelect = (seat: { row: number; column: number; type: string; price: number }) => {
        addSeat(seat);
    };

    const handleSeatDeselect = (seatId: string) => {
        removeSeat(seatId);
    };

    const handleShowGetTicket = () => {
        if (bookingFlow.selected_seats.length === 0) {
            showError('Please select at least one seat');
            return;
        }
        setShowGetTicket(true);
    };

    return (
        <Container className='justify-start'>
            <Box className='mb-8 flex w-full items-center justify-between'>
                    <IconButton onClick={() => navigate(-1)} className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h4'>Select Seats</Typography>
                <IconButton className="text-text-3 border border-neutral-200 bg-gray-100 dark:bg-gray-700">
                    <IconMore />
                </IconButton>
            </Box>

            <SeatPicker
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
                selectedSeats={bookingFlow.selected_seats}
                item={item}
            />

            <Button
                variant='contained'
                onClick={handleShowGetTicket}
                disabled={bookingFlow.selected_seats.length === 0}
                size='large'
                className='w-full h-12 mt-4'
            >
                Get Ticket
            </Button>

            <GetTicket open={showGetTicket} onClose={() => setShowGetTicket(false)} item={item} />
        </Container>
    );
}

export default SelectSeats;
