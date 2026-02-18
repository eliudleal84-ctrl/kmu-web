import prisma from "@/lib/prisma";
import { User, Mail, Shield, ShieldAlert } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteButton } from "@/components/dashboard/DeleteButton";

export default async function UsersAdminPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    async function deleteUser(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;

        const count = await prisma.user.count();
        if (count <= 1) {
            return;
        }

        await prisma.user.delete({ where: { id } });
        revalidatePath("/dashboard/users");
    }

    return (
        <div className="p-8 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Usuarios Administradores
                    </h1>
                    <p className="text-muted-foreground">Gestiona quién puede acceder al panel de control.</p>
                </div>
                <Link
                    href="/dashboard/users/new"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2"
                >
                    <Plus className="h-4 w-4" /> Nuevo Administrador
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div key={user.id} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3">
                            <DeleteButton
                                action={deleteUser}
                                id={user.id}
                                confirmMessage={`¿Estás seguro de eliminar a "${user.name}"?`}
                            />
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{user.name || "Sin nombre"}</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1">
                                    <Shield className="h-3 w-3" /> Administrador
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                                <Mail className="h-4 w-4" /> {user.email}
                            </div>
                            <div className="text-[10px] text-muted-foreground/60">
                                Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dashed">
                            <p className="text-[10px] text-muted-foreground leading-tight italic">
                                * Este usuario puede editar artículos, cursos y cambiar la configuración del sitio.
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
                    <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground italic">No se encontraron usuarios administradores.</p>
                </div>
            )}
        </div>
    );
}
