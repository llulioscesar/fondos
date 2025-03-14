"use client";

import {Input} from "@/components/atoms/Input";
import React, {FC} from 'react';

type Props = {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'search';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
}

export const FormField: FC<Props> = ({
                                  label,
                                  type = 'text',
                                  value,
                                  onChange,
                                  placeholder,
                                  className = '',
                                  labelClassName = '',
                                  ...props
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className={`block text-gray-700 mb-1 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <Input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};