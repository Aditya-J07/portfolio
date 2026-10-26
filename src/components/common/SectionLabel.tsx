interface SectionLabelProps {
  slot: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionLabel({
  slot,
  title,
  subtitle,
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 ${className}`}>
      <div className="inline-flex items-center gap-2">
        <span className="px-2.5 py-1 bg-surface-deep text-accent-yellow font-pixel text-[10px] border-2 border-border shadow-[2px_2px_0px_var(--shadow)]">
          {slot}
        </span>
        <h2 className="font-heading text-2xl md:text-3xl text-ink uppercase tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <span className="font-body text-xs md:text-sm text-ink/75 font-semibold">
          // {subtitle}
        </span>
      )}
    </div>
  );
}
