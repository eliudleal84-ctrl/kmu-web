import Link from "next/link";
import { CheckCircle2, ArrowRight, Building2, UserCheck, HeartHandshake, FileText, Brain, Shield } from "lucide-react";
import BusinessAccordion from "@/components/services/BusinessAccordion";

export default function CorporateServicesPage() {
    return (
        <div className="flex flex-col items-center">
            {/* 1. Hero Section - Empresas */}
            <section className="w-full py-20 bg-muted/30">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                        Consultoría Empresarial
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                        Bienestar Organizacional y <br className="hidden sm:inline" /> Liderazgo Humano
                    </h1>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                        Cumple con la NOM-035 y fortalece el desempeño de tu organización mediante programas de bienestar emocional, liderazgo humano y desarrollo organizacional, integrando herramientas prácticas respaldadas por experiencia industrial y enfoque humanista.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/contact?type=cotizacion"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                            Solicitar Cotización
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Soluciones Principales (Grid Detallado) */}
            <section className="w-full py-20 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2">

                        {/* NOM-035 & Diagnóstico */}
                        <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Entornos Laborales Saludables y NOM-035</h3>
                                <p className="text-muted-foreground">
                                    Implementación integral con diagnóstico, análisis y acompañamiento estratégico para transformar factores de riesgo psicosocial en oportunidades de mejora organizacional.
                                </p>
                            </div>
                        </div>

                        {/* Clima y Cultura */}
                        <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0">
                                <HeartHandshake className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Cultura y Dinámica Organizacional</h3>
                                <p className="text-muted-foreground">
                                    Intervención en comunicación, conflicto y relaciones internas para fortalecer equipos funcionales y productivos.
                                </p>
                            </div>
                        </div>

                        {/* Liderazgo Gestáltico */}
                        <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center shrink-0">
                                <UserCheck className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Liderazgo Consciente</h3>
                                <p className="text-muted-foreground">
                                    Desarrollo de líderes con presencia, regulación emocional y capacidad de gestión responsable.
                                </p>
                            </div>
                        </div>

                        {/* Bienestar Emocional */}
                        <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center shrink-0">
                                <Brain className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Regulación Emocional y Prevención del Burnout</h3>
                                <p className="text-muted-foreground">
                                    Programas prácticos para el manejo del estrés, ansiedad y desgaste profesional en entornos de alta exigencia.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Sectores */}
            <section className="w-full py-20 bg-secondary/10">
                <div className="container px-4 md:px-6 mx-auto flex justify-center">
                    <div className="p-8 bg-background rounded-xl border border-border space-y-4 shadow-sm max-w-2xl w-full text-center">
                        <h3 className="text-2xl font-bold">Sectores Atendidos</h3>
                        <p className="text-muted-foreground">Tenemos experiencia adaptando nuestra metodología a diversas industrias:</p>
                        <div className="flex flex-wrap gap-3 justify-center pt-2">
                            <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Industrial</span>
                            <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Corporativo</span>
                            <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Educativo</span>
                            <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Servicios</span>
                            <span className="px-4 py-2 bg-muted rounded-full text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Tecnología</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Catálogo Detallado de Especialidades (Acordeón) */}
            <section className="w-full py-24 bg-card overflow-hidden relative border-t border-border">
                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-primary uppercase tracking-widest">Catálogo de Especialidades</h2>
                        <p className="text-muted-foreground text-lg">
                            Profundiza en nuestros programas de capacitación diseñados para la realidad técnica y humana de tu empresa.
                        </p>
                    </div>

                    <BusinessAccordion />
                </div>
            </section>

            {/* 5. Modalidades y Proceso */}
            <section className="w-full py-20 bg-background text-center">
                <div className="container px-4 md:px-6 mx-auto space-y-12">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="p-6 border border-border rounded-xl">
                            <h4 className="font-bold text-lg mb-2">Modalidad Presencial</h4>
                            <p className="text-muted-foreground text-sm">Intervenciones directas en tus instalaciones (In-Company) o en nuestras salas de capacitación.</p>
                        </div>
                        <div className="p-6 border border-border rounded-xl">
                            <h4 className="font-bold text-lg mb-2">Modalidad Online</h4>
                            <p className="text-muted-foreground text-sm">Sesiones virtuales interactivas y webinars para equipos remotos o distribuidos.</p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto bg-muted/30 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-6">Nuestro Proceso de Trabajo</h3>
                        <div className="flex flex-col md:flex-row justify-between gap-4 text-left md:text-center relative">
                            {/* Step 1 */}
                            <div className="flex-1 space-y-2 z-10">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-0 md:mx-auto">1</div>
                                <h5 className="font-bold">Diagnóstico</h5>
                                <p className="text-xs text-muted-foreground">Entendemos tus necesidades y aplicamos baterías de evaluación.</p>
                            </div>
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-border -z-0" />

                            {/* Step 2 */}
                            <div className="flex-1 space-y-2 z-10">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-0 md:mx-auto">2</div>
                                <h5 className="font-bold">Propuesta</h5>
                                <p className="text-xs text-muted-foreground">Diseñamos un plan de intervención a la medida.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex-1 space-y-2 z-10">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-0 md:mx-auto">3</div>
                                <h5 className="font-bold">Intervención</h5>
                                <p className="text-xs text-muted-foreground">Ejecutamos talleres, consultoría o asesoría.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="flex-1 space-y-2 z-10">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-0 md:mx-auto">4</div>
                                <h5 className="font-bold">Seguimiento</h5>
                                <p className="text-xs text-muted-foreground">Evaluamos resultados y ajustes finales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="w-full py-16 bg-primary text-primary-foreground text-center">
                <div className="container px-4 md:px-6 mx-auto space-y-6">
                    <h2 className="text-3xl font-bold">¿Listo para potenciar tu organización?</h2>
                    <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                        Agenda una reunión de exploración sin costo y descubre cómo podemos ayudarte a cumplir tus objetivos.
                    </p>
                    <Link
                        href="/contact?type=cotizacion"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white text-primary px-8 text-sm font-bold shadow hover:bg-white/90 transition-colors"
                    >
                        Solicitar Cotización
                    </Link>
                </div>
            </section>
        </div>
    );
}
