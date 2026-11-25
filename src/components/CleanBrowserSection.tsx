import { useState } from 'react';
import { Expand, Globe } from 'lucide-react';

interface CleanBrowserSectionProps {
  onZoomScreenshot?: (src: string, title: string) => void;
}

const HIGHLIGHTS = [
  'Blocks social feeds, Instagram Reels, and YouTube Shorts automatically.',
  'Enforces SafeSearch across DuckDuckGo, Google, Bing, and Brave.',
  'Cuts ads and trackers, preserves tabs, and offers one-tap text zoom plus Clear Browsing Data.',
  'Lock external browsers like Chrome during focus timers with Pro.',
] as const;

export function CleanBrowserSection({ onZoomScreenshot }: CleanBrowserSectionProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="clean-browser"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              A Clean Browser without the traps
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--sb-text-secondary)]">
              Locking social apps only works if your browser doesn&apos;t pull you straight back
              into feeds. SelfBind includes a quiet, distraction-free browser just for looking
              things up and reading.
            </p>

            <ul className="mt-8 space-y-3.5 text-sm leading-relaxed text-[var(--sb-text-secondary)] sm:text-[15px]">
              {HIGHLIGHTS.map((line) => (
                <li
                  key={line}
                  className="border-t border-[var(--sb-border)] pt-3.5 text-[var(--sb-text)]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={() =>
                onZoomScreenshot?.('./screenshot-2.png', 'Clean Browser')
              }
              className="group relative w-full max-w-[300px] overflow-hidden rounded-2xl border border-[var(--sb-border)] bg-[#090B10] text-left cursor-pointer transition-colors hover:border-[var(--sb-border-strong)]"
              style={{ boxShadow: 'var(--sb-shadow)' }}
              aria-label="Zoom Clean Browser screenshot"
            >
              {!imgFailed ? (
                <img
                  src="./screenshot-2.png"
                  alt="SelfBind Clean Browser showing SafeSearch results with trackers blocked and no Shorts or feeds"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="aspect-[9/16] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex aspect-[9/16] flex-col justify-between p-6 text-white">
                  <Globe className="w-5 h-5 text-[#47B881]" aria-hidden="true" />
                  <div>
                    <p className="font-display text-xl font-bold">Clean Browser</p>
                    <p className="mt-2 text-sm text-[#9BA1AE]">
                      4 SafeSearch engines. No Reels, Shorts, feeds, or ads.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#828998]">./screenshot-2.png</span>
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
  );
}
