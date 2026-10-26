import { useState } from 'react';
import { Github, Linkedin, Mail, Gamepad2, Heart, CheckCircle, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Aditya-J07', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-jha-sit', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:adityajha.vats02@gmail.com', label: 'Email' },
  { icon: Gamepad2, href: 'https://prolly-adi.itch.io/', label: 'itch.io' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [buddyEnabled, setBuddyEnabled] = useState(() => {
    try {
      return localStorage.getItem('cursor_buddy_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const toggleBuddy = () => {
    const next = !buddyEnabled;
    setBuddyEnabled(next);
    try {
      localStorage.setItem('cursor_buddy_enabled', String(next));
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'cursor_buddy_enabled', newValue: String(next) })
      );
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 mt-24 border-t-4 border-border bg-surface-deep text-text-on-deep">
      {/* Voxel Grass Ground Strip */}
      <div className="w-full h-3 bg-ground-top border-b-2 border-border" />
      <div className="w-full h-1.5 bg-ground-bottom" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-border/40">
          {/* Voxel Character / Badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-surface-1 border-3 border-border-on-deep flex items-center justify-center shadow-[3px_3px_0px_#000] overflow-hidden p-0.5">
              <img
                src="/favicon.png"
                alt="Aditya Jha"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-heading text-lg text-accent-yellow">ADITYA JHA</div>
              <div className="font-pixel text-[9px] text-accent-green flex items-center gap-2 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>AVAILABLE FOR WORK • OPEN TO OPPORTUNITIES</span>
              </div>
            </div>
          </div>

          {/* Social Links as Inventory Slots */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-surface-1 text-ink border-3 border-border flex items-center justify-center hover:bg-accent-yellow hover:text-accent-ink hover:-translate-y-1 transition-all shadow-[3px_3px_0px_#000]"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2.5 min-h-[48px] bg-accent-yellow text-accent-ink border-3 border-border font-pixel text-[10px] uppercase flex items-center gap-2 hover:-translate-y-1 transition-all shadow-[3px_3px_0px_#000] back-to-top cursor-ns"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top ↑</span>
            </button>
          </div>
        </div>

        {/* Copyright & Meta */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-on-deep/80">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} Aditya Jha</span>
            <span>|</span>
            <span className="text-accent-yellow">Last updated: Apr 14, 2026</span>
            <span>|</span>
            <button
              type="button"
              onClick={toggleBuddy}
              className="text-accent-green hover:text-accent-yellow font-pixel text-[9px] uppercase cursor-pointer transition-colors"
            >
              Mascot: {buddyEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <p className="flex items-center gap-1.5 font-pixel text-[9px]">
            BUILT WITH <Heart className="w-3.5 h-3.5 text-accent-red fill-current" /> USING REACT, TS &
            TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
}
