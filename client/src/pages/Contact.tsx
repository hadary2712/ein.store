import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const { error: supabaseError } = await supabase.from("contacts").insert({
        name,
        email,
        message,
      });

      if (supabaseError) {
        console.error("Supabase contact insert error:", supabaseError);
        throw supabaseError;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
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

      <main className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Contact EÍN</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              For orders, collaborations, or bespoke pieces, leave us a message and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[140px] rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tell us how we can help..."
              />
            </div>

            {status === "success" && (
              <p className="text-sm text-emerald-500">
                Thank you — your message has been sent.
              </p>
            )}
            {status === "error" && error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90 transition disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>
    </motion.div>
  );
}

