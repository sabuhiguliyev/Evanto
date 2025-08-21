import React from 'react';
import { Box, Button, Typography, IconButton, Drawer } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '@/store/bookingStore';

interface GetTicketProps {
    open: boolean;
    onClose: () => void;
}

function Test({ open, onClose }: GetTicketProps) {
    const navigate = useNavigate();
    const { bookingData } = useBookingStore();

    const handleContinue = () => {
        onClose();
        navigate('/summary');
    };

    return (
        <Drawer
            anchor='bottom'
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    maxHeight: '80vh',
                },
            }}
        >
            <Box className='p-4'>
                <Box className='mb-4 flex items-center justify-between'>
                    <Typography variant='h6'>Your Selection</Typography>
                    <IconButton onClick={onClose} size='small'>
                        <Close />
                    </IconButton>
                </Box>

                <Box className='mb-4'>
                    <Typography variant='body2' className='mb-2 text-text-3'>
                        Selected Seats
                    </Typography>
                    {bookingData.selected_seats.map((seat, index) => (
                        <Box key={index} className='flex items-center justify-between border-b border-gray-100 py-2'>
                            <Typography variant='body2'>
                                {seat.seat} - {seat.type}
                            </Typography>
                            <Typography variant='body2'>${seat.price.toFixed(2)}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box className='flex items-center justify-between border-t border-gray-200 py-3'>
                    <Typography variant='h6'>Total</Typography>
                    <Typography variant='h6' className='text-primary-1'>
                        ${bookingData.total_price.toFixed(2)}
                    </Typography>
                </Box>

                <Button variant='contained' fullWidth onClick={handleContinue} className='mt-4'>
                    Continue to Payment
                </Button>
            </Box>
        </Drawer>
    );
}

export default Test;
