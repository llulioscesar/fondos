'use client';

import React, {FC, PropsWithChildren} from 'react';

type Props = PropsWithChildren<{
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
}>

export const Modal: FC<Props> = ({ isOpen, onClose, title, children, className = "" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className={`bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 ${className}`}>
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    {title && <h3 className="text-xl font-semibold">{title}</h3>}
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl leading-none">&times;</button>
                </div>
                <div className="px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
};