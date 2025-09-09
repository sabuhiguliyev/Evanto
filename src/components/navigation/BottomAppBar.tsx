import { Box, useTheme } from '@mui/material';
import Rectangle from '@/assets/icons/rectangle.svg?react';
import DiscoveryButton from '@/assets/icons/buttonDiscovery.svg?react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConfirmationNumberOutlined, FavoriteBorderOutlined, HomeOutlined, PersonOutlined } from '@mui/icons-material';

interface BottomAppBarProps {
    className?: string;
}

const BottomAppBar: React.FC<BottomAppBarProps> = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState('');
    const theme = useTheme();

    useEffect(() => {
        // Set selected state based on current route
        const path = location.pathname;
        if (path === '/home' || path === '/main-page-1') {
            setSelected('home');
        } else if (path === '/favorites') {
            setSelected('favorite');
        } else if (path === '/tickets') {
            setSelected('ticket');
        } else if (path === '/profile') {
            setSelected('profile');
        } else {
            setSelected('');
        }
    }, [location.pathname]);

    return (
        <Box className={`${className} absolute bottom-0 w-full cursor-pointer`}>
            <Box
                sx={{
                    '& svg path': {
                        fill: theme.palette.mode === 'dark' ? '#1C2039' : 'white',
                    },
                    filter: 'drop-shadow(0px -4px 15px rgba(0, 0, 0, 0.04))'
                }}
            >
                <Rectangle />
            </Box>
            <DiscoveryButton
                className='absolute bottom-[calc(20%)] left-1/2 -translate-x-1/2 transform'
                onClick={() => navigate('/search')}
            />
            <HomeOutlined
                onClick={() => {
                    setSelected('home');
                    navigate('/home');
                }}
                className={`absolute bottom-8 left-5 h-[35px] ${selected === 'home' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            />
            <span
                className={`absolute bottom-4 left-4 w-[35px] text-xs ${selected === 'home' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} `}
            >
                Home
            </span>

            <FavoriteBorderOutlined
                onClick={() => {
                    setSelected('favorite');
                    navigate('/favorites');
                }}
                className={`absolute bottom-8 left-24 h-[35px] ${selected === 'favorite' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            />
            <span
                className={`absolute bottom-4 left-20 w-[35px] text-xs ${selected === 'favorite' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} `}
            >
                Favorites
            </span>

            <ConfirmationNumberOutlined
                onClick={() => {
                    setSelected('ticket');
                    navigate('/tickets');
                }}
                className={`absolute bottom-8 right-5 h-[35px] ${selected === 'ticket' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            />
            <span
                className={`absolute bottom-4 right-2 w-[50px] text-center text-xs ${selected === 'ticket' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} `}
            >
                Tickets
            </span>

            <PersonOutlined
                onClick={() => {
                    setSelected('profile');
                    navigate('/profile');
                }}
                className={`absolute bottom-8 right-24 h-[35px] ${selected === 'profile' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            />
            <span
                className={`absolute bottom-4 right-20 w-[50px] text-center text-xs ${selected === 'profile' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} `}
            >
                Profile
            </span>
        </Box>
    );
};

export default BottomAppBar;
