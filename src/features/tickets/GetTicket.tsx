import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Divider,
    TableFooter,
    Button,
    Drawer,
    IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '@/store/dataStore';
import { UnifiedItem } from '@/types/UnifiedItem';

interface GetTicketProps {
    open: boolean;
    onClose: () => void;
    item?: UnifiedItem;
}

function GetTicket({ open, onClose }: GetTicketProps) {
    const navigate = useNavigate();
    const { bookingFlow } = useDataStore();

    const handleGetTicket = () => {
        onClose();
        navigate('/bookings/summary');
    };

    return (
        <Drawer
            anchor='bottom'
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px',
                    maxHeight: '80vh',
                    width: '375px',
                    margin: '0 auto',
                    border: 2,
                    borderColor: 'divider',
                    position: 'fixed',
                    left: '22px', // Align with Container's left edge + 2px adjustment
                    right: 'auto',
                },
            }}
            sx={{
                position: 'fixed',
                left: '22px',
                right: 'auto',
            }}
        >
            <Box sx={{ p: 1, overflow: 'auto' }} className="no-scrollbar">
                <Box className='mb-2 flex items-center justify-between'>
                    <Typography variant='h6'>Your Selection</Typography>
                    <IconButton onClick={onClose} size='small'>
                        <Close />
                    </IconButton>
                </Box>

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
                        {bookingFlow.selected_seats.map((seat, index) => (
                            <TableRow key={index}>
                                <TableCell>{seat.type}</TableCell>
                                <TableCell>{`Row ${String.fromCharCode(65 + seat.row)}`}</TableCell>
                                <TableCell>{`${String.fromCharCode(65 + seat.row)}${seat.column + 1}`}</TableCell>
                                <TableCell>${seat.price.toFixed(2)}</TableCell>
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
                                <Typography variant='body2'>
                                    {bookingFlow.selected_seats.length} Seat
                                    {bookingFlow.selected_seats.length !== 1 ? 's' : ''}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='body2'>${bookingFlow.total_price.toFixed(2)}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                <Button variant={'contained'} fullWidth onClick={handleGetTicket} className='mt-3'>
                    Get Ticket
                </Button>
            </Box>
        </Drawer>
    );
}

export default GetTicket;
