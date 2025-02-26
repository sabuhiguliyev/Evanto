import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-96 rounded-lg bg-white p-6 shadow-lg'>
                <button onClick={onClose} className='absolute right-2 top-2 text-gray-500'>
                    x
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
