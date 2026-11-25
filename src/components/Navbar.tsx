import { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { BrandLogo, GooglePlayIcon } from './BrandLogo';
import { GOOGLE_PLAY_URL, PRIVACY_POLICY_URL } from '../data/selfbindData';

const NAV_LINKS = [
  { label: 'Features', href: '#features', external: false },
  { label: 'Screenshots', href: '#screenshots', external: false },
  { label: 'Clean Browser', href: '#clean-browser', external: false },
  { label: 'Privacy', href: '#privacy', external: false },
  { label: 'Permissions', href: '#permissions', external: false },
  { label: 'Privacy Policy', href: PRIVACY_POLICY_URL, external: true },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--sb-border)] backdrop-blur-md"
      style={{ backgroundColor: 'var(--sb-header-bg)' }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[var(--sb-text)]"
          aria-label="SelfBind Studio home"
        >
          <BrandLogo size={32} />
          <span className="font-display text-base font-bold tracking-tight">
            SelfBind Studio
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--sb-text-secondary)]"
        >
          {NAV_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 hover:text-[var(--sb-text)] transition-colors duration-150"
              >
                <span>{item.label}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-65" aria-hidden="true" />
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap shrink-0 hover:text-[var(--sb-text)] transition-colors duration-150"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150"
            style={{
              backgroundColor: 'var(--sb-accent)',
              color: 'var(--sb-accent-ink)',
            }}
          >
            <GooglePlayIcon className="w-3.5 h-3.5" />
            <span>Get it on Google Play</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--sb-border)] text-[var(--sb-text)] hover:bg-[var(--sb-surface)] transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[var(--sb-border)] px-4 py-4 sm:px-6"
          style={{ backgroundColor: 'var(--sb-surface)' }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--sb-text-secondary)] hover:bg-[var(--sb-surface-elevated)] hover:text-[var(--sb-text)] transition-colors"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-4 h-4 opacity-70" aria-hidden="true" />
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--sb-text-secondary)] hover:bg-[var(--sb-surface-elevated)] hover:text-[var(--sb-text)] transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
              style={{
                backgroundColor: 'var(--sb-accent)',
                color: 'var(--sb-accent-ink)',
              }}
            >
              <GooglePlayIcon className="w-4 h-4" />
              <span>Get it on Google Play</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
