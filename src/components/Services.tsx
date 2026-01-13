import { FadeIn } from "./FadeIn";
import { Boxes, Cpu, Zap } from "lucide-react";

const services = [
    {
        icon: <Cpu className="w-8 h-8 text-white" />,
        title: "AI Strategy Consulting",
        description: "I analyze your workflows to identify high-value opportunities for AI implementation, ensuring maximize ROI.",
    },
    {
        icon: <Boxes className="w-8 h-8 text-white" />,
        title: "Custom Agent Systems",
        description: "Building autonomous agents that handle customer support, lead generation, and data analysis 24/7.",
    },
    {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: "Process Automation",
        description: "Connecting your existing tools (CRM, Email, Slack) into seamless, self-driving pipelines.",
    },
];

export default function Services() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">How I Help</h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-white/10 transition-colors duration-500 group">
                        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
