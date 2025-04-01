'use client'

import React, {useCallback, useEffect, useState} from 'react';
import DashboardTemplate from "@/components/templates/DashboardTemplate";
import {TransactionsTable} from "@/components/organisms/TransactionsTable";
import {Modal} from "@/components/organisms/Modal";
import {Button} from "@/components/atoms/Button";
import {URL_SUBSCRIPTIONS, URL_UNSUBSCRIBE} from "@/util/urls";

export default function Home() {

    const [transactions, setTransactions] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idCancel, setIdCancel] = useState('');

    const getData = useCallback(async () => {
        const response = await fetch(URL_SUBSCRIPTIONS);
        const result = await response.json();
        setTransactions(result);
    }, []);

    useEffect(() => {
        if (transactions.length === 0) {
            getData();
        }
    }, [transactions.length, getData]);

    const handleOnCancel = (id: string) => {
        setOpenModal(true);
        setIdCancel(id);
    }

    const handleNoCancel = () => {
        setOpenModal(false);
        setIdCancel('');
    }

    const handleCancel = async () => {
        try {
            const response = await fetch(URL_UNSUBSCRIBE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({transaction_id: idCancel}),
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
            setTransactions([]);
        }
    }

    return (
        <>
            <DashboardTemplate>
                <TransactionsTable transactions={transactions} onCancel={handleOnCancel} />
                <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Cancelar subscripción">
                    <p>¿Estás seguro de que deseas cancelar esta subscripción?</p>
                    <Button onClick={handleCancel}>Si</Button>
                    <Button onClick={handleNoCancel} className="bg-red-500 ml-2">No</Button>
                </Modal>
            </DashboardTemplate>
        </>
    );
}