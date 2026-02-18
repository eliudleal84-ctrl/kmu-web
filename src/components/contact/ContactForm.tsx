"use client";

import { useState, useEffect, Suspense } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ContactFormContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        if (type === "cotizacion") {
            setFormData(prev => ({ ...prev, subject: "empresa" }));
        } else if (type === "terapia" || type === "cita") {
            setFormData(prev => ({ ...prev, subject: "terapia" }));
        } else if (type === "curso") {
            setFormData(prev => ({ ...prev, subject: "curso" }));
        }
    }, [type]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Error al enviar el mensaje");
            }

            setStatus("success");
            setFormData({ name: "", lastname: "", email: "", subject: "", message: "" });
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div className="bg-card border border-green-200 dark:border-green-900 rounded-2xl p-8 shadow-sm h-fit text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">¡Mensaje Enviado!</h3>
                <p className="text-muted-foreground">
                    Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-primary font-bold hover:underline"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                        <input
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="lastname" className="text-sm font-medium">Apellido</label>
                        <input
                            id="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            placeholder="Tu apellido"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                    <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="terapia">Agendar Cita de Terapia</option>
                        <option value="empresa">Cotización Empresarial</option>
                        <option value="curso">Informes sobre Cursos</option>
                        <option value="otro">Otro motivo</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                    <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Escribe aquí tus dudas o comentarios..."
                    />
                </div>

                {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <button
                    disabled={isLoading}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Enviando..." : "Enviar Mensaje"}
                    {!isLoading && <Send className="h-4 w-4" />}
                </button>
            </form>
        </div>
    );
}

export default function ContactForm() {
    return (
        <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-2xl"></div>}>
            <ContactFormContent />
        </Suspense>
    );
}
