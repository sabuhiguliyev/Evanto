import React from 'react';
import Filter from '@/features/Filter';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFiltersStore } from '@/store/filtersStore';

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
}

export default function FilterModal({ open, onClose }: FilterModalProps) {
    const { hasActiveFilters } = useFiltersStore();
    const activeFiltersCount = hasActiveFilters() ? ' (Active)' : '';

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            style={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                justifyContent: 'flex-start'
            }}
        >
            <Box
                sx={{
                    width: '375px', // Exact container width
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    boxShadow: 24,
                    maxHeight: '75vh',
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    // Match container positioning exactly like GetTicket
                    position: 'fixed',
                    left: '37px', // Align with Container's left edge + 15px to the right
                    right: 'auto',
                    border: '1px solid gray' // Match container border
                }}
            >
                {/* Header with close button */}
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
                    Filters{activeFiltersCount}
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
                
                {/* Filter content - scrollable */}
                <Box sx={{ flex: 1, overflow: 'auto' }} className="no-scrollbar">
                    <Filter onClose={onClose} />
                </Box>
            </Box>
        </Modal>
    );
}
