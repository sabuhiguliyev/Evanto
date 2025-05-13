import React from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Divider,
    TableFooter,
    Button,
} from '@mui/material';

const SeatPricingTable = () => {
    const seatData = [
        { type: 'Standard', column: 'Middle', seat: 'A5', price: '$10.99' },
        { type: 'Standard', column: 'Middle', seat: 'A6', price: '$10.99' },
        { type: 'Standard', column: 'Middle', seat: 'A7', price: '$10.99' },
    ];

    return (
        <Container
            sx={{
                height: 256,
                width: 375,
                border: 2,
                borderColor: 'divider',
                p: 1,
                overflow: 'auto',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                display: 'inline-block',
            }}
        >
            <Table
                size='small'
                sx={{
                    '& .MuiTableCell-root': {
                        border: 'none',
                        py: 0.5,
                        px: 1,
                        fontSize: '0.8125rem',
                        '&:last-child': {
                            textAlign: 'right',
                        },
                    },
                    '& .MuiTableHead-root .MuiTableCell-root': {
                        fontWeight: 'medium',
                        color: 'text.secondary',
                        fontSize: '0.6875rem',
                        fontFamily: 'inherit',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Column</TableCell>
                        <TableCell>Seat</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {seatData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.column}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.price}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={4} sx={{ p: 0 }}>
                            <Divider sx={{ my: 0.5 }} />
                        </TableCell>
                    </TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Typography variant='body2'>3 Seats</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='body2'>${(10.99 * 3).toFixed(2)}</Typography>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Button variant={'contained'} className='mt-3'>
                Get Ticket
            </Button>
        </Container>
    );
};

export default SeatPricingTable;
