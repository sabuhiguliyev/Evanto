import React from 'react';
import Filter from '@/features/Filter';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFiltersStore } from '@/store/filtersStore';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
}

export default function FilterModal({ open, onClose }: FilterModalProps) {
    const { hasActiveFilters } = useFiltersStore();
    const { isDarkMode } = useDarkMode();
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
                    bgcolor: isDarkMode ? '#1F2937' : 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    boxShadow: 24,
                    maxHeight: '85vh', // Increased from 75vh to 85vh
                    minHeight: '70vh', // Increased from 60vh to 70vh
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    // Match container positioning with shadow and border radius
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    right: 'auto',
                    border: isDarkMode ? '1px solid #374151' : '1px solid gray' // Dark mode border
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
                        borderColor: isDarkMode ? '#374151' : 'divider',
                        flexShrink: 0
                    }}
                >
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        className={`font-jakarta font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                        Filters{activeFiltersCount}
                    </Typography>
                    <IconButton 
                        onClick={onClose}
                        size="small"
                        sx={{ 
                            bgcolor: isDarkMode ? '#374151' : 'grey.100',
                            color: isDarkMode ? '#D1D5DB' : '#374151',
                            '&:hover': { 
                                bgcolor: isDarkMode ? '#4B5563' : 'grey.200',
                                color: isDarkMode ? '#F9FAFB' : '#111827'
                            }
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
