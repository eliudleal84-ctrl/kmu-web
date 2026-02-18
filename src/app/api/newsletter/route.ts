import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { message: "Email inválido" },
                { status: 400 }
            );
        }

        // Check if already exists
        const existing = await (prisma as any).subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json(
                { message: "Este correo ya está registrado" },
                { status: 400 }
            );
        }

        // Save to database
        await (prisma as any).subscriber.create({
            data: { email }
        });

        return NextResponse.json(
            { message: "Suscrito con éxito" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Newsletter error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
