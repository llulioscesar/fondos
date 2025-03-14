"use client";

import {FormField} from "@/components/molecules/FormField";
import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Button} from "@/components/atoms/Button";

type Fields = {
    fund: string;
    amount: number;
    email: string;
}

type Props = {
    onSubmit: (values: Fields) => void;
    fundName: string;
};

export const SubscriptionForm: FC<Props> = ({ onSubmit, fundName }) => {
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ fund: fundName, amount, email });
        setAmount(0);
        setEmail('');
    };

    const handleOnChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        setAmount(+numericValue);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Subscribe to {fundName}</h2>
            <FormField
                label="Amount (COP)"
                type="number"
                value={amount <= 0 ? '' : `${amount}`}
                onChange={handleOnChangeAmount}
                placeholder="Enter amount"
            />
            <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <Button type="submit" className="mt-4">
                Submit Subscription
            </Button>
        </form>
    );
};