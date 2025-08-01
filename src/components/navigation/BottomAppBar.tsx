import { Box } from '@mui/material';
import Rectangle from '@/components/icons/rectangle.svg?react';
import DiscoveryButton from '@/components/icons/buttonDiscovery.svg?react';
import IconHome from '@/components/icons/home.svg?react';
import IconFavorite from '@/components/icons/favorite.svg?react';
import IconTicket from '@/components/icons/ticket.svg?react';
import IconProfile from '@/components/icons/profile.svg?react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmationNumberOutlined, FavoriteBorderOutlined, HomeOutlined, PersonOutlined } from '@mui/icons-material';

interface BottomAppBarProps {
    className?: string;
}

const BottomAppBar: React.FC<BottomAppBarProps> = ({ className }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('');

    return (
        <Box className={`${className} absolute bottom-0 w-full`}>
            <Rectangle />
            <DiscoveryButton className='absolute bottom-[calc(20%)] left-1/2 -translate-x-1/2 transform' />
            <HomeOutlined
                onClick={() => {
                    setSelected('home');
                    navigate('/main-page-1');
                }}
                className={`absolute bottom-8 left-5 h-[35px] ${selected === 'home' ? 'text-primary-1' : 'text-gray-500'}`}
            />

            <FavoriteBorderOutlined
                onClick={() => {
                    setSelected('favorite');
                    navigate('/favorite');
                }}
                className={`absolute bottom-8 left-20 h-[35px] ${selected === 'favorite' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <ConfirmationNumberOutlined
                onClick={() => {
                    setSelected('ticket');
                    navigate('/tickets');
                }}
                className={`absolute bottom-8 right-5 h-[35px] ${selected === 'ticket' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <PersonOutlined
                onClick={() => {
                    setSelected('profile');
                    navigate('/profile');
                }}
                className={`absolute bottom-8 right-20 h-[35px] ${selected === 'profile' ? 'text-primary-1' : 'text-gray-500'}`}
            />
        </Box>
    );
};

export default BottomAppBar;
