import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Users, Brain, HeartPulse, Sparkles, Laptop, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursesPage() {
    return (
        <div className="flex flex-col items-center">
            {/* 1. Hero Section - Capacitación y Cursos */}
            <section className="w-full py-20 bg-muted/20">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                        Formación y Crecimiento
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                        Capacitación y <br className="hidden sm:inline" /> Talleres Vivenciales
                    </h1>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                        Impulsamos el desarrollo humano y profesional a través de experiencias de aprendizaje transformadoras.
                        Cursos presenciales y online diseñados para despertar tu potencial.
                    </p>
                </div>
            </section>

            {/* 2. Oferta Educativa (Categorías) */}
            <section className="w-full py-16 bg-background">
                <div className="container px-4 md:px-6 mx-auto">
                    <Tabs defaultValue="publico" className="w-full flex flex-col items-center">

                        <TabsList className="grid w-full max-w-md grid-cols-2 mb-12">
                            <TabsTrigger value="publico">Abiertos al Público</TabsTrigger>
                            <TabsTrigger value="empresas">Empresariales</TabsTrigger>
                        </TabsList>

                        {/* Cursos Abiertos al Público y Talleres Vivenciales */}
                        <TabsContent value="publico" className="w-full space-y-12">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Liderazgo Consciente */}
                                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all">
                                    <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Liderazgo Consciente</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Desarrolla habilidades de dirección desde la autoconciencia y la empatía. Ideal para quienes buscan liderar con propósito.
                                    </p>
                                    <ul className="text-sm space-y-2 mb-6 text-foreground/80">
                                        <li className="flex items-center gap-2">• Inteligencia Emocional</li>
                                        <li className="flex items-center gap-2">• Comunicación Asertiva</li>
                                    </ul>
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Próximamente</div>
                                </div>

                                {/* Desarrollo Humano */}
                                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all">
                                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg flex items-center justify-center mb-6">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Desarrollo Humano</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Talleres vivenciales para el crecimiento personal profundo. Explora tus emociones y rompe patrones limitantes.
                                    </p>
                                    <ul className="text-sm space-y-2 mb-6 text-foreground/80">
                                        <li className="flex items-center gap-2">• Autoestima y Autoconcepto</li>
                                        <li className="flex items-center gap-2">• Relaciones Sanas</li>
                                    </ul>
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Inscripciones Abiertas</div>
                                </div>

                                {/* Manejo de Ansiedad */}
                                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all">
                                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                                        <Brain className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">Manejo de Ansiedad</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Herramientas prácticas de la Terapia Gestalt para gestionar el estrés y la ansiedad en la vida diaria.
                                    </p>
                                    <ul className="text-sm space-y-2 mb-6 text-foreground/80">
                                        <li className="flex items-center gap-2">• Técnicas de Respiración</li>
                                        <li className="flex items-center gap-2">• Mindfulness y Presente</li>
                                    </ul>
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Cupos Limitados</div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Cursos Empresariales */}
                        <TabsContent value="empresas" className="w-full">
                            <div className="bg-muted/30 border border-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-2xl font-bold">Capacitación In-Company</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Diseñamos programas a la medida de tus necesidades organizacionales. Llevamos nuestros talleres a tus instalaciones o en formato online para tu equipo.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <HeartPulse className="h-5 w-5 text-primary" /> Salud Emocional Laboral
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="h-5 w-5 text-primary" /> Team Building Gestáltico
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Brain className="h-5 w-5 text-primary" /> Manejo de Estrés (Burnout)
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="h-5 w-5 text-primary" /> Liderazgo Transformacional
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Link href="/contact?type=cotizacion" className="inline-flex items-center text-primary font-bold hover:underline">
                                            Solicitar catálogo empresarial <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex-1 aspect-video bg-white rounded-xl shadow-sm flex items-center justify-center border border-border">
                                    <span className="text-muted-foreground italic">Imagen: Capacitación Corporativa</span>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* 3. Calendario de Próximos Cursos */}
            <section className="w-full py-20 bg-muted/10 border-t border-border/50">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Calendario de Actividades</h2>

                    <div className="grid gap-6">
                        {/* Evento 1 */}
                        <div className="flex flex-col md:flex-row bg-card border-l-4 border-l-primary shadow-sm rounded-r-xl overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-primary/5 p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0 border-b md:border-b-0 md:border-r border-border/50">
                                <span className="text-3xl font-bold text-primary">15</span>
                                <span className="text-sm font-bold uppercase text-muted-foreground">Noviembre</span>
                                <span className="text-xs text-muted-foreground mt-1">Sábado</span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Taller Vivencial
                                </div>
                                <h3 className="text-xl font-bold">Sanando al Niño Interior</h3>
                                <p className="text-muted-foreground text-sm">Un viaje de reconexión con tu esencia y creatividad perdida. Recupera la alegría de vivir.</p>
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 10:00 AM - 6:00 PM</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Presencial (Centro KMJ)</span>
                                </div>
                            </div>
                            <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-border/50 bg-muted/5">
                                <Link href="/contact?type=curso&id=nino-interior" className="w-full md:w-auto px-6 py-2 bg-foreground text-background rounded-full text-sm font-bold hover:bg-foreground/80 transition-colors text-center">
                                    Inscribirme
                                </Link>
                            </div>
                        </div>

                        {/* Evento 2 */}
                        <div className="flex flex-col md:flex-row bg-card border-l-4 border-l-secondary shadow-sm rounded-r-xl overflow-hidden hover:shadow-md transition-shadow opacity-90">
                            <div className="bg-secondary/10 p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0 border-b md:border-b-0 md:border-r border-border/50">
                                <span className="text-3xl font-bold text-secondary-foreground">28</span>
                                <span className="text-sm font-bold uppercase text-muted-foreground">Noviembre</span>
                                <span className="text-xs text-muted-foreground mt-1">Viernes</span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-secondary-foreground uppercase tracking-wide">
                                    Webinar Online
                                </div>
                                <h3 className="text-xl font-bold">Introducción a la Gestalt</h3>
                                <p className="text-muted-foreground text-sm">Conoce los principios básicos de la terapia Gestalt y cómo aplicarlos en tu vida diaria.</p>
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 7:00 PM - 9:00 PM</span>
                                    <span className="flex items-center gap-1"><Laptop className="h-3 w-3" /> Vía Zoom</span>
                                </div>
                            </div>
                            <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-border/50 bg-muted/5">
                                <Link href="/contact?type=curso&id=intro-gestalt" className="w-full md:w-auto px-6 py-2 border border-foreground/20 rounded-full text-sm font-bold hover:bg-foreground/5 transition-colors text-center">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Modalidades y Cierre */}
            <section className="w-full py-20 bg-background text-center">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-12">
                    <h2 className="text-2xl font-bold">Elige cómo quieres aprender</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center p-6 border rounded-xl bg-card">
                            <Building2 className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Presencial</h3>
                            <p className="text-sm text-muted-foreground">
                                Vive la experiencia completa en nuestras instalaciones acondicionadas para el trabajo grupal y vivencial.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-6 border rounded-xl bg-card">
                            <Laptop className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Online</h3>
                            <p className="text-sm text-muted-foreground">
                                Conéctate desde cualquier lugar sin perder la calidad humana y la interacción en tiempo real.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                        >
                            Contactar para Inscripciones
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
