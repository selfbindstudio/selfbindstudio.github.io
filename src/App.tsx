import { useEffect, useState } from 'react';
import { Expand, Shield } from 'lucide-react';
import { BrandLogo, GooglePlayIcon } from './components/BrandLogo';
import { CleanBrowserSection } from './components/CleanBrowserSection';
import { FeaturesBento } from './components/FeaturesBento';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PrivacyPermissionsSection } from './components/PrivacyPermissionsSection';
import { ScreenshotShowcase } from './components/ScreenshotShowcase';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import {
  GOOGLE_PLAY_URL,
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
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [externalLightbox, setExternalLightbox] = useState<{
    src: string;
    title: string;
  } | null>(null);

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
        {/* Clean, Stark Hero Section */}
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left: Human Copy + Primary CTA + 4-Theme Switcher */}
              <div className="lg:col-span-7">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  SelfBind for Android · 100% On-Device
                </p>

                <h1
                  className="mt-4 font-display font-extrabold tracking-tight text-[var(--sb-text)]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.4vw, 3.6rem)',
                    lineHeight: 1.08,
                  }}
                >
                  Stop doomscrolling and break phone addiction for good
                </h1>

                <div
                  className="selfbind-rule mt-6 h-0.5 w-24 rounded-full"
                  aria-hidden="true"
                />

                <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--sb-text-secondary)] sm:text-lg">
                  A strict Android app blocker with calm breathing pauses and a
                  distraction-free browser. No accounts, no tracking—just quiet focus.
                </p>

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
                    href="#screenshots"
                    className="text-sm font-medium text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)] transition-colors whitespace-nowrap"
                  >
                    See screenshots
                  </a>
                </div>

                <div className="mt-10">
                  <ThemeSwitcher activeTheme={theme} onChange={setTheme} />
                </div>
              </div>

              {/* Right: Clean Static Real App Screenshot */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setExternalLightbox({
                      src: './screenshot-1.png',
                      title: 'Strict App Vault',
                    })
                  }
                  className="group relative w-full max-w-[300px] overflow-hidden rounded-2xl border border-[var(--sb-border)] bg-[#090B10] text-left cursor-pointer transition-colors hover:border-[var(--sb-border-strong)]"
                  style={{ boxShadow: 'var(--sb-shadow)' }}
                  aria-label="Zoom SelfBind Strict App Vault screenshot"
                >
                  {!heroImgFailed ? (
                    <img
                      src="./screenshot-1.png"
                      alt="SelfBind Strict App Blocker Android app showing active focus timer and locked Instagram app"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgFailed(true)}
                      className="aspect-[9/16] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex aspect-[9/16] flex-col justify-between p-6 text-white">
                      <Shield className="w-5 h-5 text-[#5D9CDB]" aria-hidden="true" />
                      <div>
                        <p className="font-display text-xl font-bold">
                          Lock Apps. No Excuses.
                        </p>
                        <p className="mt-2 text-sm text-[#9BA1AE]">
                          Unbreakable focus timers that stop doomscrolling.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#828998]">
                        ./screenshot-1.png
                      </span>
                    </div>
                  )}
                  <span
                    className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Expand className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Concise Core Capabilities */}
        <FeaturesBento />

        {/* Real Android Screenshots + Zoom Lightbox */}
        <ScreenshotShowcase
          externalLightbox={externalLightbox}
          onCloseExternalLightbox={() => setExternalLightbox(null)}
        />

        {/* Clean Browser Split */}
        <CleanBrowserSection
          onZoomScreenshot={(src, title) => setExternalLightbox({ src, title })}
        />

        {/* On-Device Privacy & Collapsible Permissions Accordion */}
        <PrivacyPermissionsSection />

        {/* Quiet Final Download Section */}
        <section className="border-t border-[var(--sb-border)] py-20 sm:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <BrandLogo size={46} />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              Take your attention back
            </h2>
            <p className="mt-3 text-base text-[var(--sb-text-secondary)]">
              Free to start on Android. Optional Pro upgrades via Google Play.
            </p>
            <div className="mt-7">
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
