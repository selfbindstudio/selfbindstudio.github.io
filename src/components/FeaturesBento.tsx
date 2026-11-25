const CAPABILITIES = [
  {
    title: 'Impulse Guard',
    body: 'Adds a calm breathing pause before distracting apps open, auto-pauses and mutes Reels or Shorts audio (restoring it cleanly afterward), and lets you take short timed access passes. Pro adds daily open limits.',
  },
  {
    title: 'Strict Focus Locks',
    body: 'Hold 3 seconds to start an intentional lock timer. Stay accountable with optional anti-uninstall Device Admin protection, Multi-Timer Vault (Pro), and No-Mercy Mode (Pro)—while emergency calls always stay reachable.',
  },
  {
    title: 'Schedules & Daily Limits',
    body: 'Set recurring schedules for work, study, or sleep, and cap daily time per app automatically with one-tap presets in Pro.',
  },
  {
    title: 'Local Analytics & 4 Themes',
    body: 'Track focus hours reclaimed, active streaks, and resisted opens strictly on your phone, styled across Classic Dark, Nordic Slate, Sky Daylight, and Zen Sand.',
  },
] as const;

export function FeaturesBento() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
            Gentle friction when you slip. Strict locks when you mean it.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
            Built for people who are done relying on willpower alone.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <div
              key={item.title}
              className="border-t border-[var(--sb-border)] pt-6"
            >
              <h3 className="font-display text-lg font-bold tracking-tight text-[var(--sb-text)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sb-text-secondary)] sm:text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
