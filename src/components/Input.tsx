import { TextField } from '@mui/material';
import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

type InputProps = {
    label?: string;
    placeholder?: string;
    type?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
};

// Function to get default icons and placeholders based on type
const getDefaultProps = (type?: string) => {
    switch (type) {
        case 'email':
            return { icon: <MailOutlineIcon color='disabled' />, placeholder: 'Enter your email' };
        case 'password':
            return { icon: <LockOutlinedIcon color='disabled' />, placeholder: 'Enter your password' };
        case 'text':
            return { icon: <PersonOutlinedIcon color='disabled' />, placeholder: 'Enter your name' };
        default:
            return { icon: null, placeholder: 'Enter text' };
    }
};

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', startIcon, endIcon, className = '' }) => {
    const { icon, placeholder: defaultPlaceholder } = getDefaultProps(type);
    const [isFilled, setIsFilled] = useState(false);

    return (
        <div className={`w-full ${className}`}>
            <label className='mb-2 block text-sm font-bold text-gray-700'>{label}</label>
            <TextField
                placeholder={placeholder ?? defaultPlaceholder} // Use provided placeholder or default
                type={type}
                variant='outlined'
                fullWidth
                onChange={e => setIsFilled(e.target.value.length > 0)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        border: '1px solid #EEE',
                        gap: '15px',

                        '&:hover': {
                            borderColor: '#5D9BFC',
                        },
                        '&.Mui-focused': {
                            borderColor: '#5D9BFC',
                        },
                    },
                    '& .MuiInputBase-root': {
                        backgroundColor: 'transparent',
                    },
                    '& .MuiInputBase-root.Mui-focused': {
                        backgroundColor: '#5D9BFC26',
                    },
                    '& .MuiSvgIcon-root': {
                        color: isFilled ? '#000' : '#AAA', // Change color if filled
                    },
                    '& .MuiOutlinedInput-root.Mui-focused  .MuiSvgIcon-root': {
                        color: '#5D9BFC',
                    },
                }}
                InputProps={{
                    startAdornment: startIcon !== null ? (startIcon ?? icon) : undefined, // Ensure null prevents default icon
                    endAdornment: endIcon ?? (type === 'password' ? <VisibilityOutlinedIcon color='disabled' /> : null),
                }}
            />
        </div>
    );
};

export default Input;
