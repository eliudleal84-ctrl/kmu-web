"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Users,
    Settings,
    FileText,
    Video,
    LogOut,
    ExternalLink,
    MessageSquare,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/dashboard/logout-action";

const sidebarItems = [
    { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
    { name: "Mensajes", href: "/dashboard/messages", icon: Mail },
    { name: "Artículos y Blog", href: "/dashboard/blog", icon: BookOpen },
    { name: "Cursos y Talleres", href: "/dashboard/courses", icon: Calendar },
    { name: "Testimonios", href: "/dashboard/testimonials", icon: MessageSquare },
    { name: "Comunidad", href: "/dashboard/subscribers", icon: Users },
    { name: "Usuarios Admin", href: "/dashboard/users", icon: Users },
    { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
            <div className="flex h-16 items-center px-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl font-bold text-primary">KMJ Admin</span>
                </Link>
            </div>

            <div className="flex-1 overflow-auto py-6 px-4">
                <nav className="grid items-start gap-2 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t p-4">
                <div className="grid gap-1">
                    <Link
                        href="/"
                        target="_blank"
                        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                    >
                        <ExternalLink className="h-4 w-4" /> Ver Sitio Web
                    </Link>
                    <button
                        onClick={() => logout()}
                        className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
                    >
                        <LogOut className="h-4 w-4" /> Cerrar Sesión
                    </button>
                </div>
            </div>
        </aside>
    );
}
