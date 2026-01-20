import { motion } from 'framer-motion';

interface SkillBadgeProps {
    skill: string;
    index?: number;
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1.5 bg-surface0 text-subtext1 text-sm font-mono rounded-lg border border-surface1 hover:border-blue hover:text-blue transition-all cursor-default"
        >
            {skill}
        </motion.span>
    );
}
