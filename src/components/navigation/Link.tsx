import React from 'react';
import { Link as MUILink } from '@mui/material';

type LinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
    return (
        <MUILink href={href} underline='none' className={`text-primary-1 ${className}`}>
            {children}
        </MUILink>
    );
};

export default Link;
