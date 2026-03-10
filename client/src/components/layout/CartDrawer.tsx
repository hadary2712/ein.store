import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/use-cart';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: "This is a demo. In a real app, this would redirect to Stripe.",
      variant: "default",
    });
    setTimeout(() => {
      clearCart();
      setIsOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-display text-2xl text-foreground">Your Cart</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <ShoppingBag className="w-12 h-12 text-primary" />
                  <p className="font-body text-lg">Your cart is elegantly empty.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors border-b border-primary pb-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-32 bg-secondary/50 overflow-hidden group">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-display text-lg leading-tight">
                              <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                                {item.name}
                              </Link>
                            </h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">${Number(item.price).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-border">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-black/5 transition-colors text-foreground/70"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-black/5 transition-colors text-foreground/70"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium ml-auto">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border/50 bg-background/95 backdrop-blur">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm font-bold">Subtotal</span>
                  <span className="font-display text-2xl">${totalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center mb-6">Shipping & taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-primary text-primary-foreground uppercase tracking-[0.2em] text-sm font-bold hover:bg-foreground transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-foreground/20 active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
