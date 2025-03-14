"use client";

import React, {FC} from 'react';
import {Button} from "@/components/atoms/Button";

type Fund = {
    name: string;
    category: string;
    min_amount: number;
}

type Props = {
    funds: Fund[];
    onSubscribe: (name: string) => void;
}

export const FundsTable: FC<Props> = ({ funds, onSubscribe }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
                <thead>
                <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Nombre</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Monto minimo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Categoria</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {funds.map((fund) => (
                    <tr key={fund.name}>
                        <td className="py-3 px-4 text-sm text-gray-900">{fund.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{fund.min_amount}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{fund.category}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                            <Button onClick={() => onSubscribe(fund.name)}>
                                Suscribirse
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};