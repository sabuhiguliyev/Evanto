import React from 'react';
import Filter from '@/features/Filter';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
}

export default function FilterModal({ open, onClose }: FilterModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 375,
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    boxShadow: 24,
                    marginLeft: 5,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Filter onClose={onClose} />
            </Box>
        </Modal>
    );
}
