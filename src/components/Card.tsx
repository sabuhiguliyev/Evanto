import React from "react";

type CardProps = {
    title: string,
    description: string,
    image?: string,
}

const Card: React.FC<CardProps> = ({ title, description,image}) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg" />}
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-500">{description}</p>
        </div>
    );
};
export default Card;