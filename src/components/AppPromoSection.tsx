import { motion } from "framer-motion";
import { Smartphone, Download, CheckCircle2 } from "lucide-react";

const AppPromoSection = () => {
  return (
    <section className="section-padding overflow-hidden bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Coming Soon
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Abugida Fitness <br />
              <span className="text-primary">& Supplement</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              The ultimate e-commerce destination for fitness enthusiasts. Shop supplements, vitamins, and pre-workout gear directly from your phone.
            </p>

            <ul className="space-y-3">
              {[
                "Localized payment options",
                "Real-time fitness tracking",
                "Exclusive supplement deals",
                "Direct trainer chat"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              {/* App Store Badge-like button */}
              <div className="flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity cursor-not-allowed">
                <Smartphone size={24} />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold opacity-70">Coming soon on</span>
                  <span className="text-lg font-bold">App Store</span>
                </div>
              </div>

              {/* Play Store Badge-like button */}
              <div className="flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity cursor-not-allowed">
                <Download size={24} />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold opacity-70">Coming soon on</span>
                  <span className="text-lg font-bold">Play Store</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative perspective-1000 hidden lg:block"
          >
            <div 
              className="relative w-[300px] h-[600px] mx-auto transition-transform duration-500 hover:rotate-y-0"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "rotateY(-15deg) rotateX(5deg) rotateZ(-2deg)"
              }}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden shadow-primary/20">
                {/* Speaker/Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20"></div>
                
                {/* Screen Content */}
                <img 
                  src="/abueco.webp" 
                  alt="Abugida App Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Side buttons */}
              <div className="absolute -left-2 top-24 w-1 h-12 bg-zinc-700 rounded-l-md"></div>
              <div className="absolute -left-2 top-40 w-1 h-12 bg-zinc-700 rounded-l-md"></div>
              <div className="absolute -right-2 top-32 w-1 h-16 bg-zinc-700 rounded-r-md"></div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
          </motion.div>

          {/* Mobile view image (simplified) */}
          <div className="lg:hidden block mt-12">
            <div className="relative rounded-3xl overflow-hidden border-4 border-secondary shadow-xl max-w-xs mx-auto">
               <img 
                  src="/abueco.webp" 
                  alt="Abugida App Preview" 
                  className="w-full object-cover"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
