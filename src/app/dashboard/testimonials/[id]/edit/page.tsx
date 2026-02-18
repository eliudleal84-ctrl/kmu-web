import prisma from "@/lib/prisma";
import { Save, User, Star, MessageSquare, ArrowLeft } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditTestimonialPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
        where: { id }
    });

    if (!testimonial) {
        notFound();
    }

    async function updateTestimonial(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const role = formData.get("role") as string;
        const content = formData.get("content") as string;
        const rating = parseInt(formData.get("rating") as string);
        const published = formData.get("published") === "on";

        await prisma.testimonial.update({
            where: { id },
            data: {
                name,
                role,
                content,
                rating,
                published
            }
        });

        revalidatePath("/dashboard/testimonials");
        revalidatePath("/");
        redirect("/dashboard/testimonials");
    }

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link href="/dashboard/testimonials" className="text-sm text-primary flex items-center gap-1 hover:underline mb-2">
                        <ArrowLeft className="h-3 w-3" /> Volver a testimonios
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Editar Testimonio</h1>
                    <p className="text-muted-foreground">Actualiza la información de la reseña seleccionada.</p>
                </div>
            </div>

            <form action={updateTestimonial} className="space-y-6">
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
                                defaultValue={testimonial.name}
                                className="w-full h-11 px-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium">Cargo / Empresa (Opcional)</label>
                            <input
                                id="role"
                                name="role"
                                defaultValue={testimonial.role || ""}
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
                            defaultValue={testimonial.rating.toString()}
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
                            defaultValue={testimonial.content}
                            className="w-full p-4 rounded-md border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked={testimonial.published}
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
                        <Save className="h-5 w-5" /> Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}
