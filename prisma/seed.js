const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Empezando la siembra de datos...');

    // 1. Crear Usuario Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@kmj.com' },
        update: {},
        create: {
            email: 'admin@kmj.com',
            username: 'admin',
            name: 'Admin KMJ',
            password: hashedPassword,
        },
    });
    console.log(`👤 Usuario Admin creado: ${admin.email}`);

    // 2. Crear un Artículo de Blog de Ejemplo
    const article = await prisma.article.upsert({
        where: { slug: 'bienvenida-a-kmj' },
        update: {},
        create: {
            title: 'Bienvenidos al nuevo Blog de KMJ',
            slug: 'bienvenida-a-kmj',
            excerpt: 'Iniciamos una nueva etapa digital para compartir herramientas de Gestalt y Liderazgo.',
            content: '<p>Estamos muy emocionados de lanzar nuestra nueva plataforma digital. Aquí encontrarás recursos sobre liderazgo, manejo de estrés y crecimiento personal.</p>',
            category: 'Noticias',
            published: true,
            authorId: admin.id,
        },
    });
    console.log(`📝 Artículo creado: ${article.title}`);

    // 3. Crear un Curso de Ejemplo
    const course = await prisma.course.create({
        data: {
            title: 'Taller: Sanando al Niño Interior',
            description: 'Un viaje profundo para reconectar con tu esencia.',
            date: new Date('2026-11-15T10:00:00Z'),
            location: 'Centro KMJ, Monterrey',
            price: 1500,
            published: true,
        },
    });
    console.log(`🎓 Curso creado: ${course.title}`);

    // 4. Crear un Video de Prueba
    await prisma.article.create({
        data: {
            title: 'Video: Introducción a la Gestalt',
            slug: 'video-intro-gestalt',
            category: 'Psicoeducación',
            type: 'VIDEO',
            resourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            content: 'Este es un video de prueba para verificar el sistema.',
            published: true,
        }
    });
    console.log('🎥 Video de prueba creado.');

    console.log('✅ Base de datos sembrada correctamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
