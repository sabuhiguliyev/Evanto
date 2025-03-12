import { TextField } from '@mui/material';
import React from 'react';

type InputProps = {
    label: string;
    placeholder?: string;
    type?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
};

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', startIcon, endIcon, className = '' }) => {
    return (
        <div className={`w-full ${className}`}>
            <label className='mb-2 block text-sm text-gray-700'>{label}</label>

            <TextField
                placeholder={placeholder}
                type={type}
                variant='outlined'
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '999px',
                        backgroundColor: 'transparent',
                    },
                }}
                InputProps={{
                    startAdornment: startIcon,
                    endAdornment: endIcon,
                }}
            />
        </div>
    );
};

export default Input;
