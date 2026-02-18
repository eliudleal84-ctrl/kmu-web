import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lock, User, AlertCircle } from "lucide-react";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const error = params.error as string;

    async function login(formData: FormData) {
        "use server";

        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const user = await prisma.user.findUnique({
            where: { username } as any,
        });

        if (!user) {
            redirect("/login?error=Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            redirect("/login?error=Invalid credentials");
        }

        // Simple session cookie (for dev/test purposes)
        // In a production app, use JWT or a proper session library
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-background via-secondary/10 to-primary/5 p-4">
            <div className="w-full max-w-md space-y-8 bg-card border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

                <div className="text-center space-y-2 relative z-10">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Acceso Administrativo</h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold italic">KMJ Consultoría</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">Credenciales incorrectas. Intenta de nuevo.</p>
                    </div>
                )}

                <form action={login} className="mt-8 space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-bold text-foreground/80 ml-1 uppercase tracking-tight">Usuario</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Introduce tu usuario"
                                    className="block w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-bold text-foreground/80 ml-1 uppercase tracking-tight">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="block w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                        Iniciar Sesión
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </form>

                <p className="text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} KMJ Consultoría Gestáltica. <br />
                    Sistema de gestión privado.
                </p>
            </div>
        </div>
    );
}
