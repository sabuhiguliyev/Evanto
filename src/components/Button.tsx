import React from 'react'

type ButtonProps = {
    label: string,
    onClick?: () => void,
    variant?: 'primary' | 'secondary',
}

const Button: React.FC<ButtonProps> = ({ label, onClick,variant = 'primary' }) => {
    const baseStyle = 'px-4 py-2 rounded'
    const variantStyle = variant === 'primary' ? 'bg-blue-500 text-white':'bg-gray-300 text-black'
    return (
        <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>{label}</button>
    )
}

export default Button