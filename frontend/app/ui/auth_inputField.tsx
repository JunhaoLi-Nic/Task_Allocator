// Author Name: Jiancong Huang
// Created Date: 16/08/2024
// Updated Date: 16/08/2024
"use client";

import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps>  = ({ label, type, placeholder }) => {
    return (
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
                {label}
            </label>
            <input
                type = {type}
                placeholder = {placeholder}
                className = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
            />
        </div>
    )
}

export default InputField