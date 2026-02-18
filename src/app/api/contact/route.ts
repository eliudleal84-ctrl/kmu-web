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
        let emailResult;
        try {
            console.log("Intentando enviar correo a georche777@gmail.com...");
            const data = await resend.emails.send({
                from: 'KMJ Web <notificaciones@kmjgestalt.com>',
                to: ['georche777@gmail.com'],
                subject: `Nuevo Mensaje Web: ${emailSubject}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h1 style="color: #4F46E5;">Nuevo Mensaje de Contacto</h1>
                        <p>Has recibido un nuevo mensaje desde el formulario de tu sitio web.</p>
                        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
                            <p><strong>Nombre:</strong> ${fullName}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Asunto:</strong> ${emailSubject}</p>
                            <div style="margin-top: 15px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                                <p style="font-weight: bold;">Mensaje:</p>
                                <p style="white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                    </div>
                `,
            });
            emailResult = data;

            if (data.error) {
                console.error("Resend API returned error:", data.error);
                // Si falla el correo, lo informamos aunque se haya guardado en DB
                return NextResponse.json(
                    {
                        message: "Mensaje guardado, pero hubo un error enviando la notificación.",
                        dbDetails: savedMessage,
                        emailError: data.error
                    },
                    { status: 200 } // Mantenemos 200 porque se guardó el lead, pero avisamos.
                );
            }

        } catch (emailError: any) {
            console.error("Excepción enviando email:", emailError);
            return NextResponse.json(
                {
                    message: "Mensaje guardado, pero falló el envío del correo.",
                    dbDetails: savedMessage,
                    emailError: emailError.message
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "Mensaje enviado y notificado con éxito", id: savedMessage.id, emailId: emailResult?.data?.id },
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
