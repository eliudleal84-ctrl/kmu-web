import prisma from "@/lib/prisma";
import { Save, User, Star, MessageSquare } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewTestimonialPage() {
    async function createTestimonial(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const role = formData.get("role") as string;
        const content = formData.get("content") as string;
        const rating = parseInt(formData.get("rating") as string);
        const published = formData.get("published") === "on";

        await prisma.testimonial.create({
            data: {
                name,
                role,
                content,
                rating,
                published,
                section: "General"
            }
        });

        revalidatePath("/dashboard/testimonials");
        revalidatePath("/");
        redirect("/dashboard/testimonials");
    }

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Nuevo Testimonio</h1>
                    <p className="text-muted-foreground">Agrega una nueva reseña de cliente para mostrar en la web.</p>
                </div>
            </div>

            <form action={createTestimonial} className="space-y-6">
                <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" /> Nombre del Cliente
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                placeholder="Ej: Juan Pérez"
                                className="w-full h-11 px-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">Cargo / Empresa (Opcional)</label>
                            <input
                                id="role"
                                name="role"
                                placeholder="Ej: CEO de Tech Corp / Paciente"
                                className="w-full h-11 px-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="rating" className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Calificación (1-5 Estrellas)
                        </label>
                        <select
                            id="rating"
                            name="rating"
                            defaultValue="5"
                            className="w-full h-11 px-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                            <option value="5">⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                            <option value="4">⭐⭐⭐⭐ (4 Estrellas)</option>
                            <option value="3">⭐⭐⭐ (3 Estrellas)</option>
                            <option value="2">⭐⭐ (2 Estrellas)</option>
                            <option value="1">⭐ (1 Estrella)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-primary" /> Reseña / Opinión
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={6}
                            placeholder="Escribe aquí lo que el cliente dijo..."
                            className="w-full p-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked
                            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                            Publicar inmediatamente en el sitio web
                        </label>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="/dashboard/testimonials"
                        className="flex-1 h-12 inline-flex items-center justify-center rounded-xl border border-border bg-background font-medium hover:bg-muted transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="flex-[2] h-12 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 transition-all gap-2"
                    >
                        <Save className="h-5 w-5" /> Guardar Testimonio
                    </button>
                </div>
            </form>
        </div>
    );
}
