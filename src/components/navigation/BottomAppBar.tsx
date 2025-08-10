import { Box } from '@mui/material';
import Rectangle from '@/components/icons/rectangle.svg?react';
import DiscoveryButton from '@/components/icons/buttonDiscovery.svg?react';
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
        <Box className={`${className} absolute bottom-0 w-full cursor-pointer`}>
            <Rectangle />
            <DiscoveryButton
                className='absolute bottom-[calc(20%)] left-1/2 -translate-x-1/2 transform'
                onClick={() => navigate('/search')}
            />
            <HomeOutlined
                onClick={() => {
                    setSelected('home');
                    navigate('/main-page-1');
                }}
                className={`absolute bottom-8 left-5 h-[35px] ${selected === 'home' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 left-4 w-[35px] text-xs ${selected === 'home' ? 'text-primary-1' : 'text-gray-500'} `}
            >
                Home
            </span>

            <FavoriteBorderOutlined
                onClick={() => {
                    setSelected('favorite');
                    navigate('/favorite');
                }}
                className={`absolute bottom-8 left-24 h-[35px] ${selected === 'favorite' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 left-20 w-[35px] text-xs ${selected === 'favorite' ? 'text-primary-1' : 'text-gray-500'} `}
            >
                Favorites
            </span>

            <ConfirmationNumberOutlined
                onClick={() => {
                    setSelected('ticket');
                    navigate('/tickets');
                }}
                className={`absolute bottom-8 right-5 h-[35px] ${selected === 'ticket' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 right-2 w-[50px] text-center text-xs ${selected === 'ticket' ? 'text-primary-1' : 'text-gray-500'} `}
            >
                Tickets
            </span>

            <PersonOutlined
                onClick={() => {
                    setSelected('profile');
                    navigate('/profile');
                }}
                className={`absolute bottom-8 right-24 h-[35px] ${selected === 'profile' ? 'text-primary-1' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 right-20 w-[50px] text-center text-xs ${selected === 'profile' ? 'text-primary-1' : 'text-gray-500'} `}
            >
                Profile
            </span>
        </Box>
    );
};

export default BottomAppBar;
