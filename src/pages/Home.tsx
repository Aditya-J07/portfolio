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
  Palette,
  ExternalLink,
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ClickCounter from '../components/ClickCounter';
import LinkWithIcon from '../components/LinkWithIcon';
import ThemeSelector from '../components/ThemeSelector';
import PixelHearts from '../components/common/PixelHearts';
import Marquee from '../components/common/Marquee';
import SectionLabel from '../components/common/SectionLabel';
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

const featuredProjects = projects.filter((p) => p.featured);

export default function Home() {
  const [isNameHovered, setIsNameHovered] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-8 md:space-y-20 md:px-6 md:py-12">
      {/* ====================================================================
          HERO BENTO GRID: PLAYER CARD & INTRO
          ==================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Bento Tile */}
        <div className="lg:col-span-8 bg-surface-1 border-4 border-border p-6 sm:p-8 shadow-brutal flex flex-col justify-between">
          <div>
            {/* Top HUD Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-3 border-border/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-accent-green border-2 border-border inline-block animate-pulse" />
                <span className="font-pixel text-[9px] uppercase text-ink font-bold">
                  SERVER STATUS: ACTIVE (TUMKUR, IN)
                </span>
              </div>
              <PixelHearts total={10} count={10} size="sm" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading text-ink leading-tight tracking-tight mb-4">
              Hey! I'm{' '}
              <span className="relative inline-flex items-center bg-accent-yellow text-accent-ink px-2 border-3 border-border shadow-[3px_3px_0px_var(--shadow)]">
                <span className="sr-only">Aditya</span>
                <span aria-hidden="true">A</span>
                <span
                  className="underline decoration-dashed decoration-2 cursor-help"
                  onMouseEnter={() => setIsNameHovered(true)}
                  onMouseLeave={() => setIsNameHovered(false)}
                >
                  di
                </span>
                <span aria-hidden="true">tya</span>
                <span
                  className={`pointer-events-none inline-flex overflow-hidden align-baseline whitespace-nowrap transition-all duration-300 ease-out select-none font-pixel text-xs ml-2 ${
                    isNameHovered ? 'max-w-[12ch] opacity-100' : 'max-w-0 opacity-0'
                  }`}
                >
                  (The Dev)
                </span>
              </span>
            </h1>

            {/* Bio Paragraphs */}
            <div className="font-body text-ink text-base sm:text-lg leading-relaxed space-y-4 mb-6">
              <p>
                I'm a second-year Computer Science student passionate about{' '}
                <span className="font-bold underline decoration-accent-yellow decoration-4">
                  building interactive experiences
                </span>
                —from 2D games to full-stack web applications. Currently studying AI & ML at{' '}
                <a
                  className="font-bold text-ink underline hover:text-focus transition-colors"
                  href="http://www.sit.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Siddaganga Institute of Technology, Tumkur
                </a>
                .
              </p>
              <p>
                I've built projects like{' '}
                <Link
                  to="/projects"
                  className="font-bold text-ink underline decoration-accent-green decoration-3 hover:text-focus"
                >
                  Neura-Beats
                </Link>{' '}
                and manage websites for tech clubs.
              </p>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t-3 border-border/30">
            {socialLinks.map((link) => (
              <div
                key={link.href}
                className="px-3 py-2 bg-surface-2 text-ink border-2 border-border font-pixel text-[9px] uppercase hover:bg-accent-yellow hover:text-accent-ink hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_var(--shadow)]"
              >
                <LinkWithIcon
                  href={link.href}
                  text={link.text}
                  icon={link.icon}
                  external={true}
                  className="font-pixel text-[9px]"
                />
              </div>
            ))}

            <Link
              to="/about"
              className="px-3 py-2 bg-surface-deep text-accent-yellow border-2 border-border font-pixel text-[9px] uppercase flex items-center gap-1.5 hover:bg-accent-yellow hover:text-accent-ink hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_var(--shadow)] ml-auto"
            >
              <span>More about me</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Player Profile Dossier Card */}
        <div className="lg:col-span-4 bg-surface-deep text-text-on-deep border-4 border-border p-6 shadow-brutal flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-border-on-deep/30 mb-4">
              <span className="font-pixel text-[9px] text-accent-yellow">PLAYER_PROFILE.DAT</span>
              <span className="font-pixel text-[9px] bg-accent-green text-accent-ink px-1.5 py-0.5 font-bold">
                LVL 20
              </span>
            </div>

            <div className="text-center py-4">
              <div className="w-24 h-24 mx-auto bg-surface-1 border-4 border-border-on-deep shadow-[4px_4px_0px_#000] flex items-center justify-center text-4xl mb-3 overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Aditya Jha"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // fallback to pixel avatar emoji if image is loading
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <h2 className="font-heading text-xl text-accent-yellow">ADITYA JHA</h2>
              <p className="font-pixel text-[9px] text-text-on-deep/80 mt-1">
                GAME DEV & FULL-STACK ENG
              </p>
            </div>

            {/* RPG Stats Sheet */}
            <div className="space-y-2.5 font-pixel text-[9px] pt-3 border-t-2 border-border-on-deep/30">
              <div className="flex justify-between items-center bg-surface-1/10 p-2 border border-border-on-deep/30">
                <span className="text-accent-yellow">CLASS:</span>
                <span className="text-white">AI/ML ENGINEER</span>
              </div>
              <div className="flex justify-between items-center bg-surface-1/10 p-2 border border-border-on-deep/30">
                <span className="text-accent-green">LOCATION:</span>
                <span className="text-white">TUMKUR, INDIA</span>
              </div>
              <div className="flex justify-between items-center bg-surface-1/10 p-2 border border-border-on-deep/30">
                <span className="text-accent-teal">GUILD:</span>
                <span className="text-white">PATHFINDER / DECODERS</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t-2 border-border-on-deep/30">
            <Link
              to="/contact"
              className="w-full min-h-[44px] py-2.5 bg-accent-yellow text-accent-ink border-3 border-border-on-deep font-pixel text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-accent-green transition-all shadow-[2px_2px_0px_#000]"
            >
              <span>Connect / Msg ↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TWO-ROW INFINITE SLATE MARQUEE
          ==================================================================== */}
      <Marquee className="-mx-4 md:-mx-6" />

      {/* ====================================================================
          FEATURED PROJECTS (THE CHEST)
          ==================================================================== */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <SectionLabel
            slot="[01/05]"
            title="Featured Projects"
            subtitle="The Rare & Legendary Chest Items"
          />
          <Link
            to="/projects"
            className="px-4 py-2 bg-surface-1 text-ink border-3 border-border font-pixel text-[10px] uppercase flex items-center gap-2 hover:bg-accent-yellow hover:text-accent-ink hover:-translate-y-0.5 transition-all shadow-brutal-sm self-start sm:self-auto"
          >
            <span>View All Chests ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ====================================================================
          DASHBOARD BENTO GRID (CLICKER, THEME, GAMES, ACHIEVEMENTS, HACKATHONS)
          ==================================================================== */}
      <section>
        <SectionLabel slot="[02/05]" title="Dashboard" subtitle="Active Quests & World Config" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Box 1: Stats Clicker */}
          <div className="sm:col-span-2 lg:col-span-1">
            <ClickCounter />
          </div>

          {/* Box 2: Theme Selector */}
          <div className="bg-surface-1 border-4 border-border p-5 shadow-brutal lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-heading text-lg text-ink mb-2">
                <Palette size={20} className="text-accent-yellow" />
                <span>World Theme</span>
              </div>
              <p className="font-body text-xs text-ink/80 mb-4">
                Switch between Overworld Sky, Canon Stone & Bedrock Cave.
              </p>
            </div>
            <ThemeSelector />
          </div>

          {/* Box 3: Games Highlight */}
          <div className="bg-surface-1 border-4 border-border p-5 shadow-brutal sm:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b-2 border-border/30 mb-4">
              <div className="flex items-center gap-2 font-heading text-lg text-ink">
                <Gamepad2 size={20} className="text-accent-purple" />
                <span>Published Games</span>
              </div>
              <a
                href="https://prolly-adi.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[9px] uppercase px-2 py-1 bg-surface-deep text-accent-yellow border-2 border-border shadow-[2px_2px_0px_var(--shadow)] hover:bg-accent-yellow hover:text-accent-ink transition-colors"
              >
                [itch.io] ↗
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {games.slice(0, 2).map((game) => (
                <a
                  key={game.id}
                  href={game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-surface-2 border-3 border-border shadow-[3px_3px_0px_var(--shadow)] hover:bg-accent-yellow hover:text-accent-ink transition-all group"
                >
                  <div className="h-16 bg-surface-deep border-2 border-border mb-2 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    🎮
                  </div>
                  <div className="font-heading text-sm text-ink truncate group-hover:text-accent-ink">
                    {game.name}
                  </div>
                  <div className="font-body text-xs text-ink/80 truncate">{game.description}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Box 4: Latest Achievements */}
          <div className="bg-surface-1 border-4 border-border p-5 shadow-brutal sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between pb-3 border-b-2 border-border/30 mb-4">
              <div className="flex items-center gap-2 font-heading text-lg text-ink">
                <Activity size={20} className="text-accent-green" />
                <span>Recent Advancements</span>
              </div>
              <span className="font-pixel text-[9px] bg-accent-yellow text-accent-ink px-2 py-0.5 border border-border font-bold">
                TOP 4
              </span>
            </div>

            <ul className="space-y-3 font-mono text-sm">
              {achievements.slice(0, 4).map((achievement) => (
                <li
                  key={achievement.title}
                  className="flex items-center justify-between p-2.5 bg-surface-2 border-2 border-border shadow-[2px_2px_0px_var(--shadow)] hover:bg-surface-1 transition-colors"
                >
                  <span className="flex items-center gap-2.5 text-ink font-bold">
                    <span className="text-lg">{achievement.icon}</span>
                    <span>{achievement.title}</span>
                  </span>
                  <span className="font-pixel text-[8px] text-ink/70 uppercase">
                    {achievement.subtitle}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 5: Hackathons Dossier */}
          <div className="bg-surface-1 border-4 border-border p-5 shadow-brutal sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between pb-3 border-b-2 border-border/30 mb-4">
              <div className="flex items-center gap-2 font-heading text-lg text-ink">
                <Trophy size={20} className="text-accent-yellow" />
                <span>Hackathons & Raids</span>
              </div>
              <span className="font-pixel text-[9px] bg-surface-deep text-accent-green px-2 py-0.5 border border-border">
                {hackathons.length} LOGS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hackathons.slice(0, 4).map((h) => (
                <div
                  key={h.name}
                  className="bg-surface-2 border-3 border-border p-3 shadow-[2px_2px_0px_var(--shadow)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <div className="font-heading text-xs text-ink">{h.name}</div>
                      {h.isWin && (
                        <span className="text-sm select-none" title={h.achievement}>
                          🏆
                        </span>
                      )}
                    </div>
                    <div className="font-body text-xs text-ink/80 mt-1">{h.organizer}</div>
                    {h.event && (
                      <div className="font-pixel text-[8px] text-accent-purple mt-1">
                        {h.event} {h.type ? `(${h.type})` : ''}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/20">
                    <span className="font-pixel text-[8px] text-ink/70">{h.date}</span>
                    {h.certificateLink && (
                      <a
                        href={h.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[8px] uppercase px-2 py-1 bg-accent-yellow text-accent-ink border border-border shadow-[1px_1px_0px_var(--shadow)] flex items-center gap-1 hover:bg-accent-orange transition-colors"
                      >
                        <span>Proof</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
