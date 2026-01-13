import { FadeIn } from "./FadeIn";

export default function Contact() {
    return (
        <section className="py-32 px-6 md:px-12 text-center">
            <FadeIn>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                    Ready to Scale?
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
                    Let's build a system that saves you time and makes you money.
                </p>
                <a
                    href="mailto:contact@rishikesh.com" // Placeholder
                    className="inline-block bg-white text-black text-lg px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95"
                >
                    Book a Strategy Call
                </a>
            </FadeIn>

            <div className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Rishikesh R.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Email</a>
                </div>
            </div>
        </section>
    );
}
