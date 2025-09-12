import React from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface CurvedBottomBarProps {
    className?: string;
}

const CurvedBottomBar: React.FC<CurvedBottomBarProps> = ({ className }) => {
    const { isDarkMode } = useDarkMode();

    return (
        <svg 
            className={className}
            width="375" 
            height="119" 
            viewBox="0 0 375 119" 
            fill="transparent" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_1576_43)">
                <path 
                    d="M15 45.4588C15 35.6318 22.6144 27.4855 32.419 26.823L141.986 19.4199C153.815 18.6206 164.268 27.3095 165.869 39.0577C167.801 53.2385 177.778 65.237 191.433 69.5247C198.637 71.7871 206.423 71.7681 213.628 69.5057C227.222 65.2369 237.35 53.6031 239.583 39.5306L239.683 38.9008C241.561 27.0672 252.16 18.6231 264.114 19.4363L372.373 26.8009C382.296 27.4759 390 35.7218 390 45.6675V108H15V45.4588Z" 
                    fill={isDarkMode ? '#FF0000' : '#00FF00'}
                />
            </g>
            <defs>
                <filter id="filter0_d_1576_43" x="0" y="0.368896" width="375" height="118.631" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="-4"/>
                    <feGaussianBlur stdDeviation="7.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1576_43"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_1576_43" result="shape"/>
                </filter>
            </defs>
        </svg>
    );
};

export default CurvedBottomBar;
