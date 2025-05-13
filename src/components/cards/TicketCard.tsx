import React from 'react';
import { Box, Typography } from '@mui/material';
import Subtract2 from '@/components/icons/subtract2.svg?react';
import Barcode from '@/components/icons/bar code.svg?react';

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
        <Box className='relative'>
            <Subtract2 className='' />
            <Box className='absolute inset-0 p-4'>
                {' '}
                <img src={imageUrl} alt={eventName} className='h-20 w-full rounded-xl object-cover' />
                <Typography variant='h6' className='mt-2'>
                    {eventName}
                </Typography>
                <Box className='mt-6 flex justify-between'>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Event Mall</Typography>
                        <Typography variant='h6'>{eventLocation}</Typography>
                    </Box>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Seat</Typography>
                        <Typography variant='h6'>{seatNumber}</Typography>
                    </Box>
                </Box>{' '}
                <Box className='mt-6 flex justify-between'>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Date</Typography>
                        <Typography variant='h6'>{eventDate}</Typography>
                    </Box>
                    <Box>
                        <Typography className='font-header text-[9px] font-medium text-text-3'>Time</Typography>
                        <Typography variant='h6'>{eventTime}</Typography>
                    </Box>
                </Box>
                <Barcode className='mt-8' />
            </Box>
        </Box>
    );
};
export default TicketCard;
