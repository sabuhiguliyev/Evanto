import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface Seat {
    row: number;
    column: number;
    selected: boolean;
    available: boolean;
}

const SeatPicker: React.FC = () => {
    const [seats] = useState<Seat[][]>(
        Array(7)
            .fill(0)
            .map((_, row) =>
                Array(9)
                    .fill(0)
                    .map((_, col) => ({
                        row,
                        column: col,
                        selected: false,
                        available: true,
                    })),
            ),
    );

    const [selectedSeats, setSelectedSeats] = useState<{ [key: string]: boolean }>({});

    const toggleSeat = (row: number, column: number) => {
        setSelectedSeats(prev => ({
            ...prev,
            [`${row}-${column}`]: !prev[`${row}-${column}`],
        }));
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
            height: 40,
        },
        specialLeft: {
            component: (selected: boolean) => (
                <svg
                    width='25'
                    height='32'
                    viewBox='0 0 25 32'
                    fill='none'
                    className='cursor-pointer transition-colors hover:opacity-80'
                >
                    <path
                        d='M0.5 5.43262C0.5 1.32899 5.51851 -0.603401 8.27539 2.3457L8.4043 2.49023L11.2881 5.82715L11.3057 5.84668L11.3242 5.86523L23.0781 16.8828C23.9855 17.7335 24.5 18.9222 24.5 20.166V22C24.5 27.2467 20.2467 31.5 15 31.5H10C4.7533 31.5 0.5 27.2467 0.5 22V5.43262Z'
                        stroke={selected ? '#5D9BFC' : '#D1D5DB'}
                        fill={selected ? '#5D9BFC' : '#EEEEEE'}
                    />
                </svg>
            ),
            height: 32,
        },
        specialRight: {
            component: (selected: boolean) => (
                <svg
                    width='25'
                    height='32'
                    viewBox='0 0 25 32'
                    fill='none'
                    className='cursor-pointer transition-colors hover:opacity-80'
                >
                    <path
                        d='M25 5.43257C25 0.800565 19.2456 -1.34138 16.2169 2.16326L13.3333 5.5L1.5803 16.5185C0.572042 17.4637 0 18.7841 0 20.1662V22C0 27.5228 4.47715 32 10 32H15C20.5228 32 25 27.5228 25 22V5.43257Z'
                        fill={selected ? '#5D9BFC' : '#EEEEEE'}
                        stroke={selected ? '#5D9BFC' : '#D1D5DB'}
                    />
                </svg>
            ),
            height: 32,
        },
    };

    const getSeatComponent = (row: number, col: number) => {
        const isSelected = selectedSeats[`${row}-${col}`];

        if (row === 0) {
            if (col === 0 || col === 8) return seatTypes.normal.component(isSelected);
            if (col === 1) return seatTypes.specialLeft.component(isSelected);
            if (col === 7) return seatTypes.specialRight.component(isSelected);
            return <Box className='h-[40px] w-[25px]' />;
        }
        return seatTypes.normal.component(isSelected);
    };

    const renderSeatGroups = (row: number, start: number, end: number) => (
        <Box className={`flex gap-2 ${end < 8 ? 'mr-[34px]' : ''}`}>
            {seats[row].slice(start, end).map((_, colIndex) => (
                <Box key={`${row}-${start + colIndex}`} onClick={() => toggleSeat(row, start + colIndex)}>
                    {getSeatComponent(row, start + colIndex)}
                </Box>
            ))}
        </Box>
    );

    return (
        <Box>
            <Box className='relative top-10 flex justify-center'>
                <svg width='335' height='168' viewBox='0 0 335 168' fill='none'>
                    <path
                        d='M1.58743e-05 0.500014C1.97579e-05 44.9238 17.6473 87.5281 49.0596 118.94C80.472 150.353 123.076 168 167.5 168C211.924 168 254.528 150.353 285.94 118.94C317.353 87.5281 335 44.9238 335 0.500015L167.5 0.499999L1.58743e-05 0.500014Z'
                        fill='#F8F8F8'
                    />
                </svg>
            </Box>

            <Box className='flex flex-col items-center gap-[10px]'>
                {seats.map((_, rowIndex) => (
                    <Box key={`row-${rowIndex}`} className='flex'>
                        {renderSeatGroups(rowIndex, 0, 3)}
                        {renderSeatGroups(rowIndex, 3, 6)}
                        {renderSeatGroups(rowIndex, 6, 9)}
                    </Box>
                ))}
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
