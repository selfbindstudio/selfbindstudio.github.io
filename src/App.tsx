import { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo, GooglePlayIcon } from './components/BrandLogo';
import { CleanBrowserSection } from './components/CleanBrowserSection';
import { FeaturesBento } from './components/FeaturesBento';
import { Footer } from './components/Footer';
import { HeroPhoneDemo } from './components/HeroPhoneDemo';
import { Navbar } from './components/Navbar';
import { PrivacyPermissionsSection } from './components/PrivacyPermissionsSection';
import { ScreenshotShowcase } from './components/ScreenshotShowcase';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import {
  GOOGLE_PLAY_URL,
  PRIVACY_POLICY_URL,
  THEMES,
  type ThemeId,
} from './data/selfbindData';

const THEME_STORAGE_KEY = 'selfbind-landing-theme';

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'classic-dark';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (
    stored === 'classic-dark' ||
    stored === 'nordic-slate' ||
    stored === 'sky-daylight' ||
    stored === 'zen-sand'
  ) {
    return stored;
  }
  return 'classic-dark';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    const activeOption = THEMES.find((t) => t.id === theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && activeOption) {
      metaThemeColor.setAttribute('content', activeOption.swatchBg);
    }
  }, [theme]);

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--sb-bg)', color: 'var(--sb-text)' }}
    >
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
          {/* Restrained ambient lighting echoing SelfBind Play Store artwork */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full blur-[120px]"
            style={{ backgroundColor: 'var(--sb-glow-blue)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-40 right-1/4 h-80 w-80 rounded-full blur-[120px]"
            style={{ backgroundColor: 'var(--sb-glow-emerald)' }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Hero Copy Column */}
              <div className="lg:col-span-7">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  SelfBind: Strict App Blocker · Android · 100% On-Device
                </p>

                <h1
                  className="mt-4 font-display font-extrabold tracking-tight text-[var(--sb-text)]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.3vw, 3.75rem)',
                    lineHeight: 1.08,
                  }}
                >
                  Stop doomscrolling and break phone addiction for good
                </h1>

                <div
                  className="selfbind-rule mt-6 h-0.5 w-28 rounded-full"
                  aria-hidden="true"
                />

                <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--sb-text-secondary)] sm:text-lg">
                  SelfBind blends mindful friction with unbreakable app locking. Pause automatic
                  habits with Impulse Guard&apos;s breathing overlay, silence autoplay Reels,
                  browse cleanly without feeds, and commit to strict focus timers—all stored
                  privately on your device.
                </p>

                {/* Primary CTA + Secondary Text Link */}
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href={GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-150"
                    style={{
                      backgroundColor: 'var(--sb-accent)',
                      color: 'var(--sb-accent-ink)',
                    }}
                  >
                    <GooglePlayIcon className="w-4 h-4" />
                    <span>Download on Google Play</span>
                  </a>

                  <a
                    href="#privacy"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
                  >
                    <ShieldCheck className="w-4 h-4 text-[var(--sb-emerald)]" aria-hidden="true" />
                    <span>Inspect Privacy &amp; Permissions</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>

                {/* Live 4-Theme Switcher */}
                <div className="mt-9">
                  <ThemeSwitcher activeTheme={theme} onChange={setTheme} />
                </div>
              </div>

              {/* Hero Interactive Phone Frame */}
              <div className="lg:col-span-5">
                <HeroPhoneDemo />
              </div>
            </div>

            {/* Full-Width Verifiable Architecture Strip */}
            <dl
              className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-[var(--sb-border)] p-6 lg:grid-cols-4"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <div>
                <dt className="text-xs font-medium text-[var(--sb-text-muted)]">
                  Storage Architecture
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[var(--sb-text)]">
                  Android Room SQLite
                </dd>
                <dd className="mt-0.5 font-mono text-xs text-[var(--sb-text-muted)]">
                  allowBackup=&quot;false&quot;
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[var(--sb-text-muted)]">
                  Data Collection
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[var(--sb-emerald)]">
                  Zero Trackers or Ads
                </dd>
                <dd className="mt-0.5 text-xs text-[var(--sb-text-muted)]">
                  No login or cloud sync
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[var(--sb-text-muted)]">
                  Clean Browser Engines
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[var(--sb-text)] tabular-nums">
                  4 SafeSearch Engines
                </dd>
                <dd className="mt-0.5 text-xs text-[var(--sb-text-muted)]">
                  DuckDuckGo, Google, Bing, Brave
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-[var(--sb-text-muted)]">
                  Commitment Safeguards
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[var(--sb-text)]">
                  3s Lock &amp; Tamper Guard
                </dd>
                <dd className="mt-0.5 text-xs text-[var(--sb-text-muted)]">
                  Emergency calls always reachable
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Core Features Asymmetric Bento Grid */}
        <FeaturesBento activeTheme={theme} onThemeChange={setTheme} />

        {/* App Screenshots Showcase */}
        <ScreenshotShowcase />

        {/* Dedicated Clean Browser Spotlight */}
        <CleanBrowserSection />

        {/* 100% On-Device Privacy & Transparent Permissions */}
        <PrivacyPermissionsSection />

        {/* Final Focused Conversion Section */}
        <section className="border-t border-[var(--sb-border)] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-2xl border border-[var(--sb-border)] p-8 text-center sm:p-12"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <div className="flex justify-center">
                <BrandLogo size={52} />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
                Reclaim your attention—on your own terms
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[var(--sb-text-secondary)]">
                Start with core focus timers, Impulse Guard breathing pauses, and the Clean
                Browser for free on Android. Upgrade to Pro via Google Play whenever you want
                recurring schedules, Multi-Timer Vault, or No-Mercy Mode.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors"
                  style={{
                    backgroundColor: 'var(--sb-accent)',
                    color: 'var(--sb-accent-ink)',
                  }}
                >
                  <GooglePlayIcon className="w-4 h-4" />
                  <span>Download on Google Play</span>
                </a>
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--sb-border-strong)] px-5 py-3.5 text-sm font-semibold text-[var(--sb-text)] hover:bg-[var(--sb-surface-elevated)] transition-colors whitespace-nowrap"
                >
                  <span>Read Privacy Policy</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
