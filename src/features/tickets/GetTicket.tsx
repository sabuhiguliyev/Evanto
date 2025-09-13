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
import { UnifiedItem } from '@/utils/schemas';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface GetTicketProps {
    open: boolean;
    onClose: () => void;
    item?: UnifiedItem;
}

function GetTicket({ open, onClose }: GetTicketProps) {
    const navigate = useNavigate();
    const { bookingData: bookingFlow } = useBookingStore();
    const { isDarkMode } = useDarkMode();

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
                    width: '100%', // Full width within container
                    bgcolor: isDarkMode ? '#1F2937' : 'background.paper',
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
                    left: '38px', // Align with Container's left edge + 15px to the right + 1px
                    right: 'auto',
                    border: isDarkMode ? '1px solid #FFFFFF33' : '1px solid gray' // Match container border
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
                    borderColor: isDarkMode ? '#FFFFFF33' : 'divider',
                    flexShrink: 0
                }}
            >
                <Typography 
                    variant="h6" 
                    component="h2" 
                    className={`font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-text-1'}`}
                >
                    Your Selection
                </Typography>
                <IconButton 
                    onClick={onClose}
                    size="small"
                    sx={{ 
                        bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'grey.100',
                        color: isDarkMode ? 'white' : 'inherit',
                        '&:hover': { 
                            bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'grey.200' 
                        }
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
                            color: isDarkMode ? 'white' : 'inherit',
                            '&:last-child': {
                                textAlign: 'right',
                            },
                        },
                        '& .MuiTableHead-root .MuiTableCell-root': {
                            fontWeight: '600',
                            color: isDarkMode ? '#9CA3AF' : 'text.secondary',
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
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    color: isDarkMode ? 'white' : 'inherit'
                                                }}
                                            >
                                                ${seat.price.toFixed(2)}
                                            </Typography>
                                            {isVip && (
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: isDarkMode ? '#9CA3AF' : 'text.secondary', 
                                                        fontSize: '0.65rem' 
                                                    }}
                                                >
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
                                <Divider 
                                    sx={{ 
                                        my: 0.5,
                                        borderColor: isDarkMode ? '#FFFFFF33' : 'divider'
                                    }} 
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography 
                                    variant='body2'
                                    sx={{ color: isDarkMode ? 'white' : 'inherit' }}
                                >
                                    {bookingFlow.selected_seats.length} Seat
                                    {bookingFlow.selected_seats.length !== 1 ? 's' : ''}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography 
                                    variant='body2'
                                    sx={{ 
                                        color: isDarkMode ? 'white' : 'inherit',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ${bookingFlow.total_price.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </Box>
            
            <Box 
                sx={{ 
                    p: 2, 
                    borderTop: '1px solid', 
                    borderColor: isDarkMode ? '#FFFFFF33' : 'divider', 
                    flexShrink: 0 
                }}
            >
                <Button 
                    variant='contained' 
                    fullWidth 
                    onClick={handleGetTicket} 
                    size='large'
                    className='w-full h-12'
                    sx={{
                        backgroundColor: '#5D9BFC',
                        '&:hover': {
                            backgroundColor: '#4A8BFC',
                        },
                    }}
                >
                    Get Ticket
                </Button>
            </Box>
        </Drawer>
    );
}

export default GetTicket;
