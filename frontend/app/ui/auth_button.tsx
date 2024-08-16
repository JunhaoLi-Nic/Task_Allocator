// Author Name: Jiancong Huang
// Created Date: 16/08/2024
// Updated Date: 16/08/2024
"use client";

import React from 'react';

interface ButtonProps {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
        <button
            type='submit'
            className="bg-black text-white py-2 px-6 rounded-full focus:outline-none transition-transform duration-200 hover:scale-105 flex items-center justify-center"
        >
            {text}
        </button>
    )
};

export default Button;