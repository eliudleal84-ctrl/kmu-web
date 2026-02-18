
import * as React from 'react';

interface ContactEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
    name,
    email,
    subject,
    message,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
        <h1 style={{ color: '#4F46E5' }}>Nuevo Mensaje de Contacto</h1>
        <p>Has recibido un nuevo mensaje desde el formulario de tu sitio web.</p>

        <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '20px' }}>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Asunto:</strong> {subject}</p>

            <div style={{ marginTop: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
                <p style={{ fontWeight: 'bold' }}>Mensaje:</p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            </div>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#6b7280' }}>
            <p>Este correo fue generado automáticamente desde <a href="https://kmjgestalt.com">kmjgestalt.com</a>.</p>
        </div>
    </div>
);
