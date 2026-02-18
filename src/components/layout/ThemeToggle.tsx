"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Wait until mounted to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-accent animate-in fade-in zoom-in duration-300" />
            ) : (
                <Moon className="h-5 w-5 text-primary animate-in fade-in zoom-in duration-300" />
            )}
        </button>
    )
}
