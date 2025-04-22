import { Box } from '@mui/material';
import Rectangle from '@/styles/assets/icons/rectangle.svg?react';
import DiscoveryButton from '@/styles/assets/icons/buttonDiscovery.svg?react';
import IconHome from '@/styles/assets/icons/home.svg?react';
import IconFavorite from '@/styles/assets/icons/favorite.svg?react';
import IconTicket from '@/styles/assets/icons/ticket.svg?react';
import IconProfile from '@/styles/assets/icons/profile.svg?react';
import React from 'react';

interface BottomAppBarProps {
    className?: string; // Allow className to be passed as an optional prop
}

const BottomAppBar: React.FC<BottomAppBarProps> = ({ className }) => {
    return (
        <Box className={`${className} absolute bottom-0 w-full`}>
            <Rectangle />
            <DiscoveryButton className='absolute bottom-[calc(20%)] left-1/2 -translate-x-1/2 transform' />
            <IconHome className='absolute bottom-8 left-5 h-[35px] text-gray-500' />{' '}
            <IconFavorite className='absolute bottom-8 left-20 h-[35px] text-gray-500' />{' '}
            <IconTicket className='absolute bottom-8 right-5 h-[35px] text-gray-500' />{' '}
            <IconProfile className='absolute bottom-8 right-20 h-[35px] text-gray-500' />{' '}
        </Box>
    );
};

export default BottomAppBar;
