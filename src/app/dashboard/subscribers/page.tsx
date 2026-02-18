import prisma from "@/lib/prisma";
import { Users, Mail, Calendar, Trash2 } from "lucide-react";

export default async function SubscribersPage() {
    const subscribers = await (prisma as any).subscriber.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" /> Comunidad y Suscriptores
                    </h1>
                    <p className="text-muted-foreground text-lg">Gestiona la base de datos de personas interesadas en KMJ.</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
                    {subscribers.length} Suscriptores totales
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/50 border-b">
                            <th className="px-6 py-4 font-bold text-sm text-muted-foreground uppercase">Email</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted-foreground uppercase">Fecha de Registro</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted-foreground uppercase">Estado</th>
                            <th className="px-6 py-4 font-bold text-sm text-muted-foreground uppercase text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {subscribers.length > 0 ? (
                            subscribers.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3 font-medium">
                                        <Mail className="h-4 w-4 text-primary/60" />
                                        {sub.email}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(sub.createdAt).toLocaleDateString("es-MX", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${sub.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {sub.active ? "ACTIVO" : "INACTIVO"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                    Aún no hay suscriptores en la base de datos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
