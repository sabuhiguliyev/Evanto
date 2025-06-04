import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { Box, Divider, Typography, Button } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { FacebookOutlined } from '@mui/icons-material';
import Container from '../../components/layout/Container';
import Input from '../../components/forms/Input';
import Link from '../../components/navigation/Link';

function SignUp() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const { error } = await supabase.from('users').insert([
            {
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password,
            },
        ]);

        if (error) {
            console.error('Signup error:', error);
        } else {
            navigate('/congratulation');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Container>
            <Box component='form' onSubmit={handleSubmit} className={'flex flex-col gap-4 text-start'}>
                <Typography variant='h1' className={'w-[193px]'}>
                    Create your account
                </Typography>
                <Typography variant={'body2'}>
                    Evanto virtual event organizing application that is described as a news mobile app.
                </Typography>
                <Input label='Full Name' name='fullName' value={formData.fullName} onChange={handleChange} />
                <Input label='Email' name='email' type='email' value={formData.email} onChange={handleChange} />
                <Input
                    label='Password'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <Input
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={'Confirm password'}
                />
                <Link href='/forgot-password' className={'text-text-gray3 mb-4 underline'}>
                    Forgot Password?
                </Link>
                <Box className={'flex w-full flex-col items-center gap-4'}>
                    <Button type='submit' variant={'contained'}>
                        Sign Up
                    </Button>
                    <Divider className='text-text-gray3 before:bg-[#E8E8E8] after:bg-[#E8E8E8]'>
                        Or continue with
                    </Divider>{' '}
                    <Box className='flex w-72 justify-center gap-4'>
                        <Button variant='outlined' className={'h-9'}>
                            <AppleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <GoogleIcon className={'text-primary-1'} />
                        </Button>
                        <Button variant='outlined' className={'h-9'}>
                            <FacebookOutlined className={'text-primary-1'} />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
