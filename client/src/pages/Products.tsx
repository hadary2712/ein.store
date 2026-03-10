import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <CartDrawer />

      <main className="pt-28 pb-20 md:pt-32">
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 md:mb-20">
              <h1 className="text-3xl md:text-5xl font-display mb-4">All Kuftans</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Explore the full EÍN collection. Every piece is crafted with considered detail and
                premium fabrics.
              </p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-60">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-sm uppercase tracking-widest text-primary font-bold">
                  Curating Collection...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-destructive border border-destructive/20 p-8 rounded-xl">
                <p className="font-display text-2xl mb-2">We encountered an issue</p>
                <p className="text-sm font-body">
                  Unable to load the collection at this time. Please try again later.
                </p>
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg italic">
                  Our collection is currently being updated.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </motion.div>
  );
}

