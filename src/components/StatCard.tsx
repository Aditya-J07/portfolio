import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  suffix?: string;
  color?: string;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  suffix = '',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-1 border-4 border-border p-5 text-center shadow-brutal transition-transform hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-surface-deep text-accent-yellow border-3 border-border flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_var(--shadow)]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl sm:text-4xl font-heading text-ink">
        {typeof value === 'number' ? displayValue : value}
        <span className="text-accent-yellow ml-0.5">{suffix}</span>
      </div>
      <div className="font-pixel text-[9px] uppercase text-ink/80 mt-2 font-bold tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}
