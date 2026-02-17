import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectCarouselProps {
  isHero?: boolean;
}

const ProjectCarousel = ({ isHero = false }: ProjectCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "React": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "TypeScript": "bg-blue-600/10 text-blue-600 border-blue-600/20",
      "JS": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "CSS": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      "HTML": "bg-orange-500/10 text-orange-500 border-orange-500/20",
      "MongoDB": "bg-green-500/10 text-green-500 border-green-500/20",
      "Next.js": "bg-white/10 text-white border-white/20",
      "Tailwind CSS": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      "Firebase": "bg-red-500/10 text-red-500 border-red-500/20",
      "React Native": "bg-sky-500/10 text-sky-500 border-sky-500/20",
      "PostgreSQL": "bg-blue-400/10 text-blue-400 border-blue-400/20",
      "Dashboard": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Node.js": "bg-green-600/10 text-green-600 border-green-600/20",
      "API": "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };
    return colors[tag] || "bg-secondary text-secondary-foreground border-transparent";
  };

  const next = useCallback(() => setCurrent((p) => (p + 1) % projects.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + projects.length) % projects.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = projects[current];

  return (
    <section className={isHero ? "" : "section-padding"}>
      <div className={isHero ? "w-full" : "max-w-6xl mx-auto"}>
        {!isHero && (
          <h2 className="font-heading text-sm tracking-[0.3em] uppercase text-primary mb-2">
            Recent Projects
          </h2>
        )}
        <div
          className="relative rounded-xl overflow-hidden glass cursor-pointer group"
          onClick={() => setSelectedProject(project)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className={`flex ${isHero ? "flex-col" : "flex-col md:flex-row"}`}
            >
              <div className={`${isHero ? "w-full h-48 md:h-64" : "md:w-1/2 h-64 md:h-80"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className={`${isHero ? "w-full p-4" : "md:w-1/2 p-8"} flex flex-col justify-center`}>
                <h3 className={`font-heading ${isHero ? "text-lg" : "text-2xl"} font-semibold mb-2 group-hover:text-primary transition-colors`}>
                  {project.title}
                </h3>
                {!isHero && (
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${getTagColor(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-primary hover:text-primary-foreground transition-colors z-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next project"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-primary hover:text-primary-foreground transition-colors z-20"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-muted">
              <img
                src={selectedProject?.image}
                alt={selectedProject?.title}
                className="w-full h-full object-cover min-h-[300px] md:min-h-[450px]"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <DialogHeader className="text-left mb-4">
                <DialogTitle className="text-3xl font-heading font-bold text-gradient">
                  {selectedProject?.title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-base text-foreground mb-6 leading-relaxed">
                {selectedProject?.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject?.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${getTagColor(t)}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={selectedProject?.link}
                target="_blank"
                rel="noreferrer"
                className="w-fit inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                View Live Project <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectCarousel;
