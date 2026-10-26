import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Gamepad2,
  MapPin,
  ArrowRight,
  Terminal,
  Send,
} from 'lucide-react';
import SectionLabel from '../components/common/SectionLabel';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'adityajha.vats02@gmail.com',
    href: 'mailto:adityajha.vats02@gmail.com',
    color: 'text-accent-red',
    tag: 'COMMS CHANNEL 01',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Aditya-J07',
    href: 'https://github.com/Aditya-J07',
    color: 'text-ink',
    tag: 'COMMS CHANNEL 02',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'aditya-jha-sit',
    href: 'https://www.linkedin.com/in/aditya-jha-sit',
    color: 'text-focus',
    tag: 'COMMS CHANNEL 03',
  },
  {
    icon: Gamepad2,
    label: 'itch.io',
    value: 'prolly-adi',
    href: 'https://prolly-adi.itch.io/',
    color: 'text-accent-purple',
    tag: 'COMMS CHANNEL 04',
  },
];

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const [msgInput, setMsgInput] = useState('');

  const handleSendTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    const mailtoUrl = `mailto:adityajha.vats02@gmail.com?subject=Portfolio%20Message&body=${encodeURIComponent(
      msgInput
    )}`;
    window.open(mailtoUrl, '_blank');
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-1 border-4 border-border p-6 sm:p-8 shadow-brutal"
        >
          <SectionLabel
            slot="[05/05]"
            title="Join Server"
            subtitle="Direct Comms & Multiplayer Hub"
          />
          <p className="font-body text-ink text-base sm:text-lg max-w-2xl leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part
            of your visions. Broadcast a packet or link up on any channel below.
          </p>
        </motion.div>

        {/* 4 Comms Channels Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-surface-1 border-4 border-border p-6 shadow-brutal transition-all hover:-translate-y-1 group block select-none"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-border/30 mb-4">
                <span className="font-pixel text-[8px] bg-surface-deep text-accent-yellow px-2 py-0.5 border border-border">
                  {link.tag}
                </span>
                <ArrowRight className="w-4 h-4 text-ink group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-surface-deep text-accent-yellow border-3 border-border flex items-center justify-center shadow-[3px_3px_0px_var(--shadow)] group-hover:bg-accent-yellow group-hover:text-accent-ink transition-colors">
                  <link.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-ink leading-tight">{link.label}</h3>
                  <p className="font-mono text-xs sm:text-sm text-ink/80 font-bold mt-1">
                    {link.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Multiplayer Terminal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-deep text-text-on-deep border-4 border-border p-6 sm:p-8 shadow-brutal"
        >
          <div className="flex items-center justify-between pb-4 border-b-2 border-border-on-deep/30 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent-yellow" />
              <span className="font-heading text-lg text-accent-yellow uppercase">
                Terminal Broadcast
              </span>
            </div>
            <span className="font-pixel text-[9px] text-accent-green">/msg aditya</span>
          </div>

          <form onSubmit={handleSendTerminal} className="space-y-4">
            <div className="font-mono text-sm text-text-on-deep/80">
              <span className="text-accent-green mr-2">&gt;</span>
              <span>Type your transmission below to open direct email client:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Hello Aditya, let's collaborate on a game or web app..."
                className="flex-1 px-4 py-3 bg-surface-1 text-ink font-mono text-sm border-3 border-border placeholder:text-ink/50 focus:outline-none focus:border-focus shadow-[3px_3px_0px_#000]"
              />
              <button
                type="submit"
                className="px-6 py-3 min-h-[48px] bg-accent-yellow text-accent-ink font-pixel text-xs uppercase font-bold border-3 border-border flex items-center justify-center gap-2 hover:bg-accent-green transition-all shadow-[3px_3px_0px_#000] cursor-pointer"
              >
                <Send size={14} />
                <span>Send Packet</span>
              </button>
            </div>

            {formSent && (
              <div className="p-3 bg-accent-green text-accent-ink font-pixel text-xs border-2 border-border font-bold">
                ✓ PACKET ROUTED TO DEFAULT COMMS PROTOCOL!
              </div>
            )}
          </form>
        </motion.div>

        {/* Location & Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <div className="bg-surface-1 border-4 border-border p-6 shadow-brutal flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-red text-white border-3 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_var(--shadow)]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-pixel text-[9px] text-ink/70 uppercase">Spawn Point</div>
              <h3 className="font-heading text-lg text-ink">Located in</h3>
              <p className="font-mono text-sm text-ink font-bold">Tumkur, Karnataka, India</p>
            </div>
          </div>

          <div className="bg-surface-1 border-4 border-border p-6 shadow-brutal flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-green text-accent-ink border-3 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_var(--shadow)]">
              <span className="w-4 h-4 bg-accent-green border-2 border-border rounded-full animate-ping" />
            </div>
            <div>
              <div className="font-pixel text-[9px] text-ink/70 uppercase">Player Status</div>
              <h3 className="font-heading text-lg text-ink">Online & Ready</h3>
              <p className="font-mono text-sm text-ink font-bold">Available for opportunities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
