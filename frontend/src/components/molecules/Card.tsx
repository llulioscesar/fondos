"use client";

import React, {FC, PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
    title?: string;
    className?: string;
}>;

export const Card: FC<Props> = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-white shadow rounded p-4 ${className}`}>
            {title && (
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            )}
            <div>{children}</div>
        </div>
    );
};