import { Box, useTheme } from '@mui/material';
import { Rectangle } from '@mui/icons-material';
import DiscoveryButton from '@/assets/icons/buttonDiscovery.svg?react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConfirmationNumberOutlined, FavoriteBorderOutlined, HomeOutlined, PersonOutlined } from '@mui/icons-material';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface BottomAppBarProps {
    className?: string;
}

const BottomAppBar: React.FC<BottomAppBarProps> = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState('');
    const theme = useTheme();
    const { isDarkMode } = useDarkMode();

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
        <Box className={`${className} absolute bottom-0 cursor-pointer`} sx={{ left: '-10px', right: 0, width: 'calc(100% + 10px)' }}>
            <Box
                sx={{
                    width: '375px',
                    height: '100px',
                    '& svg': {
                        width: '375px',
                        height: '100px',
                    },
                    '& svg path': {
                        fill: isDarkMode ? '#1C2039' : 'white',
                    },
                    filter: 'drop-shadow(0px -4px 15px rgba(0, 0, 0, 0.04))'
                }}
            >
                <svg viewBox="0 0 375 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <g filter="url(#filter0_d_1572_821)">
                        <path d="M15 45.4588C15 35.6318 22.6144 27.4855 32.419 26.823L141.986 19.4199C153.815 18.6206 164.268 27.3095 165.869 39.0577C167.801 53.2385 177.778 65.237 191.433 69.5247C198.637 71.7871 206.423 71.7681 213.628 69.5057C227.222 65.2369 237.35 53.6031 239.583 39.5306L239.683 38.9008C241.561 27.0672 252.16 18.6231 264.114 19.4363L372.373 26.8009C382.296 27.4759 375 35.7218 375 45.6675V108H15V45.4588Z" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1572_821" x="0" y="0.368896" width="405" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="-4"/>
                            <feGaussianBlur stdDeviation="7.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1572_821"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1572_821" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </Box>
            <DiscoveryButton
                className='absolute bottom-[calc(20%)] left-[54%] -translate-x-1/2 transform'
                onClick={() => navigate('/search')}
            />
            <HomeOutlined
                onClick={() => {
                    setSelected('home');
                    navigate('/home');
                }}
                className={`absolute bottom-8 left-5 h-[35px] ${selected === 'home' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 left-4 w-[35px] text-xs ${selected === 'home' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'} `}
            >
                Home
            </span>

            <FavoriteBorderOutlined
                onClick={() => {
                    setSelected('favorite');
                    navigate('/favorites');
                }}
                className={`absolute bottom-8 left-24 h-[35px] ${selected === 'favorite' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 left-20 w-[35px] text-xs ${selected === 'favorite' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'} `}
            >
                Favorites
            </span>

            <ConfirmationNumberOutlined
                onClick={() => {
                    setSelected('ticket');
                    navigate('/tickets');
                }}
                className={`absolute bottom-8 right-5 h-[35px] ${selected === 'ticket' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 right-2 w-[50px] text-center text-xs ${selected === 'ticket' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'} `}
            >
                Tickets
            </span>

            <PersonOutlined
                onClick={() => {
                    setSelected('profile');
                    navigate('/profile');
                }}
                className={`absolute bottom-8 right-24 h-[35px] ${selected === 'profile' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'}`}
            />
            <span
                className={`absolute bottom-4 right-20 w-[50px] text-center text-xs ${selected === 'profile' ? 'text-primary' : isDarkMode ? 'text-white' : 'text-gray-500'} `}
            >
                Profile
            </span>
        </Box>
    );
};

export default BottomAppBar;
