import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Filter from '@/features/Filter';

export default function Test() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Container className='relative'>
            <IconButton onClick={() => setIsOpen(true)}>
                <TuneOutlinedIcon />
            </IconButton>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
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
                    <Filter onClose={() => setIsOpen(false)} />
                </Box>
            </Modal>
        </Container>
    );
}
