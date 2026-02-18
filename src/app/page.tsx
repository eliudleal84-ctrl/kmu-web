import Link from "next/link";
import { CheckCircle2, Building2, Users, BookOpen, ArrowRight, Quote, Star, GraduationCap, Award, FileCheck } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import prisma from "@/lib/prisma";
import { CredentialsModal } from "@/components/home/CredentialsModal";
import { CourseDropdown } from "@/components/home/CourseDropdown";

export default async function Home() {
  // Obtener contenido dinámico
  const pageContent = await (prisma.pageContent.findUnique({
    where: { id: "main" }
  }) as any);

  // Valores por defecto por si no existe aún el registro
  const heroTitle = pageContent?.heroTitle || "Desarrollo Humano y Gestalt Integral";
  const heroSubtitle = pageContent?.heroSubtitle || "Descubre un enfoque transformador para tu vida, tu equipo y tu carrera. Impulsamos el crecimiento auténtico.";
  const aboutTitle = pageContent?.aboutTitle || "Nuestra Misión";
  const visionText = pageContent?.visionText || "Ser un referente en el norte de México en el desarrollo humano aplicado al ámbito organizacional y personal, integrando experiencia industrial y psicoterapia gestáltica para generar culturas laborales más conscientes, relaciones más saludables y procesos de transformación profunda en individuos y empresas.";
  const misionText = pageContent?.misionText || "Brindar acompañamiento profesional a personas, líderes y organizaciones mediante consultoría organizacional, capacitación y psicoterapia Gestalt, promobiendo el desarrollo humano, la conciencia emocional y el bienestar integral desde un enfoque ético, vivencial y humanista.";

  // Fetch published courses for the dropdown
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { date: 'asc' },
    select: { id: true, title: true, date: true }
  });

  return (
    <div className="flex flex-col items-center">
      {/* 1. Propuesta de Valor (Hero Section) */}
      <section className="relative w-full py-24 lg:py-32 xl:py-40 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-secondary/20 -z-20" />
        <ParticleBackground />

        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center space-y-8 relative z-10">
          <div className="space-y-4 max-w-5xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl/none text-primary animate-in fade-in slide-in-from-bottom-4 duration-700 whitespace-pre-line">
              {heroTitle}
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              {heroSubtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <Link
              href="/contact?type=cita"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              Agendar Sesión
            </Link>
            <Link
              href="/contact?type=cotizacion"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary bg-background px-8 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-accent"
            >
              Solicitar Cotización Empresas
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Accesos Rápidos */}
      <section className="w-full py-16 bg-background/50 border-y border-border/10">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-primary uppercase tracking-widest">Nuestras Soluciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl bg-secondary/10 p-8 transition-all hover:bg-secondary/20 border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Para Empresas</h3>
              <p className="text-muted-foreground mb-6">Consultoría organizacional, clima laboral y liderazgo consciente.</p>
              <Link href="/services/empresas" className="flex items-center text-primary font-medium group-hover:underline">
                Ver soluciones <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-secondary/10 p-8 transition-all hover:bg-secondary/20 border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Consultorio</h3>
              <p className="text-muted-foreground mb-6">Terapia individual, de pareja y familiar con enfoque Gestalt.</p>
              <Link href="/services/terapia" className="flex items-center text-primary font-medium group-hover:underline">
                Ir a terapia <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group relative rounded-2xl bg-secondary/10 p-8 transition-all hover:bg-secondary/20 border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cursos y Talleres</h3>
              <p className="text-muted-foreground mb-6">Formación continua y talleres vivenciales para el desarrollo.</p>
              <CourseDropdown courses={courses} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sección "Nosotros" Administrable */}
      <section id="nosotros" className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium uppercase tracking-wider">
                KMJ Consultoría
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-primary">
                {aboutTitle}
              </h2>
              <div className="space-y-8 pt-4">
                <div className="space-y-4">

                  <h2 className="text-2xl font-bold text-primary uppercase tracking-wider">
                    Visión
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {visionText}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <h2 className="text-2xl font-bold text-primary uppercase tracking-wider">
                    Misión
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {misionText}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-primary/5 shadow-2xl border border-primary/20 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0" />
              <img
                src="/images/nosotros.jpg"
                alt="KMJ Consultoría - Nuestra Misión"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Respaldo Profesional - Subtly Integrated */}
      <section className="w-full py-12 bg-background border-b border-border/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
            <div className="text-center md:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 mb-1">Trayectoria</h3>
              <p className="text-lg font-semibold text-foreground italic">Sustento Ético y Profesional</p>
              <CredentialsModal />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary/70" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Psicoterapia Gestalt</h4>
                  <p className="text-[10px] text-muted-foreground uppercase leading-none">Maestría Acreditada</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Award className="h-5 w-5 text-primary/70" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Liderazgo & Consultoría</h4>
                  <p className="text-[10px] text-muted-foreground uppercase leading-none">Especialidad Industrial</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                  <FileCheck className="h-5 w-5 text-primary/70" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Cédula Profesional</h4>
                  <p className="text-[10px] text-muted-foreground uppercase leading-none">Registro Federal de Salud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonios Breves */}
      <section className="w-full py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest opacity-90">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(await prisma.testimonial.findMany({
              where: { published: true },
              take: 3,
              orderBy: { createdAt: 'desc' }
            })).map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary fill-secondary" />
                  ))}
                  {[...Array(5 - t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-white/20" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-secondary mb-4 mx-auto opacity-80" />
                <p className="italic mb-6 text-white/90 text-lg line-clamp-4">
                  "{t.content}"
                </p>
                <div className="mt-auto">
                  <div className="font-bold text-secondary uppercase text-xs tracking-widest">-{t.name}</div>
                  {t.role && <div className="text-[10px] text-white/50 uppercase mt-1">{t.role}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Enlace a Google Reviews */}
          <div className="mt-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <a
              href="https://share.google/YCnvqVqFscDd9BQa9"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400 group-hover:animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <span className="text-white/90 font-medium tracking-wide">
                Ver opiniones reales en <span className="text-secondary font-bold">Google</span>
              </span>
              <ArrowRight className="h-4 w-4 text-secondary group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-4 text-white/40 text-xs uppercase tracking-[0.2em]">
              Transparencia y confianza en cada proceso
            </p>
          </div>
        </div>
      </section>

      {/* 5. Llamado a Acción Final */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            ¿Listo para comenzar tu proceso?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora nuestros recursos, talleres o agenda una cita hoy mismo.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/resources"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              Ver Recursos y Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
