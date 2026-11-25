import { useState } from 'react';
import {
  Check,
  Globe,
  Lock,
  ShieldCheck,
  Trash2,
  Type,
} from 'lucide-react';
import { SAFE_SEARCH_ENGINES } from '../data/selfbindData';

type EngineId = (typeof SAFE_SEARCH_ENGINES)[number]['id'];

const ZOOM_LEVELS = [
  { label: '90%', scaleClass: 'text-xs' },
  { label: '100%', scaleClass: 'text-sm' },
  { label: '115%', scaleClass: 'text-base' },
] as const;

export function CleanBrowserSection() {
  const [engineId, setEngineId] = useState<EngineId>('google');
  const [zoomIndex, setZoomIndex] = useState<number>(1);
  const [dataCleared, setDataCleared] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const activeEngine =
    SAFE_SEARCH_ENGINES.find((e) => e.id === engineId) ?? SAFE_SEARCH_ENGINES[0];

  const handleClearData = () => {
    setDataCleared(true);
    window.setTimeout(() => setDataCleared(false), 2600);
  };

  return (
    <section
      id="clean-browser"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Explanation & Interactive Clean Browser Preview */}
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[var(--sb-text-muted)]">
              Built-In Distraction-Free Web · SafeSearch Enforced
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              Search the web without falling into social feeds
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
              Locking social apps does not help if your mobile browser pulls you right back into
              Reels or YouTube Shorts. SelfBind includes a dedicated Clean Browser built strictly
              for reading, studying, and looking things up.
            </p>

            {/* Interactive Clean Browser Sandbox Card */}
            <div
              className="mt-8 rounded-2xl border border-[var(--sb-border)] p-5 sm:p-6"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              {/* SafeSearch Engine Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sb-border)] pb-4">
                <div
                  className="inline-flex flex-wrap items-center gap-1"
                  role="tablist"
                  aria-label="SafeSearch engines supported by Clean Browser"
                >
                  {SAFE_SEARCH_ENGINES.map((engine) => {
                    const selected = engine.id === engineId;
                    return (
                      <button
                        key={engine.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setEngineId(engine.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          selected
                            ? 'text-[var(--sb-accent-ink)]'
                            : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)] hover:bg-[var(--sb-surface-elevated)]'
                        }`}
                        style={
                          selected
                            ? { backgroundColor: 'var(--sb-accent)' }
                            : undefined
                        }
                      >
                        {engine.name}
                      </button>
                    );
                  })}
                </div>

                {/* One-tap text zoom control */}
                <div className="inline-flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[var(--sb-text-muted)]" aria-hidden="true" />
                  {ZOOM_LEVELS.map((z, idx) => (
                    <button
                      key={z.label}
                      type="button"
                      onClick={() => setZoomIndex(idx)}
                      aria-pressed={zoomIndex === idx}
                      className={`rounded-md px-2 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                        zoomIndex === idx
                          ? 'border border-[var(--sb-border-strong)] text-[var(--sb-text)]'
                          : 'border border-transparent text-[var(--sb-text-muted)] hover:text-[var(--sb-text)]'
                      }`}
                      style={
                        zoomIndex === idx
                          ? { backgroundColor: 'var(--sb-surface-elevated)' }
                          : undefined
                      }
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Address Bar */}
              <div
                className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--sb-border)] px-3.5 py-2.5"
                style={{ backgroundColor: 'var(--sb-surface-elevated)' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--sb-emerald)] tabular-nums shrink-0">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    {activeEngine.blockedCount}
                  </span>
                  <span className="truncate font-mono text-xs text-[var(--sb-text-secondary)]">
                    {activeEngine.host}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClearData}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--sb-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)] transition-colors cursor-pointer shrink-0"
                >
                  {dataCleared ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--sb-emerald)]" aria-hidden="true" />
                      <span className="text-[var(--sb-emerald)]">Browsing Data Cleared</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Clear Browsing Data</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Zoomable Reading Preview */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-[var(--sb-emerald)]">
                  {activeEngine.note}
                </p>
                <h3 className="font-display text-base font-bold text-[var(--sb-text)]">
                  {activeEngine.sampleTitle}
                </h3>
                <p
                  className={`leading-relaxed text-[var(--sb-text-secondary)] transition-all duration-150 ${ZOOM_LEVELS[zoomIndex].scaleClass}`}
                >
                  {activeEngine.sampleSnippet}
                </p>
              </div>
            </div>

            {/* Clean Capability List */}
            <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Blocks Social Feeds, Reels &amp; Shorts
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Automatically filters out infinite-scroll feeds, Instagram Reels, and YouTube
                  Shorts before they render.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Built-In Ad &amp; Tracker Blocking
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Cuts noisy ad banners and third-party tracking scripts right inside the browser
                  shield.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Tab Preservation &amp; One-Tap Zoom
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Keep study articles open across sessions, resize dense text in one tap, and
                  wipe cookies or history whenever you choose.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold text-[var(--sb-text)]">
                  <Lock className="w-3.5 h-3.5 text-[var(--sb-amber)] shrink-0" aria-hidden="true" />
                  <span>External Browser Locking · Pro</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Lock Chrome, Firefox, or Brave during focus timers while keeping SelfBind&apos;s
                  Clean Browser available for research.
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Official Clean Browser Screenshot */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-[var(--sb-border)] bg-[#090B10]"
              style={{ boxShadow: 'var(--sb-shadow)' }}
            >
              {!imgFailed ? (
                <img
                  src="./screenshot-2.png"
                  alt="SelfBind Clean Browser showing SafeSearch results with 22 trackers blocked and zero ads or Shorts"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="aspect-[9/16] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[9/16] flex-col justify-between p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#47B881]">
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    <span>Clean Browser · SafeSearch Active</span>
                  </div>
                  <div className="space-y-3">
                    <p className="font-display text-2xl font-bold">
                      Browse Without Traps
                    </p>
                    <p className="text-sm text-[#9BA1AE]">
                      4 SafeSearch engines · No Shorts, social feeds, or ads.
                    </p>
                  </div>
                  <p className="font-mono text-xs text-[#828998]">./screenshot-2.png</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
