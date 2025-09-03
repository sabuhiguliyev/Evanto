import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import {
    MailOutline,
    LockOutlined,
    PersonOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined,
} from '@mui/icons-material';

type InputProps = {
    label?: string;
    error?: boolean;
    helperText?: string;
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
            return { icon: <MailOutline color='disabled' />, placeholder: 'Enter your email' };
        case 'password':
            return { icon: <LockOutlined color='disabled' />, placeholder: 'Enter your password' };
        case 'text':
            return { icon: <PersonOutlined color='disabled' />, placeholder: 'Enter your name' };
        default:
            return { icon: null, placeholder: 'Enter text' };
    }
};

const Input: React.FC<InputProps> = ({
    label,
    value,
    placeholder,
    type,
    startIcon,
    endIcon,
    className = '',
    multiline = false,
    onChange,
    error,
    helperText,
    ...props
}) => {
    const [isFilled, setIsFilled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { icon } = getDefaultProps(type);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(e.target.value.length > 0);
        onChange?.(e);
    };

    return (
        <div className={'w-full' + (className ? ` ${className}` : '')}>
            {label && <label className='mb-2 block font-poppins text-sm font-bold text-gray-700'>{label}</label>}

            <TextField
                {...props}
                placeholder={placeholder ?? getDefaultProps(type).placeholder}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                error={error}
                helperText={helperText}
                variant='outlined'
                value={value}
                multiline={multiline}
                fullWidth
                onChange={handleChange}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        border: '1px solid #EEE',
                        gap: '15px',

                        '&.Mui-focused': {
                            borderColor: '#5D9BFC',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            paddingLeft: '5px',
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
                        startAdornment: startIcon ?? icon,
                        endAdornment:
                            type === 'password' ? (
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            ) : (
                                endIcon
                            ),
                    },
                }}
            />
        </div>
    );
};

export default Input;
