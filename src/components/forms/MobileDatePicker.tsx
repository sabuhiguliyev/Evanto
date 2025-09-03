import { Box, InputAdornment, Typography } from '@mui/material';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { CalendarTodayOutlined, KeyboardArrowDownOutlined, AccessTime } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
    label?: string;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    time: Date;
    setTime: Dispatch<SetStateAction<Date>>;
};

const CustomMobileDatePicker = ({ label, date, setDate, time, setTime }: Props) => {
    return (
        <Box className='flex w-full items-center justify-between gap-3'>
            <MobileDatePicker
                value={date}
                onChange={(newDate: Date | null) => {
                    if (newDate) setDate(newDate);
                }}
                format='MMM d'
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                    borderRadius: '999px',
                    border: '1px solid #eee',
                    width: '140px',
                    height: '50px',
                    justifyContent: 'center',
                }}
                slotProps={{
                    textField: {
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CalendarTodayOutlined className='text-sm text-primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDownOutlined className='text-base' />
                                </InputAdornment>
                            ),
                            sx: {
                                input: {
                                    height: '10px',
                                    fontSize: '13px',
                                    color: '#aaa',
                                },
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
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                    borderRadius: '999px',
                    border: '1px solid #eee',
                    width: '140px',
                    height: '50px',
                    justifyContent: 'center',
                }}
                slotProps={{
                    textField: {
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccessTime className='text-sm text-primary' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDownOutlined className='text-base' />
                                </InputAdornment>
                            ),
                            sx: {
                                input: {
                                    height: '10px',
                                    fontSize: '13px',
                                    color: '#aaa',
                                },
                            },
                        },
                    },
                }}
            />
        </Box>
    );
};

export default CustomMobileDatePicker;
