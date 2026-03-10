import { useParams, Link } from 'wouter';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { useProduct } from '@/hooks/use-products';
import { useCart } from '@/store/use-cart';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, ChevronRight, Ruler, Truck } from 'lucide-react';
import { useState } from 'react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0', 10);
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The piece you're looking for might have been removed or is unavailable.</p>
          <Link href="/" className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors uppercase tracking-widest text-sm font-bold">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-16 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Shop
            </Link>
            <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Image Gallery (Sticky Left) */}
            <div className="md:sticky md:top-32 space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="aspect-[3/4] bg-secondary overflow-hidden luxury-shadow"
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Product Details (Scrollable Right) */}
            <div className="flex flex-col py-4 md:py-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-2xl text-primary font-body font-light mb-8">
                  ${Number(product.price).toFixed(2)}
                </p>

                <div className="w-full h-[1px] bg-border/60 mb-8"></div>

                <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none mb-10">
                  <p>{product.description}</p>
                </div>

                {/* Dummy Selectors for aesthetic realism */}
                <div className="space-y-6 mb-10">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="uppercase text-xs font-bold tracking-widest">Size</span>
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-4">
                        <Ruler className="w-3 h-3" /> Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button key={size} className="py-3 border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors focus:ring-1 focus:ring-primary focus:outline-none">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`
                    w-full py-5 px-8 flex justify-center items-center gap-3
                    uppercase tracking-[0.2em] text-sm font-bold transition-all duration-300
                    shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 active:scale-[0.99]
                    ${product.inStock 
                      ? 'bg-foreground text-background hover:bg-primary' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed shadow-none hover:shadow-none active:scale-100'}
                  `}
                >
                  {isAdding ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : !product.inStock ? (
                    'Out of Stock'
                  ) : (
                    'Add to Bag'
                  )}
                </button>

                <div className="mt-10 space-y-4 pt-8 border-t border-border/60">
                  <div className="flex items-start gap-4 text-muted-foreground">
                    <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-foreground text-sm font-bold uppercase tracking-wider mb-1">Complimentary Shipping</h4>
                      <p className="text-sm leading-relaxed">Enjoy free express delivery on all global orders. Arrives in 3-5 business days beautifully packaged.</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </motion.div>
  );
}
