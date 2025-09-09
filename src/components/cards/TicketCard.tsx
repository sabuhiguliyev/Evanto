import React from 'react';
import { Box, Typography } from '@mui/material';
import Subtract3 from '@/assets/icons/subtract3.svg?react';
import Barcode2 from '@/assets/icons/barcode2.svg?react';

interface TicketCardProps {
    imageUrl: string;
    eventName: string;
    eventLocation: string;
    eventDate: string;
    eventTime: string;
    seatNumber: string;
}

const TicketCard = ({ imageUrl, eventName, eventTime, eventLocation, eventDate, seatNumber }: TicketCardProps) => {
    return (
        <Box 
            className='relative w-[335px] h-[453px] rounded-[20px] p-6 shadow-lg'
            sx={{ 
                backgroundColor: '#FFFFFF26',
                background: 'var(--f-15, #FFFFFF26)'
            }}
        >
            {/* Event Image */}
            <img src={imageUrl} alt={eventName} className='w-full h-24 rounded-[11px] object-cover mb-6' />
            
            {/* Event Title */}
            <Typography className='text-center text-white font-bold text-[17px] leading-[21px] mb-8 font-poppins'>
                {eventName}
            </Typography>
            
            {/* Event Details Section */}
            <Box className='space-y-6'>
                {/* Location and Seat Info */}
                <Box className='flex justify-between items-start'>
                    <Box className='flex-1'>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px] mb-1'>
                            Event Mall
                        </Typography>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px]'>
                            {eventLocation}
                        </Typography>
                    </Box>
                    <Box className='flex-1 text-right'>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px] mb-1'>
                            Seat
                        </Typography>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px]'>
                            {seatNumber}
                        </Typography>
                    </Box>
                </Box>
                
                {/* Date and Time Info */}
                <Box className='flex justify-between items-start'>
                    <Box className='flex-1'>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px] mb-1'>
                            Date
                        </Typography>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px]'>
                            {eventDate}
                        </Typography>
                    </Box>
                    <Box className='flex-1 text-right'>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px] mb-1'>
                            Time
                        </Typography>
                        <Typography className='font-poppins text-[9px] font-medium text-white leading-[11px]'>
                            {eventTime}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
            {/* Barcode */}
            <Box className='mt-8 flex justify-center'>
                <Barcode2 className='invert' />
            </Box>
        </Box>
    );
};
export default TicketCard;
