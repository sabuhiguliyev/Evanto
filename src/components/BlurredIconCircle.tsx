import React from 'react';

const BlurredIconCircle = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative h-11 w-11'>
            <div
                className='absolute inset-0 rounded-full bg-white/25'
                style={{
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                }}
            />
            <div className='relative z-10 flex h-full w-full items-center justify-center'>{children}</div>
        </div>
    );
};

export default BlurredIconCircle;
