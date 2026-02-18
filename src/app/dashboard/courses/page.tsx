import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Calendar, MapPin } from "lucide-react";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/dashboard/DeleteButton";

export default async function CoursesAdminPage() {
    const courses = await prisma.course.findMany({
        orderBy: { date: 'asc' }
    });

    async function deleteCourse(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.course.delete({ where: { id } });
        revalidatePath("/dashboard/courses");
    }

    return (
        <div className="p-8 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestionar Cursos</h1>
                    <p className="text-muted-foreground">Administra tu calendario de talleres y eventos.</p>
                </div>
                <Link
                    href="/dashboard/courses/new"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2"
                >
                    <Plus className="h-4 w-4" /> Nuevo Curso
                </Link>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="p-4 text-sm font-semibold">Título</th>
                                <th className="p-4 text-sm font-semibold">Fecha</th>
                                <th className="p-4 text-sm font-semibold">Ubicación</th>
                                <th className="p-4 text-sm font-semibold">Precio</th>
                                <th className="p-4 text-sm font-semibold">Estado</th>
                                <th className="p-4 text-sm font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-foreground">{course.title}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{course.description}</div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(course.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {course.location || "No definida"}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-semibold">
                                            {course.price ? `$${course.price}` : "Gratis"}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {course.published ? "Publicado" : "Borrador"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/dashboard/courses/${course.id}/edit`}
                                                    className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <DeleteButton
                                                    action={deleteCourse}
                                                    id={course.id}
                                                    confirmMessage={`¿Seguro que quieres eliminar el curso "${course.title}"?`}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                        No hay cursos registrados. Haz clic en "Nuevo Curso" para empezar.
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
