import React from 'react';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type = 'text', placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
    );
};

export default InputField;
