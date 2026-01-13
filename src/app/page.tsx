import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Spacer for Content Sections */}
      <section className="relative z-10 bg-background py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">

        {/* What I Do - Placeholder */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">What I Do</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I build intelligent systems that help companies automate workflows, reduce costs, and scale revenue.
              From custom AI agents to end-to-end automation pipelines.
            </p>
          </div>
          <div className="h-64 bg-muted rounded-2xl border border-white/10" />
        </div>

        {/* How I Help - Placeholder */}
        <div>
          <h2 className="text-4xl font-bold mb-12 text-center">How I Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted/30 border border-white/5 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-lg mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Service {i}</h3>
                <p className="text-muted-foreground">Detailed description of how this service adds value to your business.</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer className="py-12 text-center text-muted-foreground border-t border-white/5">
        <p>© {new Date().getFullYear()} Rishikesh R. All rights reserved.</p>
      </footer>
    </main>
  );
}
