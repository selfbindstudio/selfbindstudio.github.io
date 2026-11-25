import { THEMES, type ThemeId } from '../data/selfbindData';

interface ThemeSwitcherProps {
  activeTheme: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export function ThemeSwitcher({ activeTheme, onChange }: ThemeSwitcherProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--sb-border)] p-1"
      style={{ backgroundColor: 'var(--sb-surface)' }}
      role="group"
      aria-label="Theme"
    >
      {THEMES.map((theme) => {
        const isActive = theme.id === activeTheme;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onChange(theme.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
              isActive
                ? 'text-[var(--sb-text)] border border-[var(--sb-border-strong)]'
                : 'text-[var(--sb-text-muted)] border border-transparent hover:text-[var(--sb-text)]'
            }`}
            style={
              isActive
                ? { backgroundColor: 'var(--sb-surface-elevated)' }
                : undefined
            }
          >
            <span
              className="h-3 w-3 rounded-full border border-black/25 shrink-0"
              aria-hidden="true"
              style={{
                background: `linear-gradient(135deg, ${theme.swatchBg} 52%, ${theme.swatchAccent} 52%)`,
              }}
            />
            <span>{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
}
