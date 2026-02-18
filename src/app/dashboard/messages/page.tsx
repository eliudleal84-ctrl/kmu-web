
import prisma from "@/lib/prisma";

export default async function MessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Buzón de Mensajes</h2>
                    <p className="text-muted-foreground">Consulta los mensajes enviados desde el formulario de contacto.</p>
                </div>
            </div>

            <div className="rounded-md border bg-card overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-muted/50 [&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Fecha</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nombre / Email</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Asunto</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Mensaje</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0 bg-background">
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                        No hay mensajes recibidos aún.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr key={msg.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle whitespace-nowrap text-muted-foreground">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                            <br />
                                            <span className="text-xs">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="p-4 align-middle font-medium">
                                            <div className="flex flex-col">
                                                <span>{msg.name}</span>
                                                <span className="text-xs text-muted-foreground">{msg.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                                                {msg.subject || "Sin Asunto"}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle max-w-[300px]">
                                            <p className="truncate" title={msg.message}>
                                                {msg.message}
                                            </p>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${msg.read ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/80'}`}>
                                                {msg.read ? 'Leído' : 'Nuevo'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
