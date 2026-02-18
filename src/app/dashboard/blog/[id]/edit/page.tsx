import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Video, FileText, Download } from "lucide-react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface EditArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = await params;

    const article = await prisma.article.findUnique({
        where: { id },
    });

    if (!article) {
        notFound();
    }

    async function updateArticle(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const rawSlug = formData.get("slug") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const category = formData.get("category") as string;
        const coverImage = formData.get("coverImage") as string;
        const type = formData.get("type") as string;
        const resourceUrl = formData.get("resourceUrl") as string;

        // Auto-fix slug
        const slug = rawSlug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        await prisma.article.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                category,
                coverImage,
                type,
                resourceUrl,
            },
        });

        redirect("/dashboard/blog");
    }

    return (
        <div className="flex bg-muted/20 min-h-screen flex-col p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/blog" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Editar Recurso</h1>
                    <p className="text-muted-foreground">Actualiza el contenido de tu publicación.</p>
                </div>
            </div>

            <form action={updateArticle} className="grid gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Título</label>
                        <input
                            name="title"
                            id="title"
                            required
                            defaultValue={article.title}
                            className="flex h-12 w-full rounded-md border border-input bg-background px-4 text-lg font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                    </div>

                    {/* Selector de Tipo */}
                    <div className="grid grid-cols-3 gap-4">
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="ARTICLE" defaultChecked={article.type === 'ARTICLE'} className="peer sr-only" />
                            <FileText className="h-6 w-6" />
                            <span className="text-sm font-medium">Artículo</span>
                        </label>
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="VIDEO" defaultChecked={article.type === 'VIDEO'} className="peer sr-only" />
                            <Video className="h-6 w-6" />
                            <span className="text-sm font-medium">Video (YouTube)</span>
                        </label>
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="DOWNLOADABLE" defaultChecked={article.type === 'DOWNLOADABLE'} className="peer sr-only" />
                            <Download className="h-6 w-6" />
                            <span className="text-sm font-medium">PDF Descargable</span>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="resourceUrl" className="text-sm font-medium flex items-center gap-2">
                            Enlace al Recurso (Video/PDF)
                        </label>
                        <input
                            name="resourceUrl"
                            id="resourceUrl"
                            defaultValue={article.resourceUrl || ""}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Contenido Principal / Descripción</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            defaultValue={article.content}
                            className="flex min-h-[400px] w-full rounded-md border border-input bg-background p-4 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y"
                        />
                    </div>

                </div>

                {/* Sidebar Settings Column */}
                <div className="space-y-6">

                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            Imagen de Portada
                        </h3>
                        <div className="space-y-2">
                            <label htmlFor="coverImage" className="text-xs font-medium uppercase text-muted-foreground">URL de la Imagen</label>
                            <input
                                name="coverImage"
                                id="coverImage"
                                defaultValue={article.coverImage || ""}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                        <h3 className="font-semibold text-lg">Detalles de Publicación</h3>

                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-xs font-medium uppercase text-muted-foreground">Slug (URL)</label>
                            <input
                                name="slug"
                                id="slug"
                                required
                                defaultValue={article.slug}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono text-muted-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-xs font-medium uppercase text-muted-foreground">Categoría</label>
                            <select
                                name="category"
                                id="category"
                                defaultValue={article.category}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <option value="Liderazgo">Liderazgo</option>
                                <option value="Salud Emocional">Salud Emocional</option>
                                <option value="Psicoeducación">Psicoeducación</option>
                                <option value="Noticias">Noticias KMJ</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="excerpt" className="text-xs font-medium uppercase text-muted-foreground">Extracto Corto</label>
                            <textarea
                                name="excerpt"
                                id="excerpt"
                                rows={3}
                                defaultValue={article.excerpt || ""}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                            />
                        </div>

                        <button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-sm gap-2 mt-4">
                            <Save className="h-4 w-4" /> Guardar Cambios
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}
