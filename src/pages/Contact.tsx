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
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'adityajha.contact@gmail.com',
    href: 'mailto:adityajha.contact@gmail.com',
    color: 'text-accent-red',
    tag: 'DIRECT',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Aditya-J07',
    href: 'https://github.com/Aditya-J07',
    color: 'text-ink',
    tag: 'CODE',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'aditya-jha-sit',
    href: 'https://www.linkedin.com/in/aditya-jha-sit',
    color: 'text-focus',
    tag: 'NETWORK',
  },
  {
    icon: Gamepad2,
    label: 'itch.io',
    value: 'prolly-adi',
    href: 'https://prolly-adi.itch.io/',
    color: 'text-accent-purple',
    tag: 'GAMES',
  },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const buildBody = () => {
    return `Hi Aditya,\n\n${message.trim()}\n\n---\nFrom: ${name.trim() || 'Visitor'}\nSender Contact: ${
      email.trim() || 'Not specified'
    }\nSent from Aditya Jha Portfolio (Contact Dispatcher)`;
  };

  const getSubject = () => {
    return subject.trim() || `Portfolio Message from ${name.trim() || 'Visitor'}`;
  };

  const handleSendMailto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const mailtoUrl = `mailto:adityajha.contact@gmail.com?subject=${encodeURIComponent(
      getSubject()
    )}&body=${encodeURIComponent(buildBody())}`;

    // Direct navigation triggers OS default mail client without empty tab popup issues
    window.location.href = mailtoUrl;

    setStatusMsg('✓ Message pre-loaded! Check your email client and press Send to deliver.');
    setTimeout(() => setStatusMsg(null), 6000);
  };

  const handleOpenGmail = () => {
    if (!message.trim()) return;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=adityajha.contact@gmail.com&su=${encodeURIComponent(
      getSubject()
    )}&body=${encodeURIComponent(buildBody())}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setStatusMsg('✓ Opened Gmail Web composer in a new tab! Press Send in Gmail to deliver.');
    setTimeout(() => setStatusMsg(null), 6000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adityajha.contact@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="font-heading text-3xl sm:text-4xl text-ink uppercase tracking-tight">
            Contact
          </h1>
          <p className="font-body text-ink text-base sm:text-lg max-w-2xl leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate.
            Feel free to reach out through any channel below.
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

        {/* Direct Message Composer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-deep text-text-on-deep border-4 border-border p-6 sm:p-8 shadow-brutal"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-border-on-deep/30 mb-6">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-accent-yellow" />
              <span className="font-heading text-lg sm:text-xl text-accent-yellow uppercase tracking-tight">
                Send a Message
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="font-pixel text-[8px] uppercase px-2.5 py-1 bg-surface-1 text-ink border border-border flex items-center gap-1.5 hover:bg-accent-yellow transition-colors select-none cursor-pointer font-bold shadow-[2px_2px_0px_#000]"
                title="Copy Aditya's email address"
              >
                {copied ? <Check size={11} className="text-accent-green" /> : <Copy size={11} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSendMailto} className="space-y-4">
            <p className="font-mono text-xs sm:text-sm text-text-on-deep/80 leading-relaxed">
              <span className="text-accent-green font-bold mr-2">&gt;</span>
              Fill in your thoughts below. Clicking send will open your email with everything pre-filled so you can deliver directly from your own inbox!
            </p>

            {/* Name & Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-pixel text-[9px] text-accent-yellow uppercase mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Hunter"
                  className="w-full px-3.5 py-2.5 bg-surface-1 text-ink font-mono text-sm border-3 border-border placeholder:text-ink/40 focus:outline-none focus:border-focus shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div>
                <label className="block font-pixel text-[9px] text-accent-yellow uppercase mb-1">
                  Your Email / Contact (Optional)
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 bg-surface-1 text-ink font-mono text-sm border-3 border-border placeholder:text-ink/40 focus:outline-none focus:border-focus shadow-[2px_2px_0px_#000]"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-pixel text-[9px] text-accent-yellow uppercase mb-1">
                Topic / Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Collaboration on Godot game or AI tool"
                className="w-full px-3.5 py-2.5 bg-surface-1 text-ink font-mono text-sm border-3 border-border placeholder:text-ink/40 focus:outline-none focus:border-focus shadow-[2px_2px_0px_#000]"
              />
            </div>

            {/* Message Area */}
            <div>
              <label className="block font-pixel text-[9px] text-accent-yellow uppercase mb-1">
                Message Body <span className="text-accent-red">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Aditya, I was checking out your portfolio and loved your work on Knightfall and Neura-Beats! Would love to chat about..."
                className="w-full px-3.5 py-2.5 bg-surface-1 text-ink font-mono text-sm border-3 border-border placeholder:text-ink/40 focus:outline-none focus:border-focus shadow-[2px_2px_0px_#000] resize-y"
              />
            </div>

            {/* Actions Toolbar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={!message.trim()}
                className={`flex-1 min-w-[200px] min-h-[46px] px-5 py-3 font-pixel text-xs uppercase font-bold border-3 border-border flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_#000] select-none ${
                  !message.trim()
                    ? 'bg-surface-1/60 text-ink/40 cursor-not-allowed opacity-75'
                    : 'bg-accent-yellow text-accent-ink hover:bg-accent-green cursor-pointer hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <Send size={14} />
                <span>Open in Mail App</span>
              </button>

              <button
                type="button"
                onClick={handleOpenGmail}
                disabled={!message.trim()}
                className={`min-h-[46px] px-5 py-3 font-pixel text-xs uppercase font-bold border-3 border-border flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_#000] select-none ${
                  !message.trim()
                    ? 'bg-surface-1/60 text-ink/40 cursor-not-allowed opacity-75'
                    : 'bg-surface-1 text-ink hover:bg-accent-yellow hover:text-accent-ink cursor-pointer hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                }`}
                title="Open directly in Google Chrome / Gmail webmail"
              >
                <ExternalLink size={14} />
                <span>Open in Gmail (Web)</span>
              </button>
            </div>

            {/* Status Feedback Alert */}
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-accent-green text-accent-ink font-pixel text-xs border-3 border-border font-bold shadow-[2px_2px_0px_#000]"
              >
                {statusMsg}
              </motion.div>
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
              <div className="font-pixel text-[9px] text-ink/70 uppercase">Location</div>
              <h3 className="font-heading text-lg text-ink">Based in</h3>
              <p className="font-mono text-sm text-ink font-bold">Tumkur, Karnataka, India</p>
            </div>
          </div>

          <div className="bg-surface-1 border-4 border-border p-6 shadow-brutal flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-green text-accent-ink border-3 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_var(--shadow)]">
              <span className="w-4 h-4 bg-accent-green border-2 border-border rounded-full animate-ping" />
            </div>
            <div>
              <div className="font-pixel text-[9px] text-ink/70 uppercase">Status</div>
              <h3 className="font-heading text-lg text-ink">Online & Active</h3>
              <p className="font-mono text-sm text-ink font-bold">Available for opportunities</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
