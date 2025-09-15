import { Box, TextField } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

interface DateTimePickerProps {
    label?: string;
    value: Date;
    onChange: Dispatch<SetStateAction<Date>>;
}

export const DateTimePicker = ({ label, value, onChange }: DateTimePickerProps) => {
    const formatDateTimeForInput = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = new Date(event.target.value);
        onChange(newValue);
    };

    return (
        <Box className='w-full'>
            <TextField
                label={label || 'Select date and time'}
                type="datetime-local"
                value={formatDateTimeForInput(value)}
                onChange={handleChange}
                fullWidth
                className="rounded-full h-14 border-neutral-200 hover:border-neutral-300 focus:border-blue-500"
            />
        </Box>
    );
};
