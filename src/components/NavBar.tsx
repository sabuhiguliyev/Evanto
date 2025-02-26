import { NavLink } from 'react-router-dom';
import React from 'react';

type NavBarProps = {
    links: { name: string; path: string }[];
};

const NavBar: React.FC<NavBarProps> = ({ links }) => {
    return (
        <nav className='bg-blue-500 py-4 text-white'>
            <ul className='flex justify-around'>
                {links.map(link => (
                    <li key={link.name}>
                        <NavLink to={link.path} className='hover:text-gray-300'>
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
