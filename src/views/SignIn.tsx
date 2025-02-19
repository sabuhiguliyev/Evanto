import React from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const SignIn = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Sign In</h1>
            <InputField placeholder="Email" type="email" />
            <InputField placeholder="Password" type="password" />
            <Button label="Sign In" onClick={() => console.log('Sign In')} />
        </div>
    );
};

export default SignIn;
