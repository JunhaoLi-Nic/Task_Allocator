// Author Name: Jiancong Huang
// Created Date: 16/08/2024
// Updated Date: 16/08/2024
"use client";

import React from 'react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const Button: React.FC<ButtonProps> = ({ text, disabled, type="button"}) => {
    return (
        <button
            type= {type}
            className="bg-black text-white py-2 px-6 rounded-full focus:outline-none transition-transform duration-200 hover:scale-105 flex items-center justify-center"
        >
            {text}
        </button>
    )
};

export default Button;