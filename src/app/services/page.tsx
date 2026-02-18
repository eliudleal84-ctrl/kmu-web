import { CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            title: "Terapia Individual",
            description: "Sesiones personalizadas para abordar temas específicos de tu vida personal y emocional.",
            price: "Consultar",
        },
        {
            title: "Terapia de Pareja",
            description: "Espacio para mejorar la comunicación y resolver conflictos en la relación.",
            price: "Consultar",
        },
        {
            title: "Talleres Grupales",
            description: "Experiencias vivenciales en grupo para el aprendizaje y crecimiento compartido.",
            price: "Ver Calendario",
        },
        {
            title: "Consultoría Organizacional",
            description: "Intervenciones en empresas promoviendo un ambiente laboral saludable y productivo.",
            price: "Cotizar",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">Nuestros Servicios</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ofrecemos una variedad de modalidades terapéuticas y de consultoría adaptadas a tus necesidades.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div key={service.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex items-center text-primary font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {service.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
