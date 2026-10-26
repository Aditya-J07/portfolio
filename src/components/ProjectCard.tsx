import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  // Determine rarity from category or badge
  const rarity = project.featured
    ? { label: 'LEGENDARY', bg: 'bg-accent-yellow text-accent-ink border-border' }
    : project.category === 'game'
    ? { label: 'EPIC', bg: 'bg-accent-purple text-accent-ink border-border' }
    : project.category === 'club'
    ? { label: 'RARE', bg: 'bg-accent-teal text-accent-ink border-border' }
    : { label: 'COMMON', bg: 'bg-surface-2 text-ink border-border' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="enchanted-card group relative flex flex-col justify-between bg-surface-1 border-4 border-border p-6 shadow-brutal transition-transform hover:-translate-y-1"
    >
      <div>
        {/* Header with Slot Icon & Rarity Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-deep border-3 border-border flex items-center justify-center text-2xl shadow-[2px_2px_0px_var(--shadow)] select-none">
              {project.category === 'game' ? '🎮' : project.category === 'club' ? '🏢' : '💻'}
            </div>
            <div>
              <span
                className={`inline-block font-pixel text-[8px] uppercase px-2 py-0.5 border-2 ${rarity.bg} mb-1 font-bold`}
              >
                {project.badge || rarity.label}
              </span>
              <h3 className="font-heading text-lg sm:text-xl text-ink leading-tight group-hover:text-focus transition-colors">
                {project.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-ink text-sm mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-surface-2 text-ink font-mono text-xs border-2 border-border shadow-[1px_1px_0px_var(--shadow)] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t-3 border-border/30 mt-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] px-3 py-2 bg-accent-yellow text-accent-ink border-3 border-border font-pixel text-[10px] uppercase flex items-center justify-center gap-1.5 hover:bg-accent-orange transition-all shadow-[2px_2px_0px_var(--shadow)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ExternalLink size={14} />
            <span>Live ↗</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] px-3 py-2 bg-surface-2 text-ink border-3 border-border font-pixel text-[10px] uppercase flex items-center justify-center gap-1.5 hover:bg-surface-deep hover:text-text-on-deep transition-all shadow-[2px_2px_0px_var(--shadow)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <Github size={14} />
            <span>Source ↗</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
