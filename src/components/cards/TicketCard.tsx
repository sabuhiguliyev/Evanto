import React from 'react';
import { Box, Typography } from '@mui/material';
import Subtract3 from '@/assets/icons/subtract3.svg?react';
import Barcode2 from '@/assets/icons/barcode2.svg?react';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface TicketCardProps {
    imageUrl: string;
    eventName: string;
    eventLocation: string;
    eventDate: string;
    eventTime: string;
    seatNumber: string;
}

const TicketCard = ({ imageUrl, eventName, eventTime, eventLocation, eventDate, seatNumber }: TicketCardProps) => {
    const { isDarkMode } = useDarkMode();
    return (
        <Box 
            className={`relative w-80 h-[453px] rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-neutral-50'}`}
        >
            {/* Event Image */}
            <img src={imageUrl} alt={eventName} className='w-full h-24 rounded-xl object-cover mb-6' />
            
            {/* Event Title */}
            <Typography className={`text-center font-bold text-xl leading-6 mb-8 font-poppins ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {eventName}
            </Typography>
            
            {/* Event Details Section */}
            <Box className='space-y-6'>
                {/* Location and Seat Info */}
                <Box className='flex justify-between items-start'>
                    <Box className='flex-1'>
                        <Typography className={`font-poppins text-sm font-medium leading-4 mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Event Mall
                        </Typography>
                        <Typography className={`font-poppins text-sm font-medium leading-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {eventLocation}
                        </Typography>
                    </Box>
                    <Box className='flex-1 text-right'>
                        <Typography className={`font-poppins text-sm font-medium leading-4 mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Seat
                        </Typography>
                        <Typography className={`font-poppins text-sm font-medium leading-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {seatNumber}
                        </Typography>
                    </Box>
                </Box>
                
                {/* Date and Time Info */}
                <Box className='flex justify-between items-start'>
                    <Box className='flex-1'>
                        <Typography className={`font-poppins text-sm font-medium leading-4 mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Date
                        </Typography>
                        <Typography className={`font-poppins text-sm font-medium leading-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {eventDate}
                        </Typography>
                    </Box>
                    <Box className='flex-1 text-right'>
                        <Typography className={`font-poppins text-sm font-medium leading-4 mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Time
                        </Typography>
                        <Typography className={`font-poppins text-sm font-medium leading-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {eventTime}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
            {/* Barcode */}
            <Box className='mt-8 flex justify-center'>
                <Barcode2 className={`${isDarkMode ? 'invert' : ''}`} />
            </Box>
        </Box>
    );
};
export default TicketCard;
