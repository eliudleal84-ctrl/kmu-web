import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Star, Quote, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/dashboard/DeleteButton";

export default async function TestimonialsAdminPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });

    async function deleteTestimonial(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.testimonial.delete({ where: { id } });
        revalidatePath("/dashboard/testimonials");
        revalidatePath("/");
    }

    return (
        <div className="p-8 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestionar Testimonios</h1>
                    <p className="text-muted-foreground">Administra las reseñas y opiniones de tus clientes.</p>
                </div>
                <Link
                    href="/dashboard/testimonials/new"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2"
                >
                    <Plus className="h-4 w-4" /> Nuevo Testimonio
                </Link>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="p-4 text-sm font-semibold">Cliente</th>
                                <th className="p-4 text-sm font-semibold">Calificación</th>
                                <th className="p-4 text-sm font-semibold">Reseña</th>
                                <th className="p-4 text-sm font-semibold">Estado</th>
                                <th className="p-4 text-sm font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {testimonials.length > 0 ? (
                                testimonials.map((t) => (
                                    <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-foreground">{t.name}</div>
                                                    <div className="text-xs text-muted-foreground">{t.role || "Cliente"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                {[...Array(t.rating)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 fill-current" />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground max-w-[300px]">
                                            <div className="flex gap-2">
                                                <Quote className="h-4 w-4 text-primary shrink-0 opacity-50" />
                                                <p className="line-clamp-2 italic">{t.content}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {t.published ? "Publicado" : "Borrador"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/dashboard/testimonials/${t.id}/edit`}
                                                    className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <DeleteButton
                                                    action={deleteTestimonial}
                                                    id={t.id}
                                                    confirmMessage={`¿Seguro que quieres eliminar el testimonio de "${t.name}"?`}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-muted-foreground">
                                        No hay testimonios registrados. Haz clic en "Nuevo Testimonio" para empezar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
