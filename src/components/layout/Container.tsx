import { Container as MUIContainer } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <>
            <Toaster position='top-left' reverseOrder={false} />
            <MUIContainer
                disableGutters
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
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
                className={className}
            >
                {children}
            </MUIContainer>
        </>
    );
};

export default Container;
