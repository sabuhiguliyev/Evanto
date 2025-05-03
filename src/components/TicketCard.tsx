import { Box, Typography } from '@mui/material';
import Subtract2 from '@/styles/assets/icons/subtract2.svg?react';

interface TicketCardProps {
    imageUrl: string;
    eventName: string;
    eventLocation: string;
    seatNumber: string;
    eventDate: string;
    eventTime: string;
}

const TicketCard = ({ imageUrl, eventName, eventTime, eventLocation, eventDate }: TicketCardProps) => {
    return (
        <Box className='relative'>
            <Subtract2 className='' />
            <Box className='absolute inset-0 p-4'>
                {' '}
                {/* Padding container */}
                <img src={imageUrl} alt={eventName} className='h-20 w-full rounded-xl object-cover' />
            </Box>
        </Box>
    );
};
export default TicketCard;
