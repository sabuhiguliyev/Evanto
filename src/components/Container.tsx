import { Container as MUIContainer } from '@mui/material';
import React from 'react';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <MUIContainer
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                gap: '15px',
                width: '375px',
                height: '812px',
                paddingX: '20px',
                paddingY: '35px',
                marginX: 5,
                border: '1px solid blue',
            }}
            className={className}
        >
            {children}
        </MUIContainer>
    );
};

export default Container;
