"use client";
import { FadeIn } from "./FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
    {
        title: "Automated Sales Pipeline",
        category: "Make.com & OpenAI",
        description: "A fully autonomous outbound system that qualified 500+ leads in 2 weeks.",
    },
    {
        title: "Customer Support Agent",
        category: "LLM & Vector DB",
        description: "Reduced human support ticket volume by 70% for a SaaS client.",
    },
    {
        title: "Content Repurposing Engine",
        category: "Video AI",
        description: "System to turn 1 YouTube video into 20 social assets automatically.",
    },
];

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-32 px-6 md:px-12 bg-secondary/10" ref={containerRef}>
            <div className="max-w-7xl mx-auto">
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Systems</h2>
                            <p className="text-xl text-muted-foreground">Engineering efficiency for modern businesses.</p>
                        </div>
                        <button className="px-6 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 mt-6 md:mt-0">
                            View All Work
                        </button>
                    </div>
                </FadeIn>

                <div className="space-y-32">
                    {projects.map((project, i) => (
                        <div key={i} className="group relative grid md:grid-cols-2 gap-12 items-center">
                            <FadeIn delay={0.2} className={`order-2 ${i % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                                <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden relative border border-white/5">
                                    {/* Placeholder for project image */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-muted to-secondary group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-mono opacity-20 group-hover:opacity-40 transition-opacity">
                                        0{i + 1}
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0} className={`order-1 ${i % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                                <span className="text-primary/50 text-sm tracking-widest uppercase mb-4 block">{project.category}</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    {project.description}
                                </p>
                                <a href="#" className="inline-flex items-center text-white border-b border-white pb-1 group-hover:border-white/50 transition-colors">
                                    Read Case Study
                                </a>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
