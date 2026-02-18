
import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Intenta leer la clave del proceso
const apiKey = process.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

export async function GET() {
    try {
        if (!apiKey) {
            return NextResponse.json({
                success: false,
                message: "No se encontró RESEND_API_KEY. ¿Configuraste la variable en Vercel?",
                hasApiKey: false
            }, { status: 500 });
        }

        const data = await resend.emails.send({
            from: 'KMJ Test <onboarding@resend.dev>',
            to: ['georche777@gmail.com'],
            subject: 'Prueba de Emails KMJ',
            html: '<p>Este es un correo de prueba para verificar la configuración de Resend.</p>'
        });

        if (data.error) {
            return NextResponse.json({
                success: false,
                message: "Resend devolvió un error.",
                error: data.error,
                hasApiKey: true
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Correo enviado correctamente.",
            data: data,
            hasApiKey: true
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error interno al intentar enviar.",
            error: error.message,
            stack: error.stack,
            hasApiKey: !!apiKey
        }, { status: 500 });
    }
}
