import prisma from "@/lib/prisma";
import Link from "next/link";
import { Search, Brain, ArrowRight, BookOpen, Video, PlayCircle, Download, FileCheck, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsletterForm } from "@/components/resources/NewsletterForm";

export default async function ResourcesPage() {
    // 1. Fetch Articles from Database
    const articles = await prisma.article.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    const blogArticles = articles.filter(a => a.type === 'ARTICLE');
    const videoResources = articles.filter(a => a.type === 'VIDEO');
    const downloadables = articles.filter(a => a.type === 'DOWNLOADABLE');

    // Helper component for Resource Card
    const ResourceCard = ({ article }: { article: any }) => {
        const isVideo = article.type === 'VIDEO';
        const isDownload = article.type === 'DOWNLOADABLE';

        return (
            <div className={`group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all ${isDownload ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-foreground flex items-center gap-1 z-10">
                        {isVideo ? <Video className="h-3 w-3 text-red-500" /> :
                            isDownload ? <Download className="h-3 w-3 text-primary" /> :
                                <BookOpen className="h-3 w-3 text-blue-500" />}
                        {article.category}
                    </div>

                    {/* Visual indicators for non-article types over image */}
                    {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="bg-primary/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                                <PlayCircle className="h-10 w-10 text-white" />
                            </div>
                        </div>
                    )}
                    {isDownload && !article.coverImage && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-primary/5">
                            <FileCheck className="h-16 w-16 text-primary opacity-40" />
                        </div>
                    )}

                    {/* Image Handling */}
                    {article.coverImage ? (
                        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full bg-secondary/10 flex items-center justify-center text-muted-foreground italic">
                            {isVideo ? "Miniatura del Video" : "KMJ Consultoría"}
                        </div>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                        {article.excerpt}
                    </p>
                    <Link href={`/resources/${article.slug}`} className="w-full">
                        <button className={`w-full py-2 rounded-md ${isDownload ? 'bg-secondary text-secondary-foreground' : 'bg-muted hover:bg-muted/80 text-foreground'} text-sm font-bold transition-colors flex items-center justify-center gap-2 group/btn`}>
                            {isVideo ? "Ver Video" : isDownload ? "Descargar" : "Leer Artículo"}
                            <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full py-20 bg-gradient-to-b from-background to-secondary/10 border-b border-border/50">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-bold uppercase tracking-wider">
                        Centro de Aprendizaje KMJ
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                            Ingeniería Humana y <br className="hidden sm:inline" /> <span className="text-primary italic">Desarrollo Consciente</span>
                        </h1>
                        <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Un espacio donde integro experiencia industrial, enfoque gestáltico y liderazgo humano.
                        </p>
                        <p className="mx-auto max-w-[800px] text-primary/80 font-medium md:text-lg">
                            Recursos diseñados para quienes buscan crecer como personas, profesionales y líderes desde la conciencia y la responsabilidad.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categorías y Contenido */}
            <section className="w-full py-16 bg-background">
                <div className="container px-4 md:px-6 mx-auto">

                    <Tabs defaultValue="todos" className="w-full flex flex-col items-center space-y-8">
                        <TabsList className="flex flex-wrap justify-center h-auto gap-2 bg-transparent p-0">
                            <TabsTrigger value="todos" className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
                            <TabsTrigger value="blog" className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Blog y Artículos</TabsTrigger>
                            <TabsTrigger value="videos" className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Videos y Webinars</TabsTrigger>
                            <TabsTrigger value="descargables" className="rounded-full border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Descargables</TabsTrigger>
                        </TabsList>

                        {/* Content Display - Todos */}
                        <TabsContent value="todos" className="w-full">
                            {articles.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {articles.map((article) => <ResourceCard key={article.id} article={article} />)}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">No hay recursos publicados todavía.</div>
                            )}
                        </TabsContent>

                        {/* Specific Tags Content */}
                        <TabsContent value="blog" className="w-full">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogArticles.length > 0 ? (
                                    blogArticles.map((article) => <ResourceCard key={article.id} article={article} />)
                                ) : (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">No hay artículos publicados.</div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="videos" className="w-full">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videoResources.length > 0 ? (
                                    videoResources.map((article) => <ResourceCard key={article.id} article={article} />)
                                ) : (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">No hay videos publicados todavía.</div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="descargables" className="w-full">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {downloadables.length > 0 ? (
                                    downloadables.map((article) => <ResourceCard key={article.id} article={article} />)
                                ) : (
                                    <div className="col-span-full text-center py-12 text-muted-foreground">No hay descargables disponibles todavía.</div>
                                )}
                            </div>
                        </TabsContent>

                    </Tabs>

                </div>
            </section>

            {/* Newsletter Segment */}
            <section className="w-full py-20 bg-primary text-primary-foreground">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Únete a nuestra comunidad</h2>
                    <p className="max-w-xl mx-auto text-primary-foreground/80 text-lg leading-relaxed">
                        Recibe consejos prácticos de salud emocional e ingeniería humana, y avisos sobre nuevos recursos gratuitos diseñados para tu crecimiento personal y profesional.
                    </p>
                    <NewsletterForm />
                </div>
            </section>
        </div>
    );
}
