import { Link as MUILink } from '@mui/material';
import React from 'react';

type LinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
    return (
        <MUILink href={href} underline='hover' className={`text-primary-1 ${className}`}>
            {children}
        </MUILink>
    );
};

export default Link;
