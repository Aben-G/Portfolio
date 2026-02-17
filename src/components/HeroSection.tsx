import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ProjectCarousel from "./ProjectCarousel";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-24 flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4"
          >
            Software Engineer & Developer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Abenezer{" "}
            <span className="text-gradient">Gezahegn</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10"
          >
            Building elegant digital experiences with clean code and thoughtful design.
          </motion.p>
          <motion.a
            href="#works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors text-sm font-medium"
          >
            View My Work <ArrowDown size={16} className="animate-bounce" />
          </motion.a>
        </div>

        {/* Carousel Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="w-full"
        >
          <ProjectCarousel isHero={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
