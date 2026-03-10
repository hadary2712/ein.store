import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@shared/schema';
import { useCart } from '@/store/use-cart';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <Link href={`/product/${product.id}`} className="relative block w-full aspect-[3/4] bg-secondary overflow-hidden mb-6 luxury-shadow-hover transition-shadow duration-500 cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`
              w-full py-4 px-6 flex items-center justify-center gap-2 
              uppercase tracking-widest text-xs font-bold transition-colors shadow-lg
              ${product.inStock 
                ? 'bg-background/95 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-sm' 
                : 'bg-background/50 text-muted-foreground cursor-not-allowed'}
            `}
          >
            {product.inStock ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                Quick Add
              </>
            ) : (
              'Out of Stock'
            )}
          </button>
        </div>

        {/* Badges */}
        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-background/90 text-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            Sold Out
          </div>
        )}
      </Link>

      <div className="flex flex-col items-center text-center space-y-2">
        <Link href={`/product/${product.id}`} className="block group/title">
          <h3 className="font-display text-xl text-foreground group-hover/title:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground font-body font-medium">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
