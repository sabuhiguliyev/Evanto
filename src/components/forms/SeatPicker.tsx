import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface SeatPickerProps {
    onSeatSelect: (seat: { row: number; column: number; type: string; price: number }) => void;
    onSeatDeselect: (seatId: string) => void;
    selectedSeats: { row: number; column: number; type: string; price: number }[];
}

const SeatPicker: React.FC<SeatPickerProps> = ({ onSeatSelect, onSeatDeselect, selectedSeats }) => {
    const toggleSeat = (row: number, column: number) => {
        const seatId = `${row}-${column}`;
        const isSelected = selectedSeats.some(s => s.row === row && s.column === column);

        if (isSelected) {
            onSeatDeselect(seatId);
        } else {
            const seatType = row === 0 ? 'VIP' : 'Standard';
            const price = row === 0 ? 19.99 : row < 3 ? 12.99 : 10.99;
            onSeatSelect({ row, column, type: seatType, price });
        }
    };

    const seatTypes = {
        normal: {
            component: (selected: boolean) => (
                <svg
                    width='25'
                    height='40'
                    viewBox='0 0 25 40'
                    fill='none'
                    className='cursor-pointer transition-colors hover:opacity-80'
                >
                    <rect
                        width='25'
                        height='40'
                        rx='10'
                        fill={selected ? '#5D9BFC' : '#EEEEEE'}
                        stroke={selected ? '#5D9BFC' : '#D1D5DB'}
                        strokeWidth={selected ? '2' : '1'}
                    />
                </svg>
            ),
        },
    };

    const renderRow = (row: number) => {
        return (
            <Box key={`row-${row}`} className='flex justify-center gap-2'>
                {Array(9)
                    .fill(0)
                    .map((_, column) => {
                        const isSelected = selectedSeats.some(s => s.row === row && s.column === column);
                        return (
                            <Box key={`${row}-${column}`} onClick={() => toggleSeat(row, column)}>
                                {seatTypes.normal.component(isSelected)}
                            </Box>
                        );
                    })}
            </Box>
        );
    };

    return (
        <Box>
            <Box className='relative mb-8 flex justify-center'>
                {' '}
                {/* Added margin-bottom */}
                <svg width='335' height='168' viewBox='0 0 335 168' fill='none'>
                    <path
                        d='M1.58743e-05 0.500014C1.97579e-05 44.9238 17.6473 87.5281 49.0596 118.94C80.472 150.353 123.076 168 167.5 168C211.924 168 254.528 150.353 285.94 118.94C317.353 87.5281 335 44.9238 335 0.500015L167.5 0.499999L1.58743e-05 0.500014Z'
                        fill='#F8F8F8'
                    />
                </svg>
            </Box>

            <Box className='flex flex-col items-center gap-[10px]'>
                {Array(7)
                    .fill(0)
                    .map((_, row) => renderRow(row))}
            </Box>

            <Divider className='my-3'>
                <Typography variant='body2' className='px-4 text-gray-500'>
                    Basic
                </Typography>
            </Divider>

            <Box className='flex justify-between'>
                {[
                    { color: 'bg-[#EEEEEE]', label: 'Available' },
                    { color: 'bg-[#1C2039]', label: 'Booked' },
                    { color: 'bg-[#5D9BFC]', label: 'Selected' },
                ].map(item => (
                    <Box key={item.label} className='flex items-center gap-2'>
                        <Box className={`h-4 w-4 rounded-full ${item.color} border border-gray-300`} />
                        <Typography variant='body2'>{item.label}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SeatPicker;
