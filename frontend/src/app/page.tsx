"use client";

import React, {useCallback, useEffect, useState} from 'react';
import DashboardTemplate from "@/components/templates/DashboardTemplate";
import {FundsTable} from "@/components/organisms/FundsTable";
import {Modal} from "@/components/organisms/Modal";
import {SubscriptionFields, SubscriptionForm} from "@/components/organisms/SubscriptionForm";
import {URL_FUND_URL, URL_SUBSCRIBE} from "@/util/urls";

export default function Home() {

    const [funds, setFunds] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [fundName, setFundName] = useState("");

    const getData = useCallback(async () => {
        const response = await fetch(URL_FUND_URL);
        const result = await response.json();
        setFunds(result);
    }, []);

    useEffect(() => {
        if (funds.length === 0) {
            getData();
        }
    }, [funds.length, getData]);

    const handleSubscribe = (name: string) => {
        setOpenModal(true);
        setFundName(name);
    }

    const handleSubscription = async (values: SubscriptionFields)=> {
        try {
            const response = await fetch(URL_SUBSCRIBE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.detail);
                alert(errorData.detail);
                return;
            }

            alert("Se envio una notificacion :)");
        } catch (e) {
            alert(e);
        } finally {
            setOpenModal(false);
        }
    }

    return (
        <>
            <DashboardTemplate>
                <FundsTable funds={funds} onSubscribe={handleSubscribe}/>
                <Modal onClose={() => setOpenModal(false)} isOpen={openModal}>
                    <SubscriptionForm onSubmit={handleSubscription} fundName={fundName}/>
                </Modal>
            </DashboardTemplate>
        </>
    );
}
