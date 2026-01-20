import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import GameCard from '../components/GameCard';
import { projects } from '../data/projects';
import { games } from '../data/games';

type FilterType = 'all' | 'web' | 'tool' | 'club' | 'game';

const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Web', value: 'web' },
    { label: 'Tools', value: 'tool' },
    { label: 'Clubs', value: 'club' },
    { label: 'Games', value: 'game' },
];

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredProjects = activeFilter === 'all' || activeFilter === 'game'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const showGames = activeFilter === 'all' || activeFilter === 'game';

    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-text mb-4">
                        Projects
                    </h1>
                    <p className="text-subtext0 max-w-2xl">
                        A collection of my work including web applications, tools, games, and club websites.
                        Each project represents a learning experience and a step forward in my development journey.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-2 mb-8"
                >
                    <Filter className="w-5 h-5 text-subtext0" />
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${activeFilter === filter.value
                                    ? 'bg-blue text-base'
                                    : 'bg-surface0 text-subtext1 hover:bg-surface1 hover:text-text'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                {activeFilter !== 'game' && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold font-mono text-text mb-6">
                            {activeFilter === 'all' ? 'All Projects' : `${filters.find(f => f.value === activeFilter)?.label} Projects`}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Games Grid */}
                {showGames && (
                    <section>
                        <h2 className="text-2xl font-bold font-mono text-text mb-6 flex items-center gap-2">
                            🎮 Games
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {games.map((game, index) => (
                                <GameCard key={game.id} game={game} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 p-6 card text-center"
                >
                    <p className="text-subtext0 font-mono">
                        Total: <span className="text-blue font-bold">{projects.length} Projects</span>
                        {' + '}
                        <span className="text-mauve font-bold">{games.length} Games</span>
                        {' = '}
                        <span className="text-green font-bold">{projects.length + games.length} Creations</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
