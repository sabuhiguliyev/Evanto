import React from 'react';

type ButtonProps = {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'text'; // Add more variants
    size?: 'small' | 'medium' | 'large'; // Add size options
    icon?: React.ReactNode; // For optional icons
    iconPosition?: 'left' | 'right'; // Icon position relative to text
    disabled?: boolean; // For disabled state
    custom?: string; // For additional styles
};

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'left',
    disabled = false,
    custom = '',
}) => {
    // Base styles for all buttons
    const baseStyle =
        ' flex relative items-center justify-center rounded-full  transition duration-300  border-none font-header  text-h3';

    // Variant-specific styles
    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-gray-300 text-black hover:bg-gray-400',
        outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
        text: 'text-primary hover:underline',
    };

    // Size-specific styles
    const sizeStyles = {
        small: 'w-[10rem] h-[2.5rem] text-sm',
        medium: 'w-[15rem] h-[3.5rem] text-base',
        large: 'w-[33.5rem] h-[5rem] text-h3 w-full',
    };

    // Disabled state styles
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle} ${custom}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && (
                <span className='absolute left-2 flex h-full items-center'>{icon}</span>
            )}
            <span className='flex-1 text-center text-[1.9rem]'>{label}</span>
            {icon && iconPosition === 'right' && (
                <span className='absolute right-4 top-1/2 -translate-y-1/2'>{icon}</span>
            )}
        </button>
    );
};

export default Button;
