"use client";

import React, { useState } from "react";
import { ChevronDown, Brain, Users, Settings, AlertCircle, CheckCircle2 } from "lucide-react";

const solutions = [
    {
        id: 1,
        title: "Desarrollo Humano y Regulación Emocional",
        subtitle: "Regula tu Cerebro, Transforma tu Conducta",
        icon: Brain,
        color: "blue",
        items: [
            "Neurociencia aplicada a la autorregulación emocional",
            "Inteligencia Emocional Aplicada al Entorno Laboral",
            "Comunicación Asertiva y Gestión de Conflictos",
            "Manejo del Estrés y Prevención del Burnout",
            "Autoconciencia y Responsabilidad Personal en el Trabajo",
            "Liderazgo Emocional para Mandos Medios",
            "Masculinidad Consciente y Gestión Emocional"
        ]
    },
    {
        id: 2,
        title: "Liderazgo y Cultura Organizacional (Enfoque Gestalt + Industria)",
        icon: Users,
        color: "green",
        items: [
            "Liderazgo con Enfoque Gestalt",
            "Liderazgo Consciente en Entornos Industriales",
            "Del Control a la Influencia: Liderazgo Responsable",
            "Construcción de Equipos de Alto Desempeño",
            "Cultura Organizacional y Salud Emocional",
            "Empresa Sana, Persona Sana (alineado con tu visión)"
        ]
    },
    {
        id: 3,
        title: "Productividad, Estrategia y Gestión Industrial",
        icon: Settings,
        color: "amber",
        items: [
            "Organización y Gestión Estratégica del Tiempo",
            "Optimización de Líneas de Producción",
            "Mapa de Sistemas y Pensamiento Sistémico",
            "Value Chain y Ventaja Competitiva",
            "DFA y Diseño para Manufactura",
            "Canales de Distribución y Clusters de Mercado",
            "Planes de Lanzamiento de Producto",
            "Estrategia Good–Better–Best",
            "Capacitación Técnica de Producto para Fuerzas de Venta",
            "Innovación y Desarrollo de Nuevos Productos"
        ]
    },
    {
        id: 4,
        title: "Especialización en Adicciones y Conductas Compulsivas",
        icon: AlertCircle,
        color: "red",
        items: [
            "Prevención de Adicciones en Entornos Laborales",
            "Comprensión Neuroconductual del Alcoholismo",
            "Codependencia y Dinámicas Relacionales",
            "Programa de Conciencia y Sobriedad para Empresas",
            "Adicción y Liderazgo: Cuando el Alto Rendimiento Esconde Crisis",
            "Reconstrucción Personal Después de la Crisis"
        ]
    }
];

export default function BusinessAccordion() {
    const [openId, setOpenId] = useState<number | null>(1);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {solutions.map((category) => {
                const Icon = category.icon;
                const isOpen = openId === category.id;

                return (
                    <div
                        key={category.id}
                        className={`group border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isOpen ? "border-primary bg-card" : "border-border bg-background"
                            }`}
                    >
                        <button
                            onClick={() => setOpenId(isOpen ? null : category.id)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <div className="flex items-center gap-5">
                                <div className={`p-3 rounded-2xl transition-colors ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                    }`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                                        {category.title}
                                    </h3>
                                    {category.subtitle && isOpen && (
                                        <p className="text-sm font-medium text-primary/80 mt-1 animate-in fade-in slide-in-from-left-2">
                                            {category.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                        </button>

                        <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 pb-8 px-8" : "max-h-0 opacity-0 pointer-events-none"
                            }`}>
                            <div className="pt-4 border-t border-border/50">
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {category.items.map((item, idx) => (
                                        <li key={idx} className="flex item-start gap-3 group/item">
                                            <CheckCircle2 className="h-5 w-5 text-primary/40 group-hover/item:text-primary transition-colors shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground text-[15px] leading-snug group-hover/item:text-foreground transition-colors">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
