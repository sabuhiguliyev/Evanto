import React, { useState } from 'react';
import { TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

type InputProps = {
    label?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
    value?: string;
    multiline?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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

const Input: React.FC<InputProps> = ({
    label,
    name,
    value,
    placeholder,
    type = 'text',
    startIcon,
    endIcon,
    className = '',
    multiline = false,
    onChange,
}) => {
    const { icon, placeholder: defaultPlaceholder } = getDefaultProps(type);
    const [isFilled, setIsFilled] = useState(false);

    return (
        <div className={`${className}`}>
            <label className='mb-2 block font-header text-sm font-bold text-gray-700'>{label}</label>
            <TextField
                name={name} // Name is not used in this component, but can be passed for form handling
                placeholder={placeholder ?? defaultPlaceholder}
                type={type}
                className={className}
                variant='outlined'
                value={value}
                multiline={multiline}
                fullWidth
                onChange={e => {
                    setIsFilled(e.target.value.length > 0);
                    if ('value' in e.target) {
                        // Type guard
                        onChange?.(e as React.ChangeEvent<HTMLInputElement>);
                    }
                }}
                sx={{
                    // '& fieldset': { border: 'none' },

                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        border: '1px solid #EEE',
                        gap: '15px',
                        height: '50px',

                        '&:hover': {
                            // borderColor: '#5D9BFC',
                        },
                        '&.Mui-focused': {
                            borderColor: '#5D9BFC',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            paddingLeft: '5px',
                            // color: 'blue',
                        },
                    },
                    '& .MuiInputBase-root': {
                        backgroundColor: 'transparent',
                    },
                    '& .MuiInputBase-root.Mui-focused': {
                        backgroundColor: '#5D9BFC26',
                    },
                    '& .MuiSvgIcon-root': {
                        color: isFilled ? '#000' : '#AAA',
                        height: '20px',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused  .MuiSvgIcon-root': {
                        color: '#5D9BFC',
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: startIcon !== null ? (startIcon ?? icon) : undefined,
                        endAdornment:
                            endIcon ?? (type === 'password' ? <VisibilityOutlinedIcon color='disabled' /> : null),
                    },
                }}
            />
        </div>
    );
};

export default Input;
