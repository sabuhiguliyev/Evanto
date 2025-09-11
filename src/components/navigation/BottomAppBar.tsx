import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface BottomAppBarProps {
    className?: string;
}

const BottomAppBar: React.FC<BottomAppBarProps> = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState('');
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

    const handleNavigation = (route: string, item: string) => {
        setSelected(item);
        navigate(route);
    };

    return (
        <Box className={`${className} flex justify-center relative`} sx={{ marginTop: 'auto' }}>
            <svg width="405" height="119" viewBox="0 0 405 119" fill="transparent" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1576_43)">
                        <path d="M15 45.4588C15 35.6318 22.6144 27.4855 32.419 26.823L141.986 19.4199C153.815 18.6206 164.268 27.3095 165.869 39.0577C167.801 53.2385 177.778 65.237 191.433 69.5247C198.637 71.7871 206.423 71.7681 213.628 69.5057C227.222 65.2369 237.35 53.6031 239.583 39.5306L239.683 38.9008C241.561 27.0672 252.16 18.6231 264.114 19.4363L372.373 26.8009C382.296 27.4759 390 35.7218 390 45.6675V108H15V45.4588Z" fill={isDarkMode ? '#1C2039' : 'white'}/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1576_43" x="0" y="0.368896" width="405" height="118.631" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="-4"/>
                            <feGaussianBlur stdDeviation="7.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1576_43"/>
                            <feBlend mode="normal" in2="effect1_dropShadow_1576_43" result="shape"/>
                        </filter>
                    </defs>
                </svg>
                
                {/* Navigation Items */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '375px',
                        height: '90px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        zIndex: 1,
                    }}
                >
                    {/* Home */}
                    <Box 
                        className='flex flex-col items-center cursor-pointer'
                        onClick={() => handleNavigation('/home', 'home')}
                    >
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '4px',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={selected === 'home' ? '#5D9BFC' : (isDarkMode ? '#AAAAAA' : '#9CA3AF')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22V12H15V22" stroke={selected === 'home' ? '#5D9BFC' : (isDarkMode ? '#AAAAAA' : '#9CA3AF')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Box>
                        <Typography variant="caption" className={`font-medium text-xs ${selected === 'home' ? 'text-[#5D9BFC]' : (isDarkMode ? 'text-[#AAAAAA]' : 'text-[#9CA3AF]')}`}>
                            Home
                        </Typography>
                    </Box>

                    {/* Favorite */}
                    <Box 
                        className='flex flex-col items-center cursor-pointer'
                        onClick={() => handleNavigation('/favorites', 'favorite')}
                    >
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '4px',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke={isDarkMode ? '#AAAAAA' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Box>
                        <Typography variant="caption" className={`font-medium text-xs ${isDarkMode ? 'text-[#AAAAAA]' : 'text-[#9CA3AF]'}`}>
                            Favorite
                        </Typography>
                    </Box>

                    {/* Discovery Button */}
                    <Box
                        onClick={() => handleNavigation('/search', 'search')}
                        sx={{
                            width: '62px',
                            height: '62px',
                            backgroundColor: '#5D9BFC',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(93, 155, 252, 0.3)',
                            marginTop: '-55px',
                            marginLeft: '-10px',
                            cursor: 'pointer',
                        }}
                    >
                        {/* Compass/Navigation Icon */}
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L19 12L12 22L5 12L12 2Z" fill="white"/>
                            </svg>
                        </Box>
                    </Box>

                    {/* Ticket */}
                    <Box 
                        className='flex flex-col items-center cursor-pointer'
                        onClick={() => handleNavigation('/tickets', 'ticket')}
                    >
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '4px',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V10C20.8954 10 20 10.8954 20 12C20 13.1046 20.8954 14 22 14V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V14C3.10457 14 4 13.1046 4 12C4 10.8954 3.10457 10 2 10V9Z" stroke={isDarkMode ? '#AAAAAA' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Box>
                        <Typography variant="caption" className={`font-medium text-xs ${isDarkMode ? 'text-[#AAAAAA]' : 'text-[#9CA3AF]'}`}>
                            Ticket
                        </Typography>
                    </Box>

                    {/* Profile */}
                    <Box 
                        className='flex flex-col items-center cursor-pointer'
                        onClick={() => handleNavigation('/profile', 'profile')}
                    >
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '4px',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={isDarkMode ? '#AAAAAA' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke={isDarkMode ? '#AAAAAA' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Box>
                        <Typography variant="caption" className={`font-medium text-xs ${isDarkMode ? 'text-[#AAAAAA]' : 'text-[#9CA3AF]'}`}>
                            Profile
                        </Typography>
                    </Box>
                </Box>
        </Box>
    );
};

export default BottomAppBar;