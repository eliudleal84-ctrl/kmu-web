import Link from "next/link";
import { ArrowLeft, UserPlus, Mail, Lock, User } from "lucide-react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default function NewUserPage() {

    async function createUser(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await prisma.user.create({
                data: {
                    name,
                    username,
                    email,
                    password: hashedPassword,
                },
            });
        } catch (error) {
            // Handle duplicate email etc.
            console.error(error);
            return;
        }

        redirect("/dashboard/users");
    }

    return (
        <div className="flex bg-muted/20 min-h-screen flex-col p-8 md:p-12 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/users" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Crear Administrador</h1>
                    <p className="text-muted-foreground">Otorga acceso al panel de control.</p>
                </div>
            </div>

            <form action={createUser} className="space-y-6">
                <div className="rounded-xl border bg-card p-8 shadow-md space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" /> Nombre Completo
                        </label>
                        <input
                            name="name"
                            id="name"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Ej. Juan Pérez"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" /> Nombre de Usuario
                        </label>
                        <input
                            name="username"
                            id="username"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Ej. juan.perez"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" /> Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="admin@kmj.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                            <Lock className="h-4 w-4 text-muted-foreground" /> Contraseña Temporal
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            minLength={6}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="******"
                        />
                        <p className="text-xs text-muted-foreground italic">
                            * Mínimo 6 caracteres. Se recomienda una mezcla de letras y números.
                        </p>
                    </div>

                    <button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-sm gap-2 mt-4">
                        <UserPlus className="h-4 w-4" /> Crear Nuevo Admin
                    </button>
                </div>
            </form>
        </div>
    );
}
