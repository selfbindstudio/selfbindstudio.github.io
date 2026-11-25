import { Palette } from 'lucide-react';
import { THEMES, type ThemeId } from '../data/selfbindData';

interface ThemeSwitcherProps {
  activeTheme: ThemeId;
  onChange: (theme: ThemeId) => void;
  compact?: boolean;
}

export function ThemeSwitcher({ activeTheme, onChange, compact = false }: ThemeSwitcherProps) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 ${
        compact ? '' : 'rounded-xl border border-[var(--sb-border)] p-1.5'
      }`}
      style={compact ? undefined : { backgroundColor: 'var(--sb-surface)' }}
      role="group"
      aria-label="Choose SelfBind visual theme"
    >
      {!compact && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[var(--sb-text-muted)] whitespace-nowrap shrink-0">
          <Palette className="w-3.5 h-3.5" aria-hidden="true" />
          <span>App Theme</span>
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1">
        {THEMES.map((theme) => {
          const isActive = theme.id === activeTheme;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'border border-[var(--sb-border-strong)] text-[var(--sb-text)] shadow-xs'
                  : 'border border-transparent text-[var(--sb-text-muted)] hover:text-[var(--sb-text)] hover:bg-[var(--sb-surface-elevated)]'
              }`}
              style={
                isActive
                  ? { backgroundColor: 'var(--sb-surface-elevated)' }
                  : undefined
              }
            >
              <span
                className="inline-flex h-3.5 w-3.5 rounded-full border border-black/25 overflow-hidden shrink-0"
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
    </div>
  );
}
