import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Shield, X } from 'lucide-react';
import { SCREENSHOTS, type ScreenshotItem } from '../data/selfbindData';

function ScreenshotCard({
  item,
  index,
  onOpen,
}: {
  item: ScreenshotItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--sb-border)] transition-colors duration-150 hover:border-[var(--sb-border-strong)]"
      style={{ backgroundColor: 'var(--sb-surface)' }}
    >
      {/* Android showcase frame */}
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="relative block w-full overflow-hidden bg-[#090B10] text-left cursor-pointer focus-visible:outline-offset-[-2px]"
        aria-label={`Inspect ${item.title} screenshot`}
      >
        <div className="aspect-[9/16] w-full overflow-hidden">
          {!failed ? (
            <img
              src={item.src}
              alt={`${item.title} — SelfBind Android screenshot (${item.screenLabel})`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            /* Clean resilient fallback before local images are uploaded */
            <div className="flex h-full w-full flex-col justify-between bg-[#0E1016] p-6 text-[#F3F5F8]">
              <div>
                <p className="font-mono text-xs text-[#5D9CDB]">{item.screenLabel}</p>
                <p className="mt-2 font-display text-xl font-bold leading-snug text-white">
                  {item.title}
                </p>
                <div className="selfbind-rule mt-3 h-0.5 w-16 rounded-full" />
              </div>

              <div className="mx-auto my-4 w-full max-w-[210px] rounded-[1.75rem] border border-white/15 bg-[#161922] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#828998]">
                  <span>SelfBind</span>
                  <Shield className="w-3.5 h-3.5 text-[#47B881]" aria-hidden="true" />
                </div>
                {item.fallbackMetrics.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-lg border border-white/8 bg-[#1E222E] px-3 py-2 text-xs font-medium text-[#E4E7EE]"
                  >
                    {metric}
                  </div>
                ))}
              </div>

              <p className="font-mono text-[11px] text-[#828998]">
                {item.src}
              </p>
            </div>
          )}
        </div>

        <span
          className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
          aria-hidden="true"
        >
          <Expand className="w-4 h-4" />
        </span>
      </button>

      {/* Editorial Caption */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-medium text-[var(--sb-text-muted)]">
            0{index + 1} · {item.screenLabel}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold tracking-tight text-[var(--sb-text)]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
            {item.caption}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ScreenshotShowcase() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = showAll
    ? SCREENSHOTS
    : SCREENSHOTS.filter((item) => item.featured);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  return (
    <section
      id="screenshots"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[var(--sb-text-muted)]">
              Interface Gallery · Built for Android
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              Calm surfaces designed to quiet impulse
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
              Every screen in SelfBind removes visual noise—leaving clear timers, honest
              friction, and verifiable focus metrics.
            </p>
          </div>

          {/* Interactive segmented filter */}
          <div
            className="inline-flex items-center gap-1 self-start rounded-xl border border-[var(--sb-border)] p-1 sm:self-auto"
            style={{ backgroundColor: 'var(--sb-surface)' }}
            role="group"
            aria-label="Filter app screenshots"
          >
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                setLightboxIndex(null);
              }}
              aria-pressed={!showAll}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                !showAll
                  ? 'text-[var(--sb-accent-ink)]'
                  : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)]'
              }`}
              style={!showAll ? { backgroundColor: 'var(--sb-accent)' } : undefined}
            >
              Core Screens (3)
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAll(true);
                setLightboxIndex(null);
              }}
              aria-pressed={showAll}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                showAll
                  ? 'text-[var(--sb-accent-ink)]'
                  : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)]'
              }`}
              style={showAll ? { backgroundColor: 'var(--sb-accent)' } : undefined}
            >
              Full Walkthrough (6)
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, idx) => (
            <ScreenshotCard
              key={item.id}
              item={item}
              index={idx}
              onOpen={(i) => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#12141A]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-xs font-mono text-[#9BA1AE]">
                  {lightboxIndex + 1} / {visibleItems.length} · {activeLightboxItem.screenLabel}
                </p>
                <p className="font-display text-sm font-bold text-white">
                  {activeLightboxItem.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close screenshot preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1 overflow-auto bg-[#090B10]">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[72vh] w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
