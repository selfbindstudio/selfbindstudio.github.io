import { BrandLogo } from './BrandLogo';
import {
  GITHUB_REPO_URL,
  GOOGLE_PLAY_URL,
  PRIVACY_POLICY_URL,
  SUPPORT_EMAIL,
} from '../data/selfbindData';

export function Footer() {
  return (
    <footer className="border-t border-[var(--sb-border)] py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BrandLogo size={28} />
          <div className="text-xs text-[var(--sb-text-muted)]">
            <span className="font-semibold text-[var(--sb-text)]">SelfBind Studio</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>© 2026 SelfBind Studio</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--sb-text-secondary)]">
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
          >
            Google Play
          </a>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
          >
            Privacy Policy
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
          >
            GitHub
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
