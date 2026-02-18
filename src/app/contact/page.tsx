import prisma from "@/lib/prisma";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Linkedin, MessageCircle, Send, Youtube } from "lucide-react";

export default async function ContactPage() {
    const settings = await prisma.siteSettings.findUnique({
        where: { id: 1 }
    });

    const whatsappNumber = settings?.whatsapp || "521234567890";
    const contactEmail = settings?.contactEmail || "contacto@kmj.com";
    const address = settings?.address || "Calle Ejemplo 123, Colonia Obispado\nMonterrey, Nuevo León, México. CP 64060";
    const hours = settings?.workingHours || "Lunes a Viernes: 9:00 AM - 8:00 PM\nSábados: 9:00 AM - 2:00 PM";
    const phone = settings?.whatsapp ? `+52 ${settings.whatsapp.slice(2)}` : "+52 (81) 1234-5678";
    const mapsUrl = "https://maps.app.goo.gl/w6hv6bLs1BhBxRQy7";

    return (
        <div className="flex flex-col items-center">
            {/* 1. Hero / Encabezado */}
            <section className="w-full py-20 bg-gradient-to-b from-background to-secondary/10 border-b border-border/50">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-bold uppercase tracking-wider mb-2">
                        Contacto
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                            Da el <span className="text-primary italic">Primer Paso</span>
                        </h1>
                        <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Si algo de lo que has leído resuena contigo, no lo postergues.
                        </p>
                        <p className="mx-auto max-w-[900px] text-foreground/80 md:text-lg leading-relaxed">
                            Ya sea para iniciar un proceso terapéutico, fortalecer tu liderazgo o implementar programas en tu empresa, puedes contactarme para conversar y definir el siguiente paso.
                        </p>
                        <p className="mx-auto max-w-[800px] text-primary/80 font-bold md:text-xl italic pt-4">
                            "El cambio comienza cuando decides atender aquello que hoy requiere conciencia."
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Información de Contacto y Formulario */}
            <section className="w-full py-16 bg-background">
                <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Columna Izquierda: Datos de Contacto */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Medios de Contacto</h2>
                            <p className="text-muted-foreground">
                                Elige el canal que prefieras. Respondemos usualmente en menos de 24 horas hábiles.
                            </p>

                            {/* WhatsApp (Destacado) */}
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors group"
                            >
                                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <MessageCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">WhatsApp Directo</h3>
                                    <p className="text-sm text-muted-foreground">Envíanos un mensaje rápido</p>
                                </div>
                            </a>

                            <div className="grid gap-6 pt-4">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Ubicación</h3>
                                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                                            {address}
                                        </p>
                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary underline mt-1 block hover:text-primary/80 transition-colors font-bold"
                                        >
                                            Ver ubicación precisa en Google Maps
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Teléfono</h3>
                                        <p className="text-muted-foreground text-sm">{phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Correo Electrónico</h3>
                                        <p className="text-muted-foreground text-sm">{contactEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-primary mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Horarios de Atención</h3>
                                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                                            {hours}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Redes Sociales */}
                            <div className="pt-6 border-t border-border">
                                <h3 className="font-semibold mb-4">Síguenos en Redes</h3>
                                <div className="flex gap-4">
                                    {settings?.facebookUrl && (
                                        <a
                                            href={settings.facebookUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Facebook className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings?.instagramUrl && (
                                        <a
                                            href={settings.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Instagram className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings?.linkedinUrl && (
                                        <a
                                            href={settings.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                    )}
                                    {settings?.youtubeUrl && (
                                        <a
                                            href={settings.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Youtube className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-fit sticky top-24">
                        <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                                    <input id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="Tu nombre" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastname" className="text-sm font-medium">Apellido</label>
                                    <input id="lastname" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="Tu apellido" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input id="email" type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="correo@ejemplo.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                                <select id="subject" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <option value="terapia">Agendar Cita de Terapia</option>
                                    <option value="empresa">Cotización Empresarial</option>
                                    <option value="curso">Informes sobre Cursos</option>
                                    <option value="otro">Otro motivo</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                                <textarea id="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" placeholder="Escribe aquí tus dudas o comentarios..." />
                            </div>

                            <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 w-full gap-2">
                                Enviar Mensaje <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
}
