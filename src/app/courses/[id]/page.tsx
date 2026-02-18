import prisma from "@/lib/prisma";
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CourseDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    const { id } = await params;

    const [course, settings] = await Promise.all([
        prisma.course.findUnique({ where: { id } }),
        prisma.siteSettings.findUnique({ where: { id: 1 } })
    ]);

    if (!course) {
        notFound();
    }

    const formattedDate = new Date(course.date).toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = new Date(course.date).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const whatsappNumber = settings?.whatsapp || "5218123456789";
    const waLink = `https://wa.me/${whatsappNumber}?text=Hola,%20estoy%20interesado%20en%20el%20curso:%20${course.title}.%20¿Me%20podrían%20dar%20más%20información?`;

    return (
        <div className="flex flex-col items-center">
            {/* 1. Header/Hero del Curso */}
            <section className="w-full py-20 bg-muted/30 border-b border-border">
                <div className="container px-4 md:px-6 mx-auto">
                    <Link href="/courses" className="inline-flex items-center text-sm font-medium text-primary mb-8 hover:underline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Calendario
                    </Link>

                    <div className="max-w-4xl space-y-4">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-bold uppercase tracking-wider">
                            Curso / Taller
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                            {course.title}
                        </h1>
                        <p className="text-xl text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" /> {formattedDate}
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Contenido e Información */}
            <section className="w-full py-16 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Columna Principal - Descripción */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-2xl font-bold border-b pb-4">Acerca de este evento</h2>
                                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            <div className="bg-secondary/10 rounded-3xl p-8 border border-border">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" /> Lo que aprenderás
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        "Herramientas prácticas de aplicación inmediata",
                                        "Enfoque Gestalt centrado en la persona",
                                        "Espacio de formación segura y confidencial",
                                        "Acompañamiento profesional y grupal"
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-3 text-sm font-medium">
                                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Columna Lateral - Tarjeta de registro */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-3xl border bg-card p-8 shadow-xl space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <DollarSign className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Inversión</p>
                                            <p className="text-2xl font-bold text-foreground">{course.price ? `$${course.price} MXN` : "Gratuito"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Horario</p>
                                            <p className="text-lg font-semibold text-foreground">{formattedTime} hrs</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Ubicación</p>
                                            <p className="text-lg font-semibold text-foreground">{course.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <Link
                                        href={waLink}
                                        target="_blank"
                                        className="w-full inline-flex h-14 items-center justify-center rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg gap-3"
                                    >
                                        <MessageCircle className="h-6 w-6" /> Apartar mi Lugar
                                    </Link>
                                    <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
                                        * El pago se coordina vía atención personal
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
