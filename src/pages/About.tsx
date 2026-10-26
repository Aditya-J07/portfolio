import { motion } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Gamepad2,
  Globe,
  Wrench,
  BookOpen,
} from 'lucide-react';
import SkillBadge from '../components/SkillBadge';
import PixelHearts from '../components/common/PixelHearts';
import SectionLabel from '../components/common/SectionLabel';
import { skillCategories, achievements } from '../data/skills';
import { experiences } from '../data/hackathons';

const iconMap: Record<string, typeof Code> = {
  code: Code,
  'gamepad-2': Gamepad2,
  globe: Globe,
  wrench: Wrench,
  'book-open': BookOpen,
};

export default function About() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ====================================================================
            HEADER & CHARACTER SHEET HUD
            ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-1 border-4 border-border p-6 sm:p-8 shadow-brutal"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-3 border-border/30">
            <SectionLabel
              slot="[02/05]"
              title="About Me"
              subtitle="Background & Journey"
              className="mb-0"
            />
            <div className="flex items-center gap-3">
              <span className="font-pixel text-[10px] bg-accent-yellow text-accent-ink px-2.5 py-1 border-2 border-border font-bold">
                STUDENT & DEVELOPER
              </span>
              <PixelHearts total={10} count={10} size="sm" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Frame */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="w-36 h-36 bg-surface-deep border-4 border-border shadow-brutal p-1.5">
                <img
                  src="/profile.png"
                  alt="Aditya Jha"
                  className="w-full h-full object-cover border-2 border-border"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="font-pixel text-[8px] bg-accent-green text-accent-ink px-2 py-0.5 border border-border font-bold">
                  ACTIVE & CODING
                </span>
              </div>
            </div>

            {/* Profile Bio */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl text-ink leading-tight">
                  Aditya Jha
                </h1>
                <p className="font-pixel text-xs text-focus font-bold uppercase mt-1">
                  Game Developer & Full-Stack Developer
                </p>
              </div>

              <div className="font-body text-ink text-base leading-relaxed space-y-3">
                <p>
                  I'm a second-year Computer Science student passionate about game development, web
                  development, and competitive programming. I love building interactive
                  experiences—from 2D games to full-stack web applications.
                </p>
                <p>
                  I'm actively participating in hackathons, managing club websites, and constantly
                  learning new technologies. My goal is to work in the gaming industry while keeping
                  my skills versatile across software development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            EDUCATION SECTION
            ==================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-1 border-4 border-border p-6 shadow-brutal"
        >
          <div className="flex items-center gap-3 pb-4 mb-4 border-b-3 border-border/30">
            <div className="w-10 h-10 bg-accent-green text-accent-ink border-2 border-border flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-ink uppercase">Education</h2>
              <span className="font-pixel text-[8px] text-ink/70">ACADEMIC BACKGROUND</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-surface-2 border-3 border-border">
            <div>
              <h3 className="font-heading text-lg text-ink">Siddaganga Institute of Technology</h3>
              <p className="font-body text-ink text-sm font-semibold">
                B.E. in Computer Science & Engineering (AI & ML)
              </p>
              <p className="font-pixel text-[9px] text-focus mt-1">2nd Year • 2024 - 2028</p>
            </div>
            <div className="flex items-center gap-2 md:self-start bg-surface-1 px-3 py-1.5 border-2 border-border self-start">
              <MapPin className="w-4 h-4 text-accent-red" />
              <span className="font-mono text-xs text-ink font-bold">
                Tumkur, Karnataka, India
              </span>
            </div>
          </div>
        </motion.section>

        {/* ====================================================================
            EXPERIENCE / GUILD QUESTLINE
            ==================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-1 border-4 border-border p-6 shadow-brutal"
        >
          <div className="flex items-center gap-3 pb-4 mb-6 border-b-3 border-border/30">
            <div className="w-10 h-10 bg-accent-yellow text-accent-ink border-2 border-border flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-ink uppercase">Experience</h2>
              <span className="font-pixel text-[8px] text-ink/70">ROLES & INVOLVEMENTS</span>
            </div>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className="relative pl-6 pb-6 border-l-4 border-border last:border-l-0 last:pb-0"
              >
                {/* Pixel Node on Timeline */}
                <div className="absolute -left-[14px] top-0 w-6 h-6 bg-accent-yellow border-3 border-border flex items-center justify-center text-[10px] font-pixel shadow-[1px_1px_0px_var(--shadow)] scroll-indicator-ns select-none">
                  {index + 1}
                </div>

                <div className="bg-surface-2 border-3 border-border p-5 shadow-brutal-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg text-ink">{exp.role}</h3>
                    <span className="font-pixel text-[9px] bg-surface-deep text-accent-yellow px-2 py-0.5 border border-border">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-pixel text-[10px] text-focus font-bold uppercase mb-3">
                    {exp.company}
                  </p>

                  <ul className="space-y-2 font-body text-sm text-ink">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-accent-green font-pixel text-xs mt-0.5">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ====================================================================
            SKILLS & CRAFTING INVENTORY
            ==================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-1 border-4 border-border p-6 shadow-brutal"
        >
          <div className="flex items-center gap-3 pb-4 mb-6 border-b-3 border-border/30">
            <div className="w-10 h-10 bg-accent-purple text-accent-ink border-2 border-border flex items-center justify-center font-bold">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-ink uppercase">Skills & Technologies</h2>
              <span className="font-pixel text-[8px] text-ink/70">
                TOOLKIT, ENGINES & TECHNOLOGIES
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => {
              const IconComponent = iconMap[category.icon] || Code;
              return (
                <div
                  key={category.name}
                  className="bg-surface-2 border-3 border-border p-5 shadow-brutal-sm"
                >
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-border/30">
                    <div className="w-8 h-8 bg-surface-deep text-accent-yellow border-2 border-border flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-base text-ink uppercase">{category.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <SkillBadge key={skill} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ====================================================================
            ACHIEVEMENTS / ADVANCEMENTS
            ==================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface-1 border-4 border-border p-6 shadow-brutal"
        >
          <div className="flex items-center gap-3 pb-4 mb-6 border-b-3 border-border/30">
            <div className="w-10 h-10 bg-accent-yellow text-accent-ink border-2 border-border flex items-center justify-center font-bold text-xl">
              🏆
            </div>
            <div>
              <h2 className="font-heading text-xl text-ink uppercase">Achievements</h2>
              <span className="font-pixel text-[8px] text-ink/70">HONORS & MILESTONES</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3.5 p-4 bg-surface-2 border-3 border-border shadow-[3px_3px_0px_var(--shadow)] hover:bg-accent-yellow hover:text-accent-ink transition-colors group"
              >
                <div className="w-12 h-12 bg-surface-deep text-2xl border-2 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                  {achievement.icon}
                </div>
                <div>
                  <p className="font-heading text-sm text-ink group-hover:text-accent-ink leading-snug">
                    {achievement.title}
                  </p>
                  <p className="font-pixel text-[9px] text-ink/75 group-hover:text-accent-ink/90 mt-1 uppercase">
                    {achievement.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
