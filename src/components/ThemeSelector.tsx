import ThemeToggle from './ThemeToggle';

export default function ThemeSelector() {
  return (
    <div className="space-y-3">
      <div className="font-pixel text-[10px] text-ink uppercase tracking-wider mb-2">
        World Theme Slot
      </div>
      <ThemeToggle />
    </div>
  );
}
