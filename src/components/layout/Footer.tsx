import { Facebook, Youtube, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import prisma from "@/lib/prisma";

export async function Footer() {
    // Obtener settings globales
    const settings = (await prisma.siteSettings.findUnique({
        where: { id: 1 }
    })) as any;

    const facebook = settings?.facebookUrl || "#";
    const youtube = settings?.youtubeUrl || "#";
    const email = settings?.contactEmail || "contacto@kmj.com";

    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    {settings?.facebookUrl && (
                        <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" aria-hidden="true" />
                        </a>
                    )}
                    {settings?.instagramUrl && (
                        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" aria-hidden="true" />
                        </a>
                    )}
                    {settings?.linkedinUrl && (
                        <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-6 w-6" aria-hidden="true" />
                        </a>
                    )}
                    {settings?.youtubeUrl && (
                        <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">YouTube</span>
                            <Youtube className="h-6 w-6" aria-hidden="true" />
                        </a>
                    )}
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                        <p className="text-center text-xs leading-5 text-muted-foreground flex items-center gap-2">
                            <span>&copy; {new Date().getFullYear()} KMJ Consultoría Gestáltica.</span>
                            <span className="hidden md:inline text-border">|</span>
                            <span>Desarrollado por <a href="https://imaginex.com.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium decoration-primary/30 underline-offset-4 hover:underline">Imaginex</a></span>
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2 md:mt-0">
                            <div className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{email}</span>
                            </div>
                            {settings?.whatsapp && (
                                <div className="flex items-center space-x-1">
                                    <Phone className="h-3 w-3" />
                                    <span>+{settings.whatsapp}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
