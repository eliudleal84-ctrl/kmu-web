import Link from "next/link";
import { ArrowLeft, Save, Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function NewCoursePage() {

    async function createCourse(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dateStr = formData.get("date") as string;
        const location = formData.get("location") as string;
        const priceStr = formData.get("price") as string;
        const published = formData.get("published") === "on";

        await prisma.course.create({
            data: {
                title,
                description,
                date: new Date(dateStr),
                location,
                price: parseFloat(priceStr) || 0,
                published,
            },
        });

        redirect("/dashboard/courses");
    }

    return (
        <div className="flex bg-muted/20 min-h-screen flex-col p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/courses" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Nuevo Curso / Taller</h1>
                    <p className="text-muted-foreground">Registra un nuevo evento en tu calendario.</p>
                </div>
            </div>

            <form action={createCourse} className="space-y-6">
                <div className="rounded-xl border bg-card p-6 md:p-8 shadow-sm space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Nombre del Curso</label>
                        <input
                            name="title"
                            id="title"
                            required
                            className="flex h-12 w-full rounded-md border border-input bg-background px-4 text-lg font-bold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Ej. Taller de Liderazgo Consciente"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" /> Fecha y Hora
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                id="date"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" /> Ubicación
                            </label>
                            <input
                                name="location"
                                id="location"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                placeholder="Ej. Presencial - Centro KMJ / Online - Zoom"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" /> Inversión (Precio)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                id="price"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="flex items-center space-x-2 pt-8">
                            <input
                                type="checkbox"
                                name="published"
                                id="published"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Publicar inmediatamente
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" /> Descripción Detallada
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            required
                            rows={5}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y"
                            placeholder="Describe de qué trata el curso, a quién va dirigido, etc."
                        />
                    </div>

                    <button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-sm gap-2 mt-4">
                        <Save className="h-4 w-4" /> Guardar Curso
                    </button>
                </div>
            </form>
        </div>
    );
}
