'use client'

import React, {useCallback, useEffect, useState} from 'react';
import DashboardTemplate from "@/components/templates/DashboardTemplate";
import {TransactionsTable} from "@/components/organisms/TransactionsTable";

export default function Home() {

    const [transactions, setTransactions] = useState([]);

    const getData = useCallback(async () => {
        const response = await fetch('http://localhost:8000/subscription');
        const result = await response.json();
        setTransactions(result);
    }, []);

    useEffect(() => {
        if (transactions.length === 0) {
            getData();
        }
    }, [transactions.length, getData]);

    return (
        <>
            <DashboardTemplate>
                <TransactionsTable transactions={transactions} />
            </DashboardTemplate>
        </>
    );
}