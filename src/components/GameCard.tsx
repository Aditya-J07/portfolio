import { motion } from 'framer-motion';

interface GameProps {
    game: {
        name: string;
        description: string;
        tech: string[];
        playUrl: string;
        embedUrl?: string; // Optional embed URL
    };
    index: number;
}

export default function GameCard({ game, index }: GameProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col justify-between rounded-lg border border-surface0 bg-base p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
        >
            <div>
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface0 text-2xl">
                            🎮
                        </div>
                        <div>
                            <h3 className="font-bold text-text transition-colors group-hover:text-accent">
                                {game.name}
                            </h3>
                        </div>
                    </div>
                </div>

                <p className="text-subtext0 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {game.description}
                </p>

                {/* Optional Embed or Image Placeholder */}
                {game.embedUrl && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-surface1 bg-crust">
                        <iframe
                            src={game.embedUrl}
                            width="208"
                            height="167"
                            frameBorder="0"
                            className="mx-auto"
                        >
                            <a href={game.playUrl}>{game.name}</a>
                        </iframe>
                    </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {game.tech.map((tech) => (
                        <span
                            key={tech}
                            className="rounded bg-surface0 px-2 py-0.5 text-xs text-subtext1 font-mono transition-colors group-hover:bg-surface1 group-hover:text-text"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}
