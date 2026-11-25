import { ExternalLink, Mail } from 'lucide-react';
import { BrandLogo, GooglePlayIcon } from './BrandLogo';
import {
  GITHUB_REPO_URL,
  GOOGLE_PLAY_URL,
  PRIVACY_POLICY_URL,
  SUPPORT_EMAIL,
} from '../data/selfbindData';

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--sb-border)] py-14"
      style={{ backgroundColor: 'var(--sb-bg-subtle)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5 text-[var(--sb-text)]">
              <BrandLogo size={34} />
              <span className="font-display text-base font-bold tracking-tight">
                SelfBind Studio
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--sb-text-secondary)]">
              SelfBind: Strict App Blocker &amp; Clean Browser for Android. Built for
              unbreakable focus, mindful pauses, and 100% on-device privacy.
            </p>
            <div className="mt-5">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: 'var(--sb-accent)',
                  color: 'var(--sb-accent-ink)',
                }}
              >
                <GooglePlayIcon className="w-3.5 h-3.5" />
                <span>Download on Google Play</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[var(--sb-text)]">Product</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[var(--sb-text-secondary)]">
              <li>
                <a href="#features" className="hover:text-[var(--sb-text)] transition-colors">
                  Core Features
                </a>
              </li>
              <li>
                <a href="#screenshots" className="hover:text-[var(--sb-text)] transition-colors">
                  App Screenshots
                </a>
              </li>
              <li>
                <a href="#clean-browser" className="hover:text-[var(--sb-text)] transition-colors">
                  Clean Browser
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[var(--sb-text)] transition-colors">
                  On-Device Privacy
                </a>
              </li>
              <li>
                <a href="#permissions" className="hover:text-[var(--sb-text)] transition-colors">
                  Android Permissions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[var(--sb-text)]">
              Legal &amp; Support
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-[var(--sb-text-secondary)]">
              <li>
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--sb-text)] transition-colors"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--sb-text)] transition-colors"
                >
                  <span>Google Play Store</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--sb-text)] transition-colors"
                >
                  <span>Issue Tracker (GitHub)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--sb-text)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
                  <span>{SUPPORT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--sb-border)] pt-6 text-xs text-[var(--sb-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SelfBind Studio. All rights reserved.</p>
          <p>Android Room SQLite · allowBackup=&quot;false&quot; · Zero Data Collection</p>
        </div>
      </div>
    </footer>
  );
}
