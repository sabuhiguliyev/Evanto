import React, { useState } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { DateTimePicker } from '@/components/forms/DateTimePicker';
import { LocationPicker } from '@/components/forms/LocationPicker';
import { SeatPicker } from '@/components/forms/SeatPicker';

function Test() {
  const { isDarkMode } = useDarkMode();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <>

      <Container>
        <Typography variant="h4" className="text-center py-8 font-bold">
          Form Components Test
        </Typography>
        
        <Box className="flex flex-col items-center space-y-8 p-4">
          <Typography variant="body2" className="text-center text-neutral-500">
            Current mode: {isDarkMode ? 'Dark' : 'Light'}
          </Typography>
          
          <Stack spacing={6} direction="column" alignItems="center" className="w-full">
            {/* DateTimePicker */}
            <Box className="w-full">
              <Typography variant="h6" className="mb-3 text-center">
                DateTimePicker
              </Typography>
              <DateTimePicker
                label="Select Date & Time"
                value={selectedDateTime}
                onChange={setSelectedDateTime}
              />
            </Box>

            {/* LocationPicker */}
            <Box className="w-full">
              <Typography variant="h6" className="mb-3 text-center">
                LocationPicker
              </Typography>
              <LocationPicker
                value={location}
                onChange={setLocation}
                placeholder="Search for a location"
              />
            </Box>

            {/* SeatPicker */}
            <Box className="w-full">
              <Typography variant="h6" className="mb-3 text-center">
                SeatPicker
              </Typography>
              <SeatPicker
                onSeatSelect={(seat) => {
                  console.log('Seat selected:', seat);
                  setSelectedSeats(prev => [...prev, seat]);
                }}
                onSeatDeselect={(seatId) => {
                  console.log('Seat deselected:', seatId);
                  setSelectedSeats(prev => prev.filter(seat => `${seat.row}-${seat.column}` !== seatId));
                }}
                selectedSeats={selectedSeats}
                bookedSeats={[]}
                maxParticipants={10}
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default Test;