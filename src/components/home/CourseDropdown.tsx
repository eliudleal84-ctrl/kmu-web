"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
    id: string;
    title: string;
    date: Date | string;
}

interface CourseDropdownProps {
    courses: Course[];
}

export function CourseDropdown({ courses }: CourseDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (courses.length === 0) {
        return (
            <Link href="/courses" className="flex items-center text-primary font-medium group-hover:underline">
                Ver calendario <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 text-primary font-bold transition-all hover:scale-105",
                    isOpen ? "opacity-70" : "opacity-100"
                )}
            >
                Próximos Talleres <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-72 bg-card border border-border rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-2 z-50">
                    <div className="max-h-64 overflow-y-auto space-y-1">
                        <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 mb-1">
                            Eventos Programados
                        </div>
                        {courses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.id}`}
                                className="flex flex-col gap-1 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors group/item"
                            >
                                <span className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                                    {course.title}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-semibold">
                                    <Clock className="h-3 w-3" />
                                    {new Date(course.date).toLocaleDateString("es-MX", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/50">
                        <Link
                            href="/courses"
                            className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-all"
                        >
                            Ver todo el calendario <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
