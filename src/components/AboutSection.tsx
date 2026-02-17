import { motion } from "framer-motion";
import { skills, experience, education } from "@/data/portfolio";
import { GraduationCap, Briefcase } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="font-heading text-sm tracking-[0.3em] uppercase text-primary mb-2"
        >
          About Me
        </motion.h2>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="font-heading text-3xl md:text-4xl font-bold mb-8"
        >
          A Bit About <span className="text-gradient">Who I Am</span>
        </motion.h3>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="text-muted-foreground leading-relaxed max-w-2xl mb-12"
        >
          I'm Abenezer Gezahegn, a passionate software engineer from Addis Ababa, Ethiopia.
          I love building clean, efficient, and user-friendly digital products. With a strong
          foundation in computer science and hands-on experience in modern web technologies,
          I strive to create solutions that make a difference.
        </motion.p>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 3}
              className="space-y-4"
            >
              <h4 className="font-heading text-lg font-semibold text-primary/80 uppercase tracking-wider">
                {group.category}
              </h4>
              <div className="space-y-5">
                {group.items.map((skill: any) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Briefcase size={20} />
              </div>
              <h4 className="font-heading text-xl font-semibold">Experience</h4>
            </div>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent pl-8">
              {experience.map((e, idx) => (
                <div key={e.title} className="relative">
                  <div className="absolute left-[-37px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{e.period}</p>
                  <h5 className="font-heading font-bold text-lg">{e.title}</h5>
                  <p className="text-sm font-medium text-foreground/80">{e.company}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-heading text-xl font-semibold">Education</h4>
            </div>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent pl-8">
              {education.map((e, idx) => (
                <div key={e.degree} className="relative">
                  <div className="absolute left-[-37px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{e.period}</p>
                  <h5 className="font-heading font-bold text-lg">{e.degree}</h5>
                  <p className="text-sm font-medium text-foreground/80">{e.school}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
