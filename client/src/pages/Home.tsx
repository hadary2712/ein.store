import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { ProductGrid } from '@/components/home/ProductGrid';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { motion } from 'framer-motion';
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email });
      if (error) {
        console.error("Supabase newsletter insert error:", error);
        throw error;
      }
      setStatus("success");
      setEmail("");
    } catch (_err) {
      setStatus("error");
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero />
        
        {/* Top products (max 3) */}
        <ProductGrid />

        {/* Quality / materials section */}
        <section className="py-20 md:py-28 bg-secondary/40 border-y border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display">
                Crafted from considered, enduring materials.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Each EÍN kuftan is cut from premium, breathable fabrics chosen for their drape,
                softness, and longevity. Our atelier partners finish every seam by hand,
                ensuring the pieces move with you and feel effortless from day to night.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We work in small batches to minimise waste and maintain uncompromising quality
                standards—so every piece that reaches you has been meticulously reviewed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="aspect-[3/4] bg-card border border-border/70 luxury-shadow overflow-hidden flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Image Placeholder
              </div>
              <div className="aspect-[3/4] bg-card border border-border/70 luxury-shadow overflow-hidden flex items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground translate-y-6">
                Fabric Detail
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / offers */}
        <section className="py-20 md:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-3">
              Be the first to discover new drops.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-xl mx-auto">
              Join the EÍN list for early access to limited collections, private offers, and styling notes from the studio.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full sm:w-72 px-3 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-3 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition disabled:opacity-60"
              >
                {status === "submitting" ? "Joining..." : "Join Newsletter"}
              </button>
            </form>

            {status === "success" && (
              <p className="mt-4 text-sm text-emerald-600">
                You&apos;re in. Expect something special soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl mb-8">EÍN</h2>
          <p className="text-background/60 text-sm max-w-md mx-auto mb-8 font-light">
            Elevating the art of the kuftan. Premium materials, exquisite tailoring, effortless grace.
          </p>
          <div className="flex justify-center gap-6 mb-12 uppercase tracking-widest text-xs font-bold text-background/80">
            <a href="https://www.instagram.com/_ein.eg" className="hover:text-primary transition-colors">Instagram</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            <a href="/products" className="hover:text-primary transition-colors">Collection</a>
          </div>
          <div className="text-background/40 text-xs border-t border-background/10 pt-8">
            &copy; {new Date().getFullYear()} EÍN. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
