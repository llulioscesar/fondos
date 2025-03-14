"use client";

import React, {FC} from 'react';
import {Button} from "@/components/atoms/Button";

type Transaction = {
    id: string;
    fund: string;
    type: string;
    amount: number;
    date: string;
    email: string;
    cancel: string;
}

type Props = {
    transactions: Transaction[];
};

export const TransactionsTable: FC<Props> = ({ transactions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Fondo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tipo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Monto</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Fecha</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Correo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                    <tr key={tx.id}>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.fund}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.type}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.amount}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{tx.email}</td>
                        <td>{(!tx.cancel && tx.type === 'subscribe') && <Button>Cancelar</Button>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};