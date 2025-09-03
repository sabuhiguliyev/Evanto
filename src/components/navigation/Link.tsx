import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
    return (
        <RouterLink to={href} className={`text-primary ${className}`}>
            {children}
        </RouterLink>
    );
};

export default Link;
