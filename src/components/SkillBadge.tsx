import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  index?: number;
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="inline-flex items-center px-3 py-1.5 bg-surface-2 text-ink font-mono text-xs sm:text-sm font-bold border-3 border-border shadow-[2px_2px_0px_var(--shadow)] hover:bg-accent-yellow hover:text-accent-ink hover:-translate-y-0.5 transition-all cursor-default select-none"
    >
      <span className="text-accent-green font-pixel text-[8px] mr-1.5">◆</span>
      {skill}
    </motion.span>
  );
}
