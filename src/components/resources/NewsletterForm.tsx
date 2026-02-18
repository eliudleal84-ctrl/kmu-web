"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("¡Gracias por unirte a nuestra comunidad!");
                setEmail("");
            } else {
                const data = await response.json();
                setStatus("error");
                setMessage(data.message || "Algo salió mal. Intenta de nuevo.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Error de conexión. Intenta más tarde.");
        }
    }

    if (status === "success") {
        return (
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
                <p className="font-bold text-lg">{message}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-sm underline hover:text-secondary-foreground"
                >
                    Suscribir otro correo
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="flex-1 h-12 px-5 rounded-full border-none focus:ring-2 focus:ring-secondary text-foreground bg-white"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 px-8 rounded-full bg-secondary text-secondary-foreground font-bold hover:bg-white hover:text-primary transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                >
                    {status === "loading" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        "Suscribirme"
                    )}
                </button>
            </div>
            {status === "error" && (
                <div className="flex items-center justify-center gap-2 text-red-200 text-sm font-medium">
                    <AlertCircle className="h-4 w-4" />
                    <span>{message}</span>
                </div>
            )}
        </form>
    );
}
