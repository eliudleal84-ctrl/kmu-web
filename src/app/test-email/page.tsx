"use client";

import { useState } from "react";

export default function TestEmailPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch("/api/test-email");
            const data = await res.json();
            setStatus(data);
        } catch (err: any) {
            setStatus({ success: false, message: "Error de red o cliente", error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
            <h1 className="text-2xl font-bold">Diagnóstico de Envío de Correos</h1>
            <p className="text-muted-foreground text-center max-w-md">
                Esta página probará si el servidor tiene acceso a la API Key de Resend y si puede enviar correos a <strong>georche777@gmail.com</strong>.
            </p>

            <button
                onClick={runTest}
                disabled={loading}
                className="px-6 py-3 bg-primary text-white rounded-lg font-bold disabled:opacity-50"
            >
                {loading ? "Probando..." : "Ejecutar Prueba de Envío"}
            </button>

            {status && (
                <div className={`mt-8 p-6 rounded-lg border w-full max-w-2xl overflow-auto text-sm font-mono ${status.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <h3 className="font-bold mb-2">{status.success ? "✅ ÉXITO" : "❌ FALLO"}</h3>
                    <pre>{JSON.stringify(status, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
