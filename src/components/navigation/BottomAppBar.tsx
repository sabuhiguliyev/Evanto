import { Box } from '@mui/material';
import Rectangle from '@/components/icons/rectangle.svg?react';
import DiscoveryButton from '@/components/icons/buttonDiscovery.svg?react';
import IconHome from '@/components/icons/home.svg?react';
import IconFavorite from '@/components/icons/favorite.svg?react';
import IconTicket from '@/components/icons/ticket.svg?react';
import IconProfile from '@/components/icons/profile.svg?react';
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
