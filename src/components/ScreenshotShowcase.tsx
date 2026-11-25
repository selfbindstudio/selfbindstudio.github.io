import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Shield, X } from 'lucide-react';
import { SCREENSHOTS, type ScreenshotItem } from '../data/selfbindData';

interface ScreenshotShowcaseProps {
  externalLightbox: { src: string; title: string } | null;
  onCloseExternalLightbox: () => void;
}

function ScreenshotFrame({
  item,
  onClick,
}: {
  item: ScreenshotItem;
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="group flex flex-col">
      <button
        type="button"
        onClick={onClick}
        className="relative block w-full overflow-hidden rounded-2xl border border-[var(--sb-border)] bg-[#090B10] text-left cursor-pointer transition-colors hover:border-[var(--sb-border-strong)]"
        aria-label={`View ${item.title} full screen`}
      >
        <div className="aspect-[9/16] w-full overflow-hidden">
          {!failed ? (
            <img
              src={item.src}
              alt={`SelfBind Android screenshot — ${item.title}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-6 text-white">
              <Shield className="w-5 h-5 text-[#5D9CDB]" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-bold">{item.title}</p>
                <p className="mt-1.5 text-xs text-[#9BA1AE]">{item.caption}</p>
              </div>
              <span className="font-mono text-[11px] text-[#828998]">{item.src}</span>
            </div>
          )}
        </div>

        <span
          className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
          aria-hidden="true"
        >
          <Expand className="w-3.5 h-3.5" />
        </span>
      </button>

      <figcaption className="mt-3.5 px-0.5">
        <p className="font-display text-sm font-bold text-[var(--sb-text)]">
          {item.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--sb-text-secondary)]">
          {item.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function ScreenshotShowcase({
  externalLightbox,
  onCloseExternalLightbox,
}: ScreenshotShowcaseProps) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = showAll
    ? SCREENSHOTS
    : SCREENSHOTS.filter((item) => item.featured);

  const isOpen = lightboxIndex !== null || externalLightbox !== null;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        onCloseExternalLightbox();
      }
      if (lightboxIndex !== null && e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      }
      if (lightboxIndex !== null && e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, lightboxIndex, visibleItems.length, onCloseExternalLightbox]);

  const activeModal =
    lightboxIndex !== null
      ? {
          src: visibleItems[lightboxIndex].src,
          title: visibleItems[lightboxIndex].title,
          canStep: true,
        }
      : externalLightbox
        ? {
            src: externalLightbox.src,
            title: externalLightbox.title,
            canStep: false,
          }
        : null;

  const closeModal = () => {
    setLightboxIndex(null);
    onCloseExternalLightbox();
  };

  return (
    <section
      id="screenshots"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              Inside SelfBind
            </h2>
            <p className="mt-2 text-base text-[var(--sb-text-secondary)]">
              Tap any screen to inspect it up close.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowAll((prev) => !prev);
              setLightboxIndex(null);
            }}
            className="self-start text-sm font-medium text-[var(--sb-accent)] hover:underline whitespace-nowrap cursor-pointer sm:self-auto"
          >
            {showAll ? 'Show 3 core screens' : 'View all 6 screens'}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, idx) => (
            <ScreenshotFrame
              key={item.id}
              item={item}
              onClick={() => setLightboxIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Click-to-zoom Lightbox */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeModal.title}
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111318]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-display text-sm font-bold text-white">
                {activeModal.title}
              </p>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-[#090B10]">
              <img
                src={activeModal.src}
                alt={activeModal.title}
                referrerPolicy="no-referrer"
                className="mx-auto max-h-[75vh] w-auto object-contain"
              />
            </div>

            {activeModal.canStep && lightboxIndex !== null && (
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <span className="font-mono text-xs text-[#9BA1AE] tabular-nums">
                  {lightboxIndex + 1} / {visibleItems.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
