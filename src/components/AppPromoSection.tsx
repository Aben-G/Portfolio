import { motion } from "framer-motion";
import { Smartphone, Download, CheckCircle2, Atom } from "lucide-react";

const AppPromoSection = () => {
    return (
        <section className="py-12 md:py-20 overflow-hidden bg-secondary/20 relative">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold tracking-wider uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Coming Soon
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Abugida Fitness <br />
                            <span className="text-primary">& Supplement</span>
                        </h2>

                        <p className="text-base text-muted-foreground max-w-md">
                            The ultimate e-commerce destination for fitness enthusiasts. Shop supplements, vitamins, and pre-workout gear directly from your phone.
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground/70">
                                Tech
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-background/20">
                                <Atom size={14} className="text-primary" />
                                <span className="text-xs font-medium">React Native</span>
                            </span>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                            {[
                                "Localized payments",
                                "Fitness tracking",
                                "Exclusive deals",
                                "Trainer chat"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="text-primary shrink-0" size={16} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity cursor-not-allowed">
                                <Smartphone size={20} />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[8px] uppercase font-semibold opacity-70 italic leading-none">Soon on</span>
                                    <span className="text-sm font-bold leading-none">App Store</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity cursor-not-allowed">
                                <Download size={20} />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[8px] uppercase font-semibold opacity-70 italic leading-none">Soon on</span>
                                    <span className="text-sm font-bold leading-none">Play Store</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3D Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 10 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-1000 hidden lg:flex justify-center"
                    >
                        <div
                            className="relative w-[220px] h-[450px] transition-transform duration-700 hover:rotate-y-0 [transform-style:preserve-3d] [transform:rotateY(-12deg)_rotateX(4deg)_rotateZ(-1deg)]"
                        >
                            {/* Phone Frame - restyled with metallic accent and slimmer bezel */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 rounded-[2.5rem] border-[4px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10 shadow-primary/10">
                                {/* Speaker/Notch - Slimmer */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-b-xl z-20 border-x border-b border-white/5"></div>

                                {/* Screen Content */}
                                <img
                                    src="/abueco.webp"
                                    alt="Abugida App Preview"
                                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                                />

                                {/* Glass Shine Effect */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-10"></div>
                            </div>

                            {/* Side buttons - Slimmer and more realistic */}
                            <div className="absolute -left-[2px] top-20 w-1 h-8 bg-slate-700 rounded-l-sm border-y border-white/10"></div>
                            <div className="absolute -left-[2px] top-32 w-1 h-8 bg-slate-700 rounded-l-sm border-y border-white/10"></div>
                            <div className="absolute -right-[2px] top-28 w-1 h-12 bg-slate-700 rounded-r-sm border-y border-white/10"></div>

                            {/* Bottom Charging Port Indicator (Subtle) */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full"></div>
                        </div>

                        {/* Background Glow - More focused */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/15 blur-[80px] -z-10 rounded-full"></div>
                    </motion.div>

                    {/* Mobile view image */}
                    <div className="lg:hidden block mt-8">
                        <div className="relative rounded-[2rem] overflow-hidden border-4 border-secondary/50 shadow-lg max-w-[200px] mx-auto ring-1 ring-white/5">
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
