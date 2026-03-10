import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '../ui/ProductCard';
import { Loader2 } from 'lucide-react';

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts();
  const topProducts = products?.slice(0, 3) ?? [];

  return (
    <section id="collections" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-display mb-6">Signature Pieces</h2>
          <div className="w-16 h-[1px] bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Impeccable craftsmanship meets timeless design. Discover our most coveted styles.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm uppercase tracking-widest text-primary font-bold">Curating Collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive border border-destructive/20 p-8">
            <p className="font-display text-2xl mb-2">We encountered an issue</p>
            <p className="text-sm font-body">Unable to load the collection at this time. Please try again later.</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg italic">Our collection is currently being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {topProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
