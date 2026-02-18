import Link from "next/link";
import { CheckCircle2, ArrowRight, User, Users, Heart, Brain, HelpingHand, MessageCircle, Clock, ChevronDown } from "lucide-react";

export default function TherapyServicesPage() {
    return (
        <div className="flex flex-col items-center">
            {/* 1. Hero Section - Consultorio */}
            <section className="w-full py-20 bg-gradient-to-b from-background to-secondary/10">
                <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                        Consultorio Gestáltico
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                        Un Espacio Seguro para <br className="hidden sm:inline" /> Reconstruirte con Conciencia
                    </h1>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                        Psicoterapia Gestalt orientada al darse cuenta, la regulación emocional y la responsabilidad personal, para atravesar crisis, ansiedad o procesos de cambio con claridad y firmeza interior.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact?type=cita"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                            Agendar Cita
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Servicios de Terapia (Grid) */}
            <section className="w-full py-20 bg-background">
                <div className="container px-4 md:px-6 mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Áreas de Atención Terapéutica</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Abordamos el malestar emocional desde la Psicoterapia Gestalt, centrados en el aquí y ahora, promoviendo conciencia, responsabilidad y contacto auténtico.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Terapia Individual */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <User className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">Terapia Individual</h3>
                            <p className="text-muted-foreground text-sm">Espacio personal para trabajar ansiedad, depresión, procesos de crisis, autoestima y autoconocimiento, fortaleciendo tu capacidad de regulación emocional y responsabilidad personal.</p>
                        </div>
                        {/* Terapia para Adolescentes */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <Brain className="h-10 w-10 text-purple-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Terapia para Adolescentes</h3>
                            <p className="text-muted-foreground text-sm">Acompañamiento en procesos de identidad, regulación emocional y toma de decisiones en una etapa de transición y formación.</p>
                        </div>
                        {/* Terapia de Pareja */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <Heart className="h-10 w-10 text-rose-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Terapia de Pareja</h3>
                            <p className="text-muted-foreground text-sm">Acompañamiento para comprender dinámicas relacionales, mejorar la comunicación y decidir con conciencia si el camino es reconstrucción o cierre saludable.</p>
                        </div>
                        {/* Terapia de Adicciones */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <HelpingHand className="h-10 w-10 text-emerald-600 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Terapia de Adicciones</h3>
                            <p className="text-muted-foreground text-sm">Abordaje especializado en conductas compulsivas y dependencia emocional o química, enfocado en conciencia, responsabilidad y prevención de recaídas</p>
                        </div>
                        {/* Terapia Familiar */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <Users className="h-10 w-10 text-amber-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Terapia Familiar</h3>
                            <p className="text-muted-foreground text-sm">Intervención orientada a identificar patrones de interacción, restaurar límites y favorecer vínculos más funcionales y respetuosos.</p>
                        </div>
                        {/* Acompañamiento en Crisis y Duelo */}
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <MessageCircle className="h-10 w-10 text-cyan-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Acompañamiento en Crisis y Duelo</h3>
                            <p className="text-muted-foreground text-sm">Apoyo terapéutico en momentos de pérdida, ruptura o cambio significativo, facilitando procesos de integración y cierre.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Talleres Vivenciales (Nueva Sección) */}
            <section className="w-full py-24 bg-muted/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32 blur-3xl opacity-50" />
                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium uppercase tracking-widest">
                            Experiencias Grupales
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">Talleres Vivenciales</h2>
                        <p className="text-muted-foreground text-lg">
                            Espacios grupales orientados al autoconocimiento y la transformación personal desde la Psicoterapia Gestalt.
                            Trabajamos el darse cuenta, la expresión emocional y la responsabilidad personal en un entorno seguro y respetuoso.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Niño Interior */}
                        <div className="group p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <span className="text-3xl">🌿</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Niño Interior</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Exploración y resignificación de experiencias tempranas que influyen en la vida adulta, fortaleciendo autoestima y madurez emocional.
                            </p>
                        </div>

                        {/* Contacto y Conciencia */}
                        <div className="group p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <span className="text-3xl">🌿</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Contacto y Conciencia</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Experiencias centradas en el aquí y ahora para reconocer patrones de conducta y mejorar la forma de relacionarte.
                            </p>
                        </div>

                        {/* Constelaciones */}
                        <div className="group p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <span className="text-3xl">🌿</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Constelaciones</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Exploración de dinámicas familiares y patrones relacionales que impactan el presente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. ¿Te Está Pasando Esto? (Anterior Problemas Frecuentes) */}
            <section className="w-full py-24 bg-muted/40">
                <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative group">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                        <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-card">
                            <img
                                src="/images/malestar-emocional.jpg"
                                alt="Emotional unrest and personal dissatisfaction"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100 dark:brightness-75 dark:group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-10 left-10 right-10">
                                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Reflejo Interior</p>
                                <p className="text-white text-xl font-light italic leading-relaxed">
                                    "La incomodidad es el primer paso hacia el darse cuenta."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-12">
                        <div className="space-y-4">
                            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium uppercase tracking-widest">
                                Autoconocimiento
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-foreground">¿Te Está Pasando <span className="text-primary italic">Esto?</span></h2>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 group/item">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                                    <span className="text-xl">1</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-foreground">Vives en estado de alerta constante</h4>
                                    <p className="text-muted-foreground leading-relaxed">Tu cuerpo permanece tenso, tu mente no descansa y te cuesta relajarte incluso cuando “todo está bien”.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group/item">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                                    <span className="text-xl">2</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-foreground">Te cuesta cerrar ciclos</h4>
                                    <p className="text-muted-foreground leading-relaxed">Una ruptura, una pérdida o un cambio siguen presentes como si no terminaran de resolverse dentro de ti.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group/item">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                                    <span className="text-xl">3</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-foreground">Estás agotado, aunque duermas</h4>
                                    <p className="text-muted-foreground leading-relaxed">Sientes desgaste físico y emocional, irritabilidad o dificultad para disfrutar lo que antes te motivaba.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group/item">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                                    <span className="text-xl">4</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-foreground">Te sientes desconectado</h4>
                                    <p className="text-muted-foreground leading-relaxed">Cumples con tus responsabilidades, pero algo dentro se siente vacío o sin dirección.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group/item">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                                    <span className="text-xl">5</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-foreground">Reaccionas de forma automática</h4>
                                    <p className="text-muted-foreground leading-relaxed">Te descubres diciendo o haciendo cosas que luego cuestionas, como si no tuvieras control pleno de tus respuestas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Información de la Sesión + FAQ + Modalidades */}
            <section className="w-full py-24 bg-background">
                <div className="container px-4 md:px-6 mx-auto max-w-5xl">

                    {/* Estructura de la Sesión */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-24">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold flex items-center gap-3">
                                    <Clock className="h-8 w-8 text-primary" />
                                    ¿Cómo es una sesión?
                                </h2>
                                <p className="text-xl font-medium text-primary">Las sesiones tienen una duración de 50 minutos.</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Es un espacio de trabajo centrado en el <span className="text-primary font-bold italic">aquí y ahora</span>, donde exploramos lo que estás viviendo actualmente y cómo lo experimentas en tu cuerpo, tus emociones y tus decisiones.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    No se trata de interpretar tu historia, sino de ampliar tu conciencia sobre lo que te ocurre en el presente.
                                </p>
                            </div>

                            <div className="p-8 bg-muted/30 rounded-3xl border border-border space-y-4">
                                <h3 className="text-xl font-bold">Un espacio claro y seguro</h3>
                                <p className="text-sm text-muted-foreground mb-4">La sesión se desarrolla bajo principios fundamentales:</p>
                                <ul className="space-y-3">
                                    {[
                                        "Confidencialidad absoluta, salvo situaciones donde exista riesgo para tu integridad o la de otros.",
                                        "Respeto mutuo y trato digno.",
                                        "Responsabilidad personal: trabajamos hablando en primera persona y enfocándonos en lo que tú experimentas.",
                                        "Presencia y contacto: evitamos distracciones (alimentos, dispositivos o estímulos que interfieran en el proceso)."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-foreground/80">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 bg-card rounded-3xl border border-primary/20 shadow-sm space-y-6">
                                <h3 className="text-2xl font-bold text-primary">¿Qué puedes esperar?</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                        <p className="text-muted-foreground"><span className="text-foreground font-medium">Acompañamiento profesional</span>, directo y sin juicios.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                        <p className="text-muted-foreground">Un enfoque basado en el <span className="text-foreground font-medium">darse cuenta</span>, no en interpretaciones externas.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                        <p className="text-muted-foreground"><span className="text-foreground font-medium">Claridad en acuerdos</span>, asistencia y compromiso con el proceso.</p>
                                    </li>
                                    <li className="mt-6 pt-6 border-t border-border text-sm italic text-muted-foreground">
                                        Al inicio del proceso se exploran aspectos importantes de tu historia, estado de salud y seguridad emocional para asegurar un acompañamiento adecuado y responsable.
                                    </li>
                                </ul>
                            </div>

                            {/* Modalidades */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-6 bg-background border border-border rounded-2xl">
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        Online
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        A través de videollamada segura (Zoom/Meet), desde donde estés.
                                    </p>
                                </div>
                                <div className="p-6 bg-background border border-border rounded-2xl">
                                    <h4 className="font-bold mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
                                        Presencial
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        En nuestro consultorio en <span className="font-semibold text-foreground">Escobedo</span> y <span className="font-semibold text-foreground">Barrio Antiguo</span> (Solo los jueves).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
                            <p className="text-muted-foreground">Todo lo que necesitas saber sobre el proceso terapéutico.</p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                {
                                    q: "¿Cuánto dura un proceso de terapia?",
                                    a: "No existe una duración estándar, ya que cada proceso es único y depende de tus objetivos, tu nivel de compromiso y la naturaleza de lo que deseas trabajar.\n\nAlgunas personas buscan acompañamiento puntual para atravesar una crisis específica; otras deciden profundizar en patrones emocionales o relacionales más complejos.\n\nLa Psicoterapia Gestalt está orientada a fortalecer tu auto-apoyo y tu capacidad de autorregulación, por lo que el objetivo no es generar dependencia, sino promover autonomía y responsabilidad personal."
                                },
                                {
                                    q: "¿Con qué frecuencia son las sesiones?",
                                    a: "Generalmente se recomienda una sesión semanal, especialmente al inicio del proceso, para dar continuidad y profundidad al trabajo terapéutico.\n\nCon el tiempo, la frecuencia puede ajustarse según avances, necesidades y objetivos acordados."
                                },
                                {
                                    q: "¿Aceptas seguros médicos?",
                                    a: "El servicio se brinda de manera particular.\n\nSe pueden emitir facturas para que, en caso de que tu póliza lo contemple, puedas gestionar el reembolso directamente con tu aseguradora.\n\nSe recomienda consultar previamente las condiciones de tu seguro."
                                },
                                {
                                    q: "¿Qué pasa si no puedo asistir a mi cita?",
                                    a: "Las sesiones requieren compromiso y preparación previa.\n\nSi necesitas reagendar, se solicita avisar con al menos 24 horas de anticipación para evitar el cobro de la sesión.\n\nLas cancelaciones con menor anticipación pueden generar el cargo correspondiente, salvo situaciones de emergencia."
                                },
                                {
                                    q: "¿La información que comparto es confidencial?",
                                    a: "Sí. Todo lo que se trabaja en sesión es confidencial.\n\nSolo existen excepciones éticas y legales en casos donde se detecte riesgo para tu integridad o la de terceros, lo cual siempre se abordaría con claridad y responsabilidad profesional."
                                },
                                {
                                    q: "¿La terapia es solo para personas con “problemas graves”?",
                                    a: "No. Muchas personas acuden a terapia no solo para resolver crisis, sino para mejorar su autoconocimiento, fortalecer relaciones, tomar decisiones importantes o atravesar procesos de cambio con mayor claridad.\n\nLa terapia es un espacio de crecimiento, no únicamente de emergencia."
                                },
                                {
                                    q: "¿Cómo sé si este enfoque es adecuado para mí?",
                                    a: "Este enfoque puede ser adecuado si estás dispuesto a mirarte con honestidad, hablar en primera persona y asumir responsabilidad sobre lo que sientes y haces.\n\nLa Psicoterapia Gestalt no se centra únicamente en analizar el pasado ni en recibir consejos, sino en ampliar tu conciencia sobre lo que ocurre en tu experiencia presente.\n\nSi buscas un espacio profesional, directo y respetuoso para comprender tus patrones emocionales y relacionales, este proceso puede ser para ti."
                                },
                                {
                                    q: "¿Qué diferencia este acompañamiento de otras terapias?",
                                    a: "El trabajo está centrado en el aquí y ahora.\n\nNo se trata de interpretar tu vida, sino de que tú mismo desarrolles mayor claridad sobre lo que experimentas en tu cuerpo, tus emociones y tus decisiones.\n\nIntegro el enfoque gestáltico con herramientas complementarias cuando el proceso lo requiere, manteniendo siempre un marco profesional, ético y orientado a fortalecer tu autoapoyo y regulación emocional.\n\nEl objetivo no es que dependas del terapeuta, sino que desarrolles mayor conciencia, coherencia y responsabilidad personal."
                                },
                                {
                                    q: "¿Qué necesito para iniciar?",
                                    a: "Solo necesitas la disposición de trabajar contigo mismo y agendar una primera sesión.\n\nEn el primer encuentro revisaremos el motivo de consulta, aclararemos expectativas, estableceremos acuerdos de trabajo y resolveremos cualquier duda sobre el proceso.\n\nNo es necesario “estar en crisis” para comenzar; basta con reconocer que algo en tu vida merece atención y conciencia.\n\nSi decides iniciar, el compromiso principal será tu presencia y responsabilidad dentro del proceso."
                                }
                            ].map((faq, idx) => (
                                <details key={idx} className="group border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/30 open:bg-muted/30">
                                    <summary className="font-bold text-lg cursor-pointer flex justify-between items-center list-none">
                                        {faq.q}
                                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="w-full py-16 bg-primary/10 text-center border-t border-primary/20">
                <div className="container px-4 md:px-6 mx-auto space-y-6">
                    <h2 className="text-3xl font-bold">Da el primer paso</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Agenda tu primera sesión y comienza a trabajar en aquello que hoy requiere tu atención.
                    </p>
                    <Link
                        href="/contact?type=cita"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                    >
                        Agendar Cita
                    </Link>
                </div>
            </section>
        </div>
    );
}
