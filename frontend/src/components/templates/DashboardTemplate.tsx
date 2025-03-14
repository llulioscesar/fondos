"use client";

import React, {FC, PropsWithChildren} from 'react';
import Head from 'next/head';
import Link from "next/link";

type Props = PropsWithChildren<{
    title?: string;
}>;

const DashboardTemplate: FC<Props> = ({ children, title = 'Dashboard' }) => {
    return (
        <>
            <Head>
                <title>{title} | BTG Investment</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-blue-600 p-4">
                    <h1 className="text-white text-3xl font-bold text-center">
                        Panel de inversión de BTG
                    </h1>
                </header>

                {/* Navegación con pestañas */}
                <nav className="bg-gray-100 border-b border-gray-300">
                    <div className="container mx-auto px-4 py-2 flex space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
                        >
                            Fondos disponibles
                        </Link>
                        <Link
                            href="/transactions"
                            className="text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
                        >
                            Historial de transacciones
                        </Link>
                    </div>
                </nav>

                {/* Contenido principal */}
                <main className="container mx-auto p-4 flex-grow">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-200 p-4 text-center">
                    <p className="text-gray-600">BTG Investment Dashboard - {new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
};

export default DashboardTemplate;
