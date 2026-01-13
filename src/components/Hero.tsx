"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const totalFrames = 75;

    useEffect(() => {
        // Preload images
        const promises = [];
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
            promises.push(
                new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Continue even if one fails
                })
            );
            imagesRef.current[i - 1] = img;
        }

        Promise.all(promises).then(() => {
            // Initial render after loading
            const canvas = canvasRef.current;
            if (canvas) render(0, canvas);
        });

    }, []);

    const render = (progress: number, canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        // Calculate frame index
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(progress * totalFrames)
        );

        const img = imagesRef.current[frameIndex];

        if (img && img.complete) {
            // Draw image covering the canvas (object-cover equivalent)
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = w;
                drawHeight = w / imgRatio;
                offsetX = 0;
                offsetY = (h - drawHeight) / 2;
            } else {
                drawWidth = h * imgRatio;
                drawHeight = h;
                offsetX = (w - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(scrollYProgress.get(), canvas);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            requestAnimationFrame(() => render(latest, canvas));
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* Cinematic Name Overlay */}
                <motion.div
                    style={{ opacity, scale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-center drop-shadow-2xl">
                        Rishikesh R
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-muted-foreground uppercase tracking-[0.3em] font-light">
                        AI Consultant & Automation
                    </p>
                </motion.div>

                <div className="absolute bottom-10 left-0 right-0 flex justify-center pb-8 opacity-50 animate-bounce">
                    <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
                </div>
            </div>
        </div>
    );
}
