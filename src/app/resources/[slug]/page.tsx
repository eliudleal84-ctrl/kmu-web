import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Download, PlayCircle, FileText } from "lucide-react";
import { notFound } from "next/navigation";

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug: slug },
    });

    if (!article) {
        notFound();
    }

    // Función para extraer el ID de YouTube
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = article.type === 'VIDEO' && article.resourceUrl ? getYouTubeId(article.resourceUrl) : null;

    return (
        <div className="flex flex-col items-center">
            {/* Hero con Imagen de Fondo */}
            <div className="w-full relative h-[400px] bg-muted flex items-center justify-center overflow-hidden">
                {article.coverImage ? (
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover blur-[2px] scale-105 opacity-50"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
                )}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                    <span className="inline-block rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-bold mb-4 flex items-center gap-2">
                        {article.type === 'VIDEO' ? <PlayCircle className="h-4 w-4" /> :
                            article.type === 'DOWNLOADABLE' ? <Download className="h-4 w-4" /> :
                                <FileText className="h-4 w-4" />}
                        {article.category}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl tracking-tight leading-tight">
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="container px-4 md:px-6 mx-auto -mt-16 relative z-10 mb-16">
                <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-lg p-8 md:p-12">

                    {/* Metadatos */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 border-b border-border pb-6">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Por Admin KMJ
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> {new Date(article.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" /> {article.category}
                        </div>
                    </div>

                    {/* Sección de Video si es tipo VIDEO */}
                    {article.type === 'VIDEO' && youtubeId && (
                        <div className="mb-10 aspect-video rounded-xl overflow-hidden shadow-md border border-border">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {/* Sección de Descarga si es tipo DOWNLOADABLE */}
                    {article.type === 'DOWNLOADABLE' && article.resourceUrl && (
                        <div className="mb-10 p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 uppercase tracking-wider">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Download className="h-6 w-6 text-primary" />
                                </div>
                                <p className="font-bold text-sm text-foreground">Documento disponible para descarga</p>
                            </div>
                            <a
                                href={article.resourceUrl}
                                target="_blank"
                                className="h-12 px-8 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all shadow-md gap-2"
                            >
                                Descargar Ahora <Download className="h-4 w-4" />
                            </a>
                        </div>
                    )}

                    {/* Cuerpo del Artículo (Descripción o Texto) */}
                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                        {typeof article.content === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : (
                            <p>Contenido no disponible.</p>
                        )}
                    </article>

                    {/* Footer del Artículo */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <Link href="/resources" className="inline-flex items-center text-primary font-medium hover:underline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Recursos
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
