import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, InputAdornment, Typography } from '@mui/material';

const CustomMobileDatePicker = () => {
    return (
        <Box className='flex items-center justify-center gap-3'>
            <MobileDatePicker
                format='Feb 25'
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        display: 'none',
                    },
                    borderRadius: '999px',
                    border: ' solid #eee',
                    width: '140px',
                    height: '50px',
                }}
                slotProps={{
                    textField: {
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CalendarTodayOutlinedIcon className='text-sm' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDownOutlinedIcon className='text-base' />
                                </InputAdornment>
                            ),
                        },
                    },
                }}
            />
            <Typography variant='body1'>to</Typography>
            <MobileTimePicker
                format='12:25'
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        display: 'none',
                    },
                    borderRadius: '999px',
                    border: ' solid #eee',
                    width: '140px',
                    height: '50px',
                }}
                slotProps={{
                    textField: {
                        InputProps: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccessTimeIcon className='text-sm' />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <KeyboardArrowDownOutlinedIcon className='text-base' />
                                </InputAdornment>
                            ),
                        },
                    },
                }}
            />
        </Box>
    );
};

export default CustomMobileDatePicker;
