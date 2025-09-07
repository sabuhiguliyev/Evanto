import { Box, InputAdornment, Typography } from '@mui/material';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { CalendarToday, KeyboardArrowDown, AccessTime } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';

interface DateTimePickerProps {
    label?: string;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    time: Date;
    setTime: Dispatch<SetStateAction<Date>>;
}

const DateTimePicker = ({ label, date, setDate, time, setTime }: DateTimePickerProps) => {
    return (
        <Box className='flex w-full items-center justify-between gap-3'>
            <MobileDatePicker
                value={date}
                onChange={(newDate: Date | null) => {
                    if (newDate) setDate(newDate);
                }}
                format='MMM d'
                slotProps={{
                    textField: {
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '9999px', // fully rounded
                                border: '1px solid #eee',
                                width: '140px',
                                height: '50px',
                                '& fieldset': {
                                    display: 'none', // remove default border
                                },
                            },
                        },
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CalendarToday className='text-sm text-primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDown className='text-base' />
                                </InputAdornment>
                            ),
                            sx: {
                                input: {
                                    height: '10px',
                                    fontSize: '13px',
                                    color: '#aaa',
                                },
                                justifyContent: 'center',
                            },
                        },
                    },
                }}
            />
            {label && (
                <Typography variant='body2' color='#aaa'>
                    {label}
                </Typography>
            )}

            <MobileTimePicker
                value={time}
                onChange={(newTime: Date | null) => {
                    if (newTime) setTime(newTime);
                }}
                format='HH:mm'
                slotProps={{
                    textField: {
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '9999px', // fully rounded
                                border: '1px solid #eee',
                                width: '140px',
                                height: '50px',
                                '& fieldset': {
                                    display: 'none', // remove default border
                                },
                            },
                        },
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccessTime className='text-sm text-primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDown className='text-base' />
                                </InputAdornment>
                            ),
                            sx: {
                                input: {
                                    height: '10px',
                                    fontSize: '13px',
                                    color: '#aaa',
                                },
                                justifyContent: 'center',
                            },
                        },
                    },
                }}
            />
        </Box>
    );
};

export default DateTimePicker;
