"use client";

import { useState } from "react";
import { X, ExternalLink, GraduationCap, Award, FileCheck, CheckCircle2 } from "lucide-react";

export function CredentialsModal() {
    const [isOpen, setIsOpen] = useState(false);

    const credentials = [
        {
            title: "Maestría en Terapia Gestalt",
            institution: "Instituto de Terapia Gestalt Región Occidente",
            description: "Aprobado por unanimidad. Reconocimiento de Validez Oficial (RVOE) de la SEP.",
            icon: GraduationCap
        },
        {
            title: "Diplomado en Adicciones",
            institution: "IMEP / PLADE",
            description: "Especialización clínica con enfoque en salud mental y prevención.",
            icon: CheckCircle2
        },
        {
            title: "Formación de Instructores",
            institution: "ICET - Sistema Educativo Nacional",
            description: "Certificación oficial por la Secretaría de Educación Pública.",
            icon: Award
        },
        {
            title: "Reconocimiento a la Innovación",
            institution: "Whirlpool - Campus Celaya",
            description: "Por la exitosa implementación de proyectos internacionales de desarrollo.",
            icon: FileCheck
        }
    ];

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 text-xs font-bold text-primary hover:text-secondary flex items-center gap-2 transition-colors uppercase tracking-[0.2em] border-b border-primary/20 pb-1"
            >
                Ver avales académicos <ExternalLink className="h-3 w-3" />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-card w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Acreditaciones y Formación</h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">KMJ Consultoría • Respaldo Profesional</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <p className="text-sm text-muted-foreground italic mb-6">
                        "En KMJ, la práctica profesional se sustenta en una formación continua, ética y avalada por instituciones de prestigio nacional e internacional."
                    </p>

                    <div className="grid gap-4">
                        {credentials.map((cred, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors group">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <cred.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{cred.title}</h4>
                                    <p className="text-xs font-bold text-primary uppercase tracking-tight mt-0.5">{cred.institution}</p>
                                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{cred.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5">
                        <p className="text-[10px] text-primary/70 uppercase tracking-widest text-center font-bold">
                            Cédulas y documentos originales disponibles bajo solicitud en procesos formales de consultoría.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
