import prisma from "@/lib/prisma";
import { Save, Settings, Phone, Mail, Share2, Layout } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    // Obtener settings (o crear default si no existen)
    const settings = await prisma.siteSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            whatsapp: "521234567890",
            contactEmail: "contacto@kmj.com",
            address: "Monterrey, N.L. México",
        }
    });

    const pageContent = (await prisma.pageContent.upsert({
        where: { id: "main" },
        update: {},
        create: {
            heroTitle: "Consultoría Gestáltica y Desarrollo Humano",
            heroSubtitle: "Potenciamos el talento humano y el bienestar emocional de tu organización.",
        }
    })) as any;

    async function updateSettings(formData: FormData) {
        "use server";

        console.log("💾 Guardando configuración...");

        await prisma.siteSettings.update({
            where: { id: 1 },
            data: {
                whatsapp: formData.get("whatsapp") as string,
                contactEmail: formData.get("contactEmail") as string,
                address: formData.get("address") as string,
                facebookUrl: formData.get("facebookUrl") as string,
                youtubeUrl: formData.get("youtubeUrl") as string,
                instagramUrl: formData.get("instagramUrl") as string,
                linkedinUrl: formData.get("linkedinUrl") as string,
                workingHours: formData.get("workingHours") as string,
            } as any
        });

        await prisma.pageContent.update({
            where: { id: "main" },
            data: {
                heroTitle: formData.get("heroTitle") as string,
                heroSubtitle: formData.get("heroSubtitle") as string,
                aboutTitle: formData.get("aboutTitle") as string,
                aboutText: formData.get("aboutText") as string,
                visionText: formData.get("visionText") as string,
                misionText: formData.get("misionText") as string,
            } as any
        });

        console.log("✅ Configuración guardada con éxito.");

        revalidatePath("/");
        revalidatePath("/dashboard/settings");
        // Forzamos un redirect al mismo sitio para asegurar que el usuario vea un "refresco"
        redirect("/dashboard/settings");
    }

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    <Settings className="h-8 w-8 text-primary" /> Configuración General
                </h1>
                <p className="text-muted-foreground text-lg">Administra la información global y el contenido del sitio.</p>
            </div>

            <form action={updateSettings} className="grid lg:grid-cols-2 gap-12">

                {/* 1. Información de Contacto y Redes */}
                <div className="space-y-8">
                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4">
                            <Phone className="h-5 w-5 text-primary" /> Contacto y Canales
                        </h2>

                        <div className="space-y-2">
                            <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp (Ej: 5218123456789)</label>
                            <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp || ""} className="w-full h-10 px-3 rounded-md border bg-background" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="contactEmail" className="text-sm font-medium">Email de Contacto</label>
                            <input id="contactEmail" name="contactEmail" defaultValue={settings.contactEmail || ""} className="w-full h-10 px-3 rounded-md border bg-background" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address" className="text-sm font-medium">Dirección / Ubicación</label>
                            <textarea id="address" name="address" defaultValue={settings.address || ""} rows={2} className="w-full p-3 rounded-md border bg-background" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="workingHours" className="text-sm font-medium">Horarios de Atención</label>
                            <input id="workingHours" name="workingHours" defaultValue={settings.workingHours || ""} className="w-full h-10 px-3 rounded-md border bg-background" placeholder="Lun-Vie 9:00 - 18:00" />
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4">
                            <Share2 className="h-5 w-5 text-primary" /> Redes Sociales (Link completo)
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <label htmlFor="facebookUrl" className="w-24 text-sm font-medium">Facebook</label>
                                <input id="facebookUrl" name="facebookUrl" defaultValue={settings.facebookUrl || ""} className="flex-1 h-10 px-3 rounded-md border bg-background" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label htmlFor="youtubeUrl" className="w-24 text-sm font-medium">YouTube</label>
                                <input id="youtubeUrl" name="youtubeUrl" defaultValue={(settings as any).youtubeUrl || ""} className="flex-1 h-10 px-3 rounded-md border bg-background" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label htmlFor="instagramUrl" className="w-24 text-sm font-medium">Instagram</label>
                                <input id="instagramUrl" name="instagramUrl" defaultValue={settings.instagramUrl || ""} className="flex-1 h-10 px-3 rounded-md border bg-background" />
                            </div>
                            <div className="flex items-center gap-3">
                                <label htmlFor="linkedinUrl" className="w-24 text-sm font-medium">LinkedIn</label>
                                <input id="linkedinUrl" name="linkedinUrl" defaultValue={settings.linkedinUrl || ""} className="flex-1 h-10 px-3 rounded-md border bg-background" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Contenido de la Página Principal */}
                <div className="space-y-8">
                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4">
                            <Layout className="h-5 w-5 text-primary" /> Página Principal (Textos)
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="heroTitle" className="text-sm font-medium">Título Hero (Principal)</label>
                                <input id="heroTitle" name="heroTitle" defaultValue={pageContent.heroTitle} className="w-full h-10 px-3 rounded-md border bg-background font-bold text-primary" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="heroSubtitle" className="text-sm font-medium">Subtítulo Hero</label>
                                <textarea id="heroSubtitle" name="heroSubtitle" defaultValue={pageContent.heroSubtitle} rows={3} className="w-full p-3 rounded-md border bg-background" />
                            </div>

                            <div className="border-t pt-6 space-y-4">
                                <label htmlFor="aboutTitle" className="text-sm font-medium font-bold italic">Sección: Nosotros / Misión</label>
                                <input id="aboutTitle" name="aboutTitle" defaultValue={pageContent.aboutTitle} className="w-full h-10 px-3 rounded-md border bg-background mb-2" placeholder="Título de la sección" />

                                <div className="space-y-2">
                                    <label htmlFor="visionText" className="text-xs font-bold uppercase text-primary">Texto de Visión</label>
                                    <textarea id="visionText" name="visionText" defaultValue={pageContent.visionText} rows={4} className="w-full p-3 rounded-md border bg-background text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="misionText" className="text-xs font-bold uppercase text-primary">Texto de Misión</label>
                                    <textarea id="misionText" name="misionText" defaultValue={pageContent.misionText} rows={4} className="w-full p-3 rounded-md border bg-background text-sm" />
                                </div>



                                <div className="space-y-2 pt-2 border-t border-dashed">
                                    <label htmlFor="aboutText" className="text-xs font-bold uppercase text-muted-foreground italic">Descripción Extra (About History)</label>
                                    <textarea id="aboutText" name="aboutText" defaultValue={pageContent.aboutText} rows={4} className="w-full p-3 rounded-md border bg-background text-xs" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full inline-flex h-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold hover:bg-primary/90 transition-all shadow-lg gap-3">
                        <Save className="h-6 w-6" /> Guardar Todos los Cambios
                    </button>

                    <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                        * Los cambios se reflejarán instantáneamente en el sitio.
                    </p>
                </div>
            </form>
        </div>
    );
}
