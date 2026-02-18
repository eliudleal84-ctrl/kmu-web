import prisma from "@/lib/prisma";
import { Calendar, MapPin, Clock, DollarSign, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage() {
    // 1. Fetch data
    const [courses, settings] = await Promise.all([
        prisma.course.findMany({
            where: { published: true },
            orderBy: { date: 'asc' }
        }),
        prisma.siteSettings.findUnique({ where: { id: 1 } })
    ]);

    const whatsappNumber = settings?.whatsapp || "5218123456789";

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-20 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Calendario de Eventos</h1>
                    <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                        Encuentra el taller o curso ideal para tu crecimiento personal y profesional.
                    </p>
                </div>
            </section>

            {/* Listado de Cursos */}
            <section className="w-full py-20 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    {courses.length > 0 ? (
                        <div className="grid gap-12 max-w-5xl mx-auto">
                            {courses.map((course) => (
                                <div key={course.id} className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row border-l-8 border-l-primary">
                                    {/* Date Badge Side */}
                                    <div className="bg-primary/5 p-8 flex flex-col items-center justify-center text-center border-r border-border md:w-48">
                                        <span className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                                            {new Date(course.date).toLocaleDateString('es-MX', { month: 'short' })}
                                        </span>
                                        <span className="text-5xl font-extrabold text-foreground leading-none">
                                            {new Date(course.date).getDate()}
                                        </span>
                                        <span className="text-sm font-medium text-muted-foreground mt-2">
                                            {new Date(course.date).getFullYear()}
                                        </span>
                                    </div>

                                    {/* Content Side */}
                                    <div className="p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="inline-block px-2 py-1 rounded-md bg-accent/10 text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                                                    Taller Confirmado
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                                            <p className="text-muted-foreground mb-6 line-clamp-2">
                                                {course.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                    {new Date(course.date).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    {course.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                                    <DollarSign className="h-4 w-4" />
                                                    {course.price ? `${course.price} MXN` : "Gratuito"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={`https://wa.me/${whatsappNumber}?text=Hola,%20me%20interesa%20inscribirme%20al%20curso:%20${course.title}`}
                                                target="_blank"
                                                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-transform hover:scale-105"
                                            >
                                                Inscribirme vía WhatsApp
                                            </Link>
                                            <Link
                                                href={`/courses/${course.id}`}
                                                className="inline-flex h-11 items-center justify-center rounded-full border border-primary px-8 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
                                            >
                                                Más Información
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border max-w-2xl mx-auto">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">Próximamente más eventos</h3>
                            <p className="text-muted-foreground">Actualmente no tenemos talleres programados en esta fecha.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
