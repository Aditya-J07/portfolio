import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Github,
    Linkedin,
    Mail,
    Gamepad2,
    ArrowRight,
    Trophy,
    Activity,
    Palette
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ClickCounter from '../components/ClickCounter';
import LinkWithIcon from '../components/LinkWithIcon';
import ThemeSelector from '../components/ThemeSelector';
import { projects } from '../data/projects';
import { games } from '../data/games';
import { achievements } from '../data/skills';
import { hackathons } from '../data/hackathons';

const socialLinks = [
    { icon: Github, href: 'https://github.com/Aditya-J07', text: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-jha-sit', text: 'LinkedIn' },
    { icon: Mail, href: 'mailto:adityajha.vats02@gmail.com', text: 'Email' },
    { icon: Gamepad2, href: 'https://prolly-adi.itch.io/', text: 'itch.io' },
];

const featuredProjects = projects.filter(p => p.featured);

export default function Home() {
    const [isNameHovered, setIsNameHovered] = useState(false);

    return (
        <div className="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
            {/* Section 1: Hero / Introduction */}
            <section className="space-y-5 px-4 md:px-0">
                <h1 className="text-3xl font-bold md:text-4xl font-mono">
                    Hey! I'm{' '}
                    <span className="text-accent relative inline-flex">
                        <span className="sr-only">Aditya</span>
                        <span aria-hidden="true">A</span>
                        <span
                            className="decoration-accent/30 underline decoration-dashed opacity-70 cursor-help"
                            onMouseEnter={() => setIsNameHovered(true)}
                            onMouseLeave={() => setIsNameHovered(false)}
                        >
                            di
                        </span>
                        <span aria-hidden="true">tya</span>
                        <span
                            className={`pointer-events-none inline-flex overflow-hidden align-baseline whitespace-nowrap transition-all duration-500 ease-out select-none font-sans text-sm items-center ml-1 ${isNameHovered ? 'max-w-[10ch] opacity-100' : 'max-w-0 opacity-0'
                                }`}
                        >
                            (The Dev)
                        </span>
                    </span>
                </h1>

                <div className="text-subtext0 max-w-prose text-lg leading-relaxed font-sans">
                    <p>
                        I'm a second-year Computer Science student passionate about <span className="text-text font-medium">building interactive experiences</span>—from 2D games to full-stack web applications. Currently studying AI & ML at <a className="link" href="http://www.sit.ac.in/" target="_blank" rel="noopener noreferrer">Siddaganga Institute of Technology, Tumkur</a>.
                    </p>
                    <p className="mt-4">
                        I've built projects like <Link to="/projects" className="link">Neura-Beats</Link> and manage websites for tech clubs.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 font-mono text-sm">
                    {socialLinks.map((link, i) => (
                        <div key={link.href} className="flex items-center">
                            <LinkWithIcon
                                href={link.href}
                                text={link.text}
                                icon={link.icon}
                                external={true}
                            />
                            {i < socialLinks.length - 1 && (
                                <span className="text-surface1 text-xs ml-4">|</span>
                            )}
                        </div>
                    ))}
                    <span className="text-surface1 text-xs">|</span>
                    <Link
                        to="/about"
                        className="group text-subtext1 hover:text-accent inline-flex items-center gap-1 transition-colors duration-200"
                    >
                        <span>More about me</span>
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
            </section>

            {/* Section: Featured Projects */}
            <section className="px-4 md:px-0">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-mono text-text">Featured Projects</h2>
                    <Link to="/projects" className="text-subtext1 hover:text-accent font-mono text-sm flex items-center gap-1 transition-colors">
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </section>

            {/* Section: Bento Grid Container (Dashboard) */}
            <section className="px-4 md:px-0">
                <h2 className="sr-only">Dashboard / Highlights</h2>
                <div className="grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">

                    {/* Box 1: Stats Clicker */}
                    <div className="border border-surface0 bg-base rounded-xl p-4 shadow-lg sm:col-span-2 lg:col-span-1 flex flex-col justify-center">
                        <ClickCounter />
                    </div>

                    {/* Box 2: Theme Selector */}
                    <div className="border border-surface0 bg-base rounded-xl p-4 shadow-lg lg:col-span-1">
                        <h3 className="text-text mb-3 flex items-center gap-2 text-sm font-semibold font-mono">
                            <Palette size={16} className="text-accent" />
                            Customize Theme
                        </h3>
                        <ThemeSelector />
                    </div>

                    {/* Box 3: Games Highlight */}
                    <div className="border border-surface0 bg-base rounded-xl p-4 shadow-lg sm:col-span-2 md:col-span-2">
                        <div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
                            <h3 className="flex items-center gap-2 font-semibold font-mono">
                                <Gamepad2 size={16} className="text-accent" />
                                <span>Published Games</span>
                            </h3>
                            <a
                                href="https://prolly-adi.itch.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
                            >
                                [itch.io]
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {games.slice(0, 2).map(game => (
                                <a key={game.id} href={game.playUrl} target="_blank" className="block group">
                                    <div className="h-24 bg-surface0 rounded-lg mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-mauve/10 group-hover:bg-mauve/20 transition-colors flex items-center justify-center">
                                            <Gamepad2 className="text-mauve/50" />
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-text group-hover:text-accent truncate">{game.name}</div>
                                    <div className="text-xs text-subtext1 truncate">{game.description}</div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Box 4: Latest Achievements (Commits equivalent) */}
                    <div className="border border-surface0 bg-base rounded-xl p-4 shadow-lg md:col-span-2">
                        <div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
                            <h3 className="flex items-center gap-2 font-semibold font-mono">
                                <Activity size={16} className="text-accent" />
                                <span>Recent Achievements</span>
                            </h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                            {achievements.slice(0, 4).map((achievement) => (
                                <li key={achievement.title} className="flex items-center justify-between group">
                                    <span className="flex items-center gap-2 text-subtext0 group-hover:text-text transition-colors">
                                        <span>{achievement.icon}</span>
                                        <span>{achievement.title}</span>
                                    </span>
                                    <span className="text-xs text-subtext1 font-mono">{achievement.subtitle}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Box 5: Hackathons */}
                    <div className="border border-surface0 bg-base rounded-xl p-4 shadow-lg sm:col-span-2 lg:col-span-2">
                        <div className="text-text mb-3 flex items-center justify-between gap-2 text-sm">
                            <h3 className="flex items-center gap-2 font-semibold font-mono">
                                <Trophy size={16} className="text-accent" />
                                <span>Hackathons</span>
                            </h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {hackathons.slice(0, 4).map(h => (
                                <div key={h.name} className="bg-surface0/50 rounded p-3">
                                    <div className="flex justify-between items-start">
                                        <div className="font-bold text-text text-sm">{h.name}</div>
                                        {h.isWin && <span className="text-yellow text-xs">🏆</span>}
                                    </div>
                                    <div className="text-xs text-subtext1 mt-1">{h.organizer}</div>
                                    <div className="text-xs text-surface2 mt-2 font-mono">{h.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
