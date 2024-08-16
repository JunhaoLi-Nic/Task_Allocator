// Author Name: Jiancong Huang
// Created Date: 16/08/2024
// Updated Date: 16/08/2024
"use client";

import React from 'react';
import Link from 'next/link';
import InputField from '../ui/auth_inputField';
import Button from '../ui/auth_button';

export default function Login() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Task-Allocation</h1>
                <form>
                    <InputField label='Email' type='email' placeholder='Email'/>
                    <InputField label='Password' type='password' placeholder='Password'/>
                    <div className='mt-6 flex items-center justify-center w-full'>
                        <Button text='Login'/>
                    </div>
                </form>
                <p className='mt-4 text-center'>
                    No account?{' '}
                    <Link legacyBehavior href="/register">
                        <a className='text-blue-500'>Create one</a>
                    </Link>
                </p>
            </div>
        </div>
    );
}