import React from 'react';
import { Typography } from '@mui/material';

interface PaymentCardProps {
    size?: 'normal' | 'compact';
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    ProcessingIcon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    className?: string;
    variant?: 'gradient-blue' | 'gradient-dark' | 'glass'; // Restored variant
}

const PaymentCard: React.FC<PaymentCardProps> = ({
    size = 'normal',
    className = '',
    ProcessingIcon,
    cardHolder = 'John Doe',
    cardNumber = '•••• •••• •••• 4242',
    expiryDate = '09/25',
    variant = 'gradient-blue', // Restored with default
}) => {
    // Size configuration
    const sizeConfig = {
        normal: {
            width: 'w-[335px]',
            cardPadding: 'p-6',
            textSizes: {
                label: 'text-sm',
                primary: 'text-lg',
                secondary: 'text-base',
            },
            iconSize: 'h-8 w-8',
            spacing: 'gap-4',
        },
        compact: {
            width: 'w-[260px]',
            cardPadding: 'p-4',
            textSizes: {
                label: 'text-xs',
                primary: 'text-sm',
                secondary: 'text-xs',
            },
            iconSize: 'h-6 w-6',
            spacing: 'gap-2',
        },
    };

    // Background configuration
    const variantConfig = {
        'gradient-blue': 'bg-gradient-to-br from-blue-400 to-blue-600',
        'gradient-dark': 'bg-gradient-to-br from-gray-800 to-gray-900',
        glass: 'backdrop-blur-md bg-white/10',
    };

    const { width, cardPadding, textSizes, iconSize, spacing } = sizeConfig[size];
    const backgroundClass = variantConfig[variant];

    return (
        <div className={`relative ${width} h-[185px] ${backgroundClass} ${className} rounded-2xl`}>
            {/* White overlay for gradient-blue variant */}
            {variant === 'gradient-blue' && <div className='absolute right-0 top-0 h-full w-1/2 bg-white/10' />}

            {/* Card Content */}
            <div className={`relative z-30 flex h-full flex-col justify-between ${cardPadding} ${spacing} text-white`}>
                <div className='flex items-start justify-between'>
                    <Typography variant='body2' className={`${textSizes.label} font-medium`}>
                        Credit
                    </Typography>
                    <div className={iconSize}>
                        {React.isValidElement(ProcessingIcon) &&
                            React.cloneElement(ProcessingIcon, {
                                className: `text-white ${iconSize} ${ProcessingIcon.props.className || ''}`,
                                width: '100%',
                                height: '100%',
                            })}
                    </div>
                </div>

                <div className='flex items-end justify-between'>
                    <div className={`space-y-1 ${textSizes.secondary}`}>
                        <Typography className='truncate font-medium'>{cardHolder}</Typography>
                        <Typography fontFamily='monospace' className='truncate tracking-wide'>
                            {cardNumber.match(/.{1,4}/g)?.join(' ')}
                        </Typography>
                    </div>

                    <div className={`text-right ${textSizes.secondary}`}>
                        <Typography variant='caption' className='opacity-80'>
                            Valid date
                        </Typography>
                        <Typography className='font-medium'>{expiryDate}</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;
