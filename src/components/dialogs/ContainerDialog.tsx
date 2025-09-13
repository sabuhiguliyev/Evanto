import React from 'react';
import { Dialog, DialogProps } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';

interface ContainerDialogProps extends Omit<DialogProps, 'sx'> {
    children: React.ReactNode;
}

const ContainerDialog: React.FC<ContainerDialogProps> = ({
    children,
    PaperProps,
    ...dialogProps
}) => {
    const { isDarkMode } = useDarkMode();

    return (
        <Dialog
            {...dialogProps}
            disablePortal={true}
            sx={{
                position: 'absolute',
                zIndex: 1300,
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                '& .MuiDialog-paper': {
                    position: 'relative',
                    margin: '16px',
                    maxWidth: 'calc(100% - 32px)',
                    maxHeight: 'calc(100% - 32px)',
                    width: '100%',
                },
            }}
            PaperProps={{
                className: `rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`,
                ...PaperProps,
            }}
        >
            {children}
        </Dialog>
    );
};

export default ContainerDialog;
