import Link from "next/link";
import { PlusCircle, Edit, Trash2, Calendar, CheckCircle } from "lucide-react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function BlogListPage() {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: "desc" },
    });

    async function deleteArticle(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.article.delete({ where: { id } });
        revalidatePath("/dashboard/blog");
        redirect("/dashboard/blog");
    }

    return (
        <div className="flex bg-muted/20 min-h-screen flex-col p-8 md:p-12 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestionar Artículos</h1>
                    <p className="text-muted-foreground">Aquí puedes editar, eliminar o crear nuevas publicaciones.</p>
                </div>
                <Link
                    href="/dashboard/blog/new"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors gap-2"
                >
                    <PlusCircle className="h-4 w-4" /> Nuevo Artículo
                </Link>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                {articles.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        <p>No tienes artículos creados aún.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Título</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground max-w-xs truncate">
                                        {article.title}
                                        <div className="text-xs text-muted-foreground font-mono mt-1 truncate max-w-[200px]">
                                            /{article.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {article.published ? (
                                            <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500 font-medium text-xs">
                                                <CheckCircle className="h-3.5 w-3.5" /> Publicado
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">Borrador</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {/* Botón Editar (Link) */}
                                        <Link
                                            href={`/dashboard/blog/${article.id}/edit`}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                                            title="Editar"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>

                                        {/* Botón Eliminar (Formulario) */}
                                        <form action={deleteArticle} className="inline-block">
                                            <input type="hidden" name="id" value={article.id} />
                                            <button
                                                type="submit"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors text-destructive"
                                                title="Eliminar"
                                            // Tip: En React 19 / NextJS nuevo, confirm() bloquea la UI, 
                                            // pero es una forma rápida de pedir confirmación sin JS complejo.
                                            // Ojo: En Server Components puros, los eventos onClick son tricky.
                                            // Por ahora dejémoslo directo, luego agregamos confirmación.
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
