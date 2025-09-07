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
import useBookingStore from '@/store/bookingStore';
import { UnifiedItem } from '@/types/UnifiedItem';

interface GetTicketProps {
    open: boolean;
    onClose: () => void;
    item?: UnifiedItem;
}

function GetTicket({ open, onClose }: GetTicketProps) {
    const navigate = useNavigate();
    const { bookingData: bookingFlow } = useBookingStore();

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
                    width: '375px', // Exact container width
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    boxShadow: 24,
                    maxHeight: '75vh',
                    minHeight: '200px', // Minimum height for usability
                    height: 'auto', // Let content determine height
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'fixed',
                    left: '37px', // Align with Container's left edge + 15px to the right
                    right: 'auto',
                    border: '1px solid gray' // Match container border
                },
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    flexShrink: 0
                }}
            >
                <Typography variant="h6" component="h2" className="font-poppins font-semibold text-text-1">
                    Your Selection
                </Typography>
                <IconButton 
                    onClick={onClose}
                    size="small"
                    sx={{ 
                        bgcolor: 'grey.100',
                        '&:hover': { bgcolor: 'grey.200' }
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
            </Box>
            
            <Box sx={{ overflow: 'auto', p: 2 }} className="no-scrollbar">

                <Table
                    size='small'
                    sx={{
                        '& .MuiTableCell-root': {
                            border: 'none',
                            py: 1,
                            px: 2,
                            fontSize: '0.875rem',
                            '&:last-child': {
                                textAlign: 'right',
                            },
                        },
                        '& .MuiTableHead-root .MuiTableCell-root': {
                            fontWeight: '600',
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            fontFamily: 'inherit',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
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
                        {bookingFlow.selected_seats.map((seat, index) => {
                            const isVip = seat.type.toLowerCase() === 'vip';
                            const originalPrice = isVip ? seat.price / 1.2 : seat.price;
                            
                            return (
                                <TableRow key={index}>
                                    <TableCell>{seat.type}</TableCell>
                                    <TableCell>{`Row ${String.fromCharCode(65 + seat.row)}`}</TableCell>
                                    <TableCell>{`${String.fromCharCode(65 + seat.row)}${seat.column + 1}`}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                ${seat.price.toFixed(2)}
                                            </Typography>
                                            {isVip && (
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                                                    (Base: ${originalPrice.toFixed(2)} + 20%)
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

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

            </Box>
            
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
                <Button 
                    variant='contained' 
                    fullWidth 
                    onClick={handleGetTicket} 
                    size='large'
                    className='w-full h-12'
                >
                    Get Ticket
                </Button>
            </Box>
        </Drawer>
    );
}

export default GetTicket;
