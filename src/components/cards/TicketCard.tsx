import React from 'react';
import { Box, Typography } from '@mui/material';
import Subtract3 from '@/components/icons/subtract3.svg?react';
import Barcode2 from '@/components/icons/barcode2.svg?react';

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
            <Subtract3 className='' />
            <Box className='absolute inset-0 p-4'>
                {' '}
                <img src={imageUrl} alt={eventName} className='max-h-32 w-full rounded-xl object-cover' />
                <Typography variant='h4' className='mt-2 text-center'>
                    {eventName}
                </Typography>
                <Box className='mt-8 flex justify-between'>
                    <Box>
                        <Typography className='font-poppins text-xs font-medium text-text-muted'>Event Mall</Typography>
                        <Typography variant='h6'>{eventLocation}</Typography>
                    </Box>
                    <Box>
                        <Typography className='font-poppins text-xs font-medium text-text-muted'>Seat</Typography>
                        <Typography variant='h6'>{seatNumber}</Typography>
                    </Box>
                </Box>{' '}
                <Box className='mt-6 flex justify-between'>
                    <Box>
                        <Typography className='font-poppins text-xs font-medium text-text-muted'>Date</Typography>
                        <Typography variant='h6'>{eventDate}</Typography>
                    </Box>
                    <Box>
                        <Typography className='font-poppins text-xs font-medium text-text-muted'>Time</Typography>
                        <Typography variant='h6'>{eventTime}</Typography>
                    </Box>
                </Box>
                <Barcode2 className='mt-12' />
            </Box>
        </Box>
    );
};
export default TicketCard;
