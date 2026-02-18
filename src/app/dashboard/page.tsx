import prisma from "@/lib/prisma";
import Link from "next/link";
import { Calendar, FileText, Users, PlusCircle } from "lucide-react";

export default async function DashboardPage() {
    // Fetch real data from the database
    const articlesCount = await prisma.article.count();
    const coursesCount = await prisma.course.count({ where: { published: true } });
    const usersCount = await prisma.user.count();

    return (
        <div className="flex bg-muted/20 min-h-[calc(100vh-theme(spacing.20))] flex-col p-8">
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Panel Administrativo</h2>
                    <p className="text-muted-foreground">Bienvenido al sistema de gestión de KMJ Consultoría.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {/* Card 1: Cursos */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground uppercase">Cursos Programados</h3>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{coursesCount}</div>
                    <p className="text-xs text-muted-foreground">Talleres activos en calendario</p>
                </div>

                {/* Card 2: Artículos */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground uppercase">Artículos del Blog</h3>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{articlesCount}</div>
                    <p className="text-xs text-muted-foreground">Publicaciones en el sitio</p>
                </div>

                {/* Card 3: Usuarios */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground uppercase">Usuarios Admin</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{usersCount}</div>
                    <p className="text-xs text-muted-foreground">Administradores con acceso</p>
                </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-none tracking-tight mb-4">Resumen de Actividad</h3>
                        <div className="h-[200px] flex flex-col items-center justify-center rounded-md border border-dashed bg-muted/50 text-muted-foreground gap-2">
                            <span className="text-4xl">📊</span>
                            <p className="text-sm">Gráfico de visitas próximamente</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-none tracking-tight mb-4">Acciones Rápidas</h3>
                        <div className="space-y-2">
                            <Link href="/dashboard/blog/new" className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-md hover:bg-muted transition-colors text-primary font-medium border border-transparent hover:border-border">
                                <span>Publicar Nuevo Artículo</span>
                                <PlusCircle className="h-4 w-4" />
                            </Link>
                            <button className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-md hover:bg-muted transition-colors text-primary font-medium border border-transparent hover:border-border">
                                <span>Agregar Curso al Calendario</span>
                                <PlusCircle className="h-4 w-4" />
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-md hover:bg-muted transition-colors text-primary font-medium border border-transparent hover:border-border">
                                <span>Registrar Nuevo Admin</span>
                                <PlusCircle className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
