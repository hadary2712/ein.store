import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { useCart } from '@/store/use-cart';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from "@assets/WhatsApp_Image_2026-03-08_at_11.52.31_AM_1773161137107.jpeg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsOpen, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu & Search (Left) */}
          <div className="flex items-center gap-4 flex-1">
            <button className="p-2 -ml-2 text-foreground/80 hover:text-primary transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/products" className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors relative group">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/" className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/80 hover:text-primary transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Logo (Center) */}
          <Link href="/" className="flex-shrink-0 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-primary/20 shadow-md">
              <img 
                src={logoImg} 
                alt="EÍN Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Actions (Right) */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1">
            <button className="hidden sm:block p-2 text-foreground/80 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors relative flex items-center gap-2 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-bold uppercase tracking-wider hidden sm:block">Cart</span>
              
              <AnimatePresence>
                {totalItems() > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 sm:right-auto sm:left-4 sm:-top-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {totalItems()}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>
    </motion.header>
  );
}
