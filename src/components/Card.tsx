import React from 'react';

type CardProps = {
    title: string;
    description: string;
    image?: string;
};

const Card: React.FC<CardProps> = ({ title, description, image }) => {
    return (
        <div className='rounded-lg border p-4 shadow-md'>
            {image && <img src={image} alt={title} className='h-40 w-full rounded-t-lg object-cover' />}
            <h2 className='text-lg font-bold'>{title}</h2>
            <p className='text-gray-500'>{description}</p>
        </div>
    );
};
export default Card;
