"use client";

import React, {useCallback, useEffect, useState} from 'react';
import DashboardTemplate from "@/components/templates/DashboardTemplate";
import {FundsTable} from "@/components/organisms/FundsTable";

export default function Home() {

    const [funds, setFunds] = useState([]);

    const getData = useCallback(async () => {
        const response = await fetch('http://localhost:8000/funds');
        const result = await response.json();
        setFunds(result);
    }, []);

    useEffect(() => {
        if (funds.length === 0) {
            getData();
        }
    }, [funds.length, getData]);

    return (
        <>
            <DashboardTemplate>
                <FundsTable funds={funds} onSubscribe={name => {console.log(name)}}/>
            </DashboardTemplate>
        </>
    );
}
