import { motion } from 'framer-motion';

export function Hero() {
  const scrollToProducts = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full bg-foreground overflow-hidden flex items-center justify-center">
      {/* Background Image - Elegant fashion shot */}
      {/* landing page hero elegant woman in beige dress in desert landscape */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop"
          alt="EÍN Collection"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block text-primary/90 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-6"
        >
          The Pre-Fall Collection
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 text-balance leading-[1.1]"
        >
          Redefining <br/><span className="italic text-primary/90">Elegance</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-lg md:text-xl font-body max-w-2xl mx-auto mb-12 font-light"
        >
          Discover our exclusive range of luxury kuftans, crafted from the finest fabrics with meticulous attention to detail.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToProducts}
          className="px-10 py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-all duration-500 shadow-xl shadow-black/20 group relative overflow-hidden"
        >
          <span className="relative z-10">Explore Collection</span>
          <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
        </motion.button>
      </div>
    </div>
  );
}
