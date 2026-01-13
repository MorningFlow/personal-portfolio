"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Premium ease
            viewport={{ once: true, margin: "-10%" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
