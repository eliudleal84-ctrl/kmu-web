import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Video, FileText, Download } from "lucide-react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default function NewArticlePage() {

    async function createTask(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const rawSlug = formData.get("slug") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const category = formData.get("category") as string;
        const coverImage = formData.get("coverImage") as string;
        const type = formData.get("type") as string; // ARTICLE, VIDEO, DOWNLOADABLE
        const resourceUrl = formData.get("resourceUrl") as string;

        // Auto-fix slug
        const slug = rawSlug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        await prisma.article.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                category,
                coverImage,
                type,
                resourceUrl,
                published: true,
                authorId: "admin",
            },
        });

        redirect("/dashboard/blog");
    }

    return (
        <div className="flex bg-muted/20 min-h-screen flex-col p-8 md:p-12 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/blog" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Crear Nuevo Recurso</h1>
                    <p className="text-muted-foreground">Publica un artículo, video o documento descargable.</p>
                </div>
            </div>

            <form action={createTask} className="grid gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Título</label>
                        <input
                            name="title"
                            id="title"
                            required
                            className="flex h-12 w-full rounded-md border border-input bg-background px-4 text-lg font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Ej. Guía para el manejo del estrés"
                        />
                    </div>

                    {/* Selector de Tipo (Radio Buttons visuales o Select) */}
                    <div className="grid grid-cols-3 gap-4">
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="ARTICLE" defaultChecked className="peer sr-only" />
                            <FileText className="h-6 w-6" />
                            <span className="text-sm font-medium">Artículo</span>
                        </label>
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="VIDEO" className="peer sr-only" />
                            <Video className="h-6 w-6" />
                            <span className="text-sm font-medium">Video (YouTube)</span>
                        </label>
                        <label className="cursor-pointer border border-border bg-card text-card-foreground rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-muted transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                            <input type="radio" name="type" value="DOWNLOADABLE" className="peer sr-only" />
                            <Download className="h-6 w-6" />
                            <span className="text-sm font-medium">PDF Descargable</span>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="resourceUrl" className="text-sm font-medium flex items-center gap-2">
                            Enlace al Recurso
                            <span className="text-xs text-muted-foreground font-normal">(Solo para Videos o PDFs externos)</span>
                        </label>
                        <input
                            name="resourceUrl"
                            id="resourceUrl"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="https://youtube.com/watch?v=... o https://drive.google.com/..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Descripción / Contenido</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            className="flex min-h-[300px] w-full rounded-md border border-input bg-background p-4 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y"
                            placeholder="Escribe aquí el contenido del artículo o la descripción del video..."
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
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                placeholder="https://..."
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
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono text-muted-foreground"
                                placeholder="ej-titulo-recurso"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-xs font-medium uppercase text-muted-foreground">Categoría</label>
                            <select
                                name="category"
                                id="category"
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
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                                placeholder="Resumen para la tarjeta..."
                            />
                        </div>

                        <button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-sm gap-2 mt-4">
                            <Save className="h-4 w-4" /> Publicar Recurso
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}
