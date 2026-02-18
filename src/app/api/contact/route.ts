import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';
import { ContactEmail } from "@/components/emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, lastname, email, subject, message } = body;

        // Basic validation
        if (!email || !message) {
            return NextResponse.json(
                { message: "El correo y el mensaje son obligatorios" },
                { status: 400 }
            );
        }

        // Combine name and lastname
        const fullName = lastname ? `${name} ${lastname}`.trim() : name || "Anónimo";
        const emailSubject = subject || "Consulta desde web";

        // 1. Save to database
        const savedMessage = await prisma.contactMessage.create({
            data: {
                name: fullName,
                email,
                subject: emailSubject,
                message,
                read: false
            }
        });

        // 2. Send email notification via Resend
        try {
            await resend.emails.send({
                from: 'KMJ Web <onboarding@resend.dev>',
                to: ['georche777@gmail.com'],
                subject: `Nuevo Mensaje Web: ${emailSubject}`,
                react: ContactEmail({
                    name: fullName,
                    email: email,
                    subject: emailSubject,
                    message: message,
                }) as React.ReactElement,
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            // We don't fail the request if email fails, but we log it. 
            // The message is safely in the DB.
        }

        return NextResponse.json(
            { message: "Mensaje enviado con éxito", id: savedMessage.id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { message: "Error interno del servidor al procesar tu solicitud." },
            { status: 500 }
        );
    }
}
