import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import GameCard from '../components/GameCard';
import SectionLabel from '../components/common/SectionLabel';
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

  const filteredProjects =
    activeFilter === 'all' || activeFilter === 'game'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const showGames = activeFilter === 'all' || activeFilter === 'game';

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-1 border-4 border-border p-6 sm:p-8 shadow-brutal"
        >
          <SectionLabel slot="[03/05]" title="Projects" subtitle="Web Applications, Tools & Games" />
          <p className="font-body text-ink text-base sm:text-lg max-w-3xl leading-relaxed">
            A collection of my work including web applications, tools, games, and club websites. Each
            project represents a learning experience and a step forward in my development journey.
          </p>
        </motion.div>

        {/* Filters Hotbar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 p-3 bg-surface-deep border-4 border-border shadow-brutal-sm"
        >
          <div className="flex items-center gap-2 px-2 text-accent-yellow font-pixel text-xs">
            <Filter className="w-4 h-4" />
            <span>FILTER:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`min-h-[40px] px-4 py-2 font-pixel text-xs uppercase border-3 transition-all select-none cursor-pointer ${
                    isActive
                      ? 'bg-accent-yellow text-accent-ink border-border font-bold shadow-[2px_2px_0px_#000] -translate-y-0.5'
                      : 'bg-surface-1 text-ink border-transparent hover:border-border hover:bg-surface-2'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {activeFilter !== 'game' && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 bg-accent-yellow border-2 border-border inline-block" />
              <h2 className="font-heading text-2xl text-ink uppercase">
                {activeFilter === 'all'
                  ? 'All Projects'
                  : `${filters.find((f) => f.value === activeFilter)?.label} Projects`}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Games Grid */}
        {showGames && (
          <section className="pt-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 bg-accent-purple border-2 border-border inline-block" />
              <h2 className="font-heading text-2xl text-ink uppercase flex items-center gap-2">
                <span>🎮 Published Games</span>
                <span className="font-pixel text-[10px] bg-accent-yellow text-accent-ink px-2 py-0.5 border border-border">
                  ITCH.IO
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Stats Summary Loot Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-deep text-text-on-deep border-4 border-border p-6 shadow-brutal text-center"
        >
          <p className="font-pixel text-xs sm:text-sm tracking-wider uppercase">
            Portfolio Summary:{' '}
            <span className="text-accent-yellow font-bold">{projects.length} Projects</span>
            {' + '}
            <span className="text-accent-purple font-bold">{games.length} Games</span>
            {' = '}
            <span className="text-accent-green font-bold">
              {projects.length + games.length} Completed Works
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
