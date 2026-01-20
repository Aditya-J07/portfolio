import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col justify-between rounded-lg border border-surface0 bg-base p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
        >
            <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface0 text-2xl">
                             {project.category === 'game' ? '🎮' : project.category === 'club' ? '🏢' : '💻'}
                        </div>
                        <div>
                            <h3 className="font-bold text-text transition-colors group-hover:text-accent">
                                {project.name}
                            </h3>
                             {/* Badge */}
                            {project.badge && (
                                <span className="text-xs text-yellow font-mono">
                                    {project.badge}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-subtext0 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="rounded bg-surface0 px-2 py-0.5 text-xs text-subtext1 font-mono transition-colors group-hover:bg-surface1 group-hover:text-text"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 text-sm font-medium mt-auto pt-4 border-t border-surface0">
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-text hover:text-accent transition-colors"
                    >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                    </a>
                )}
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-subtext1 hover:text-text transition-colors"
                    >
                        <Github size={16} />
                        <span>Source</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}
