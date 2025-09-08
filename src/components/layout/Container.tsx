import { Container as MUIContainer, useTheme } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    const theme = useTheme();
    
    // Check if className has background color classes
    const hasBackgroundClass = className?.includes('bg-');
    
    return (
        <MUIContainer
            disableGutters
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: hasBackgroundClass ? 'transparent' : (theme.palette.mode === 'dark' ? '#1C2039' : 'white'),
                gap: '15px',
                width: '375px',
                height: '100vh',
                paddingX: '20px',
                paddingY: '35px',
                marginX: 5,
                marginTop: 5,
                border: '1px solid gray',
                overflowY: 'auto',
            }}
            className={`no-scrollbar ${className}`}
        >
            <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                <Toaster 
                    position='top-center' 
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            margin: '0',
                        },
                    }}
                />
            </div>
            {children}
        </MUIContainer>
    );
};

export default Container;
