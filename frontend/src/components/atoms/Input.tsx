"use client";

import React, {FC, InputHTMLAttributes} from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    className = '',
    ...props
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
}