import { Building2, GraduationCap, Heart, Users, Target, Lightbulb, ShieldCheck } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AboutPage() {
    // Obtener contenido dinámico del dashboard
    const pageContent = await prisma.pageContent.findUnique({
        where: { id: "main" }
    });

    const aboutTitle = pageContent?.aboutTitle || "Nuestra Misión";
    const aboutText = pageContent?.aboutText || "En KMJ Consultoría, creemos en el potencial ilimitado del ser humano...";

    return (
        <div className="flex flex-col items-center">
            {/* 1. Perfil del Fundador (Experiencia Industrial + Formación) */}
            <section className="w-full py-24 bg-background">
                <div className="container px-4 md:px-6 mx-auto space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium uppercase tracking-widest mb-2">
                            Liderazgo y Humanismo
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground uppercase tracking-widest">El Fundador</h2>
                        <p className="text-muted-foreground text-lg">
                            Un perfil híbrido que une la alta ingeniería y la psicología humana para ofrecer soluciones con impacto real.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Trayectoria Industrial */}
                        <div className="p-8 rounded-3xl border border-border bg-card hover:shadow-2xl transition-all border-b-4 border-b-blue-600">
                            <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <Building2 className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">Trayectoria Industrial y Corporativa</h3>
                            <p className="text-muted-foreground mb-6">
                                Trayectoria sólida en el sector corporativo e industrial, entendiendo de primera mano los retos de:
                            </p>
                            <ul className="grid gap-4">
                                {[
                                    "Más de 25 años en industria global (Whirlpool – Vitro – Nissan)",
                                    "Experiencia integral en ciclo completo de producto (C2C)",
                                    "Liderazgo técnico y gestión de equipos multidisciplinarios",
                                    "Innovación con impacto real (Patente registrada)",
                                    "Resultados medibles en calidad y reducción de costos",
                                    "Certificaciones técnicas y excelencia operativa",
                                    "Experiencia real en cultura organizacional industrial"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                                        <span className="text-foreground/80 font-medium leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Formación Terapéutica */}
                        <div className="p-8 rounded-3xl border border-border bg-card hover:shadow-2xl transition-all border-b-4 border-b-amber-500">
                            <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <GraduationCap className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">Formación Terapéutica</h3>
                            <p className="text-muted-foreground mb-6">
                                Experiencia vivida, formación sólida y compromiso ético.
                            </p>
                            <ul className="grid gap-4">
                                {[
                                    "Recuperación Consciente y Sostenida",
                                    "Resiliencia ante Crisis Vitales",
                                    "Liderazgo y Servicio en Procesos de Recuperación",
                                    "Formación Gestáltica Vivencial",
                                    "Integración del Duelo y Reconciliación Familiar",
                                    "Desarrollo del Yo Observador",
                                    "Vocación Consolidada y Especialización en Adicciones"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="h-2 w-2 rounded-full bg-amber-600 mt-2 shrink-0 shadow-[0_0_8px_rgba(217,119,6,0.5)]" />
                                        <span className="text-foreground/80 font-medium leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. Filosofía Gestáltica & Visión */}
            <section className="w-full py-20 bg-primary text-primary-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-white/10 rounded-lg"><Lightbulb className="h-8 w-8 text-secondary" /></span>
                            Filosofía Gestáltica
                        </h2>
                        <div className="text-lg text-white/80 leading-relaxed font-light space-y-4">
                            <p>Trabajo desde el enfoque gestáltico, centrado en el <span className="text-secondary font-bold">aquí y el ahora</span>.</p>
                            <p>Acompaño a las personas a desarrollar <span className="text-secondary font-bold">conciencia</span> sobre lo que sienten, piensan y hacen, fortaleciendo su <span className="text-secondary font-bold">responsabilidad</span> y capacidad de elección.</p>
                            <p>Creo que cuando el darse cuenta se amplía, el cambio ocurre de manera <span className="text-secondary font-bold">auténtica y sostenible</span>.</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-white/10 rounded-lg"><Target className="h-8 w-8 text-secondary" /></span>
                            Visión Empresa - Persona
                        </h2>
                        <div className="text-lg text-white/80 leading-relaxed font-light space-y-4">
                            <p>Concibo a la organización como un <span className="text-secondary font-bold">organismo vivo</span>, donde el bienestar emocional de las personas impacta directamente en los resultados.</p>
                            <p>Una empresa sana se construye con individuos <span className="text-secondary font-bold">conscientes, responsables y emocionalmente integrados</span>.</p>
                            <p>Cuando se cuida al ser humano, la productividad, el liderazgo y la cultura organizacional <span className="text-secondary font-bold">florecen de forma natural</span>.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Valores */}
            <section className="w-full py-24 bg-background text-center">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-16 uppercase tracking-widest text-primary">Nuestros Valores</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Heart, title: "Empatía", desc: "Conexión genuina con la realidad del otro." },
                            { icon: ShieldCheck, title: "Sinceridad", desc: "Transparencia y ética en cada intervención." },
                            { icon: Users, title: "Respeto", desc: "Aceptación incondicional de la persona." },
                            { icon: Lightbulb, title: "Responsabilidad", desc: "Promover el despertar y el compromiso personal." }
                        ].map((val, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 group">
                                <div className="h-20 w-20 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:-rotate-6 shadow-md">
                                    <val.icon className="h-10 w-10" />
                                </div>
                                <h3 className="font-bold text-xl">{val.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Estructura y Equipo */}
            <section className="w-full py-20 bg-muted/30 border-t border-border">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight uppercase tracking-widest text-primary">Nuestro Equipo</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg italic">
                        "KMJ Consultoría está en constante crecimiento, integrando especialistas según la necesidad de cada proyecto."
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-card p-10 rounded-3xl border border-border shadow-sm flex flex-col items-center">
                            <div className="h-28 w-28 bg-primary/10 rounded-full mb-6 flex items-center justify-center text-primary border-4 border-primary/5">
                                <Users className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Estructura Orgánica</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">En expansión</p>
                        </div>
                        <div className="bg-card p-10 rounded-3xl border-2 border-primary/20 shadow-xl flex flex-col items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase -rotate-45 translate-x-4 translate-y-2 w-24 text-center">Líder</div>
                            <div className="h-28 w-28 bg-primary/10 rounded-full mb-6 flex items-center justify-center text-primary border-4 border-primary/20">
                                <GraduationCap className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Fundador Principal</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Ingeniería & Gestalt</p>
                        </div>
                        <div className="bg-card p-10 rounded-3xl border border-border shadow-sm flex flex-col items-center">
                            <div className="h-28 w-28 bg-primary/10 rounded-full mb-6 flex items-center justify-center text-primary border-4 border-primary/5">
                                <ShieldCheck className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl mb-1">Red de Consultores</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Aliados Estratégicos</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
