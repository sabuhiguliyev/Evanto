import { MobileDatePicker } from '@mui/x-date-pickers';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { InputAdornment } from '@mui/material';

const CustomMobileDatePicker = () => {
    return (
        <MobileDatePicker
            format='Feb 25'
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none',
                },
                borderRadius: '999px',
                border: ' solid #eee',
                width: '140px',
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
    );
};

export default CustomMobileDatePicker;
