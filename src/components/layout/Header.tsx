"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

type NavigationItem = {
    name: string;
    href: string;
    primary?: boolean;
};

const navigation: NavigationItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/about" },
    { name: "Empresas", href: "/services/empresas" },
    { name: "Consultorio", href: "/services/terapia" },
    { name: "Cursos", href: "/courses" },
    { name: "Recursos", href: "/resources" },
    { name: "Contacto", href: "/contact" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Determine the logo to show
    const logoSrc = mounted && resolvedTheme === "light"
        ? "/images/logo-dark-version.png"
        : "/images/logo.png";

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 hover:opacity-80 transition-opacity">
                        <span className="sr-only">KMJ Consultoría</span>
                        <Image
                            src={logoSrc}
                            alt="KMJ Consultoría Gestáltica"
                            width={220}
                            height={90}
                            className="h-20 w-auto object-contain transition-all duration-300"
                            priority
                        />
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-semibold leading-6 transition-colors duration-200",
                                item.primary
                                    ? "bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 shadow-sm"
                                    : "text-foreground/80 hover:text-primary"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pl-4 border-l border-border/40 flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-accent"
                            title="Panel de Control"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="flex lg:hidden items-center gap-x-4">
                    <Link
                        href="/dashboard"
                        className="text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                        <Settings className="h-5 w-5" />
                    </Link>
                    <ThemeToggle />
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                    </button>
                </div>
            </nav>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1 px-6 pb-6 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-accent/10 transition-colors",
                                    item.primary ? "text-primary font-bold" : "text-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
