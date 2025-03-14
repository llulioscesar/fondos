"use client";

import React, {FC, ButtonHTMLAttributes} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({
                    children,
                    onClick,
                    className,
                    type = 'button',
                    disabled = false,
                    ...props
                }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded focus:outline-none transition-colors duration-200 ${
                disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
