import {
  BarChart3,
  CalendarClock,
  Lock,
  Palette,
  ShieldAlert,
  VolumeX,
  Wind,
} from 'lucide-react';
import { THEMES, type ThemeId } from '../data/selfbindData';

interface FeaturesBentoProps {
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const WEEK_BARS = [
  { day: 'Sat', hours: 0, pct: 6 },
  { day: 'Sun', hours: 0, pct: 6 },
  { day: 'Mon', hours: 1.5, pct: 24 },
  { day: 'Tue', hours: 2.0, pct: 32 },
  { day: 'Wed', hours: 2.4, pct: 38 },
  { day: 'Thu', hours: 6.2, pct: 92 },
  { day: 'Today', hours: 3.1, pct: 52, current: true },
];

export function FeaturesBento({ activeTheme, onThemeChange }: FeaturesBentoProps) {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[var(--sb-text-muted)]">
            Core System · Mindful Friction Meets Strict Locking
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
            Built to stop automatic habits before they steal an hour
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
            Willpower fades when you are tired. SelfBind combines gentle behavioral pauses with
            tamper-resistant Android locks you configure while calm and intentional.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 01. Impulse Guard — Wide Dominant Card */}
          <article
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[var(--sb-border)] p-6 sm:p-8"
            style={{ backgroundColor: 'var(--sb-surface)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  01 · Mindful Interception
                </p>
                <Wind className="w-5 h-5 text-[var(--sb-accent)]" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--sb-text)]">
                Impulse Guard
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sb-text-secondary)] max-w-xl">
                Break the reflex loop when your thumb reaches for social apps. SelfBind inserts a
                deliberate pause so conscious choice replaces autopilot scrolling.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-[var(--sb-border)] pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Calm Breathing Pause
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  A serene, timed breathing overlay appears before distracting apps open, giving
                  your prefrontal cortex time to catch up.
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-sm font-semibold text-[var(--sb-text)]">
                  <VolumeX className="w-4 h-4 text-[var(--sb-emerald)] shrink-0" aria-hidden="true" />
                  <span>Auto-Pause &amp; Mute Media</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Instantly pauses and silences background Reels and Shorts audio when the guard
                  triggers—and cleanly restores system audio afterward.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Timed Access Passes
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Need to reply to a message? Grant yourself a deliberate 2, 5, or 10-minute
                  window before the app re-locks automatically.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-[var(--sb-text)]">
                  Daily Open Limits <span className="font-mono text-xs text-[var(--sb-amber)]">· Pro</span>
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                  Cap total daily launches per app so five-minute check-ins never turn into
                  thirty impulse opens.
                </dd>
              </div>
            </dl>
          </article>

          {/* 02. Strict App Blocker & Focus Timer */}
          <article
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--sb-border)] p-6 sm:p-8"
            style={{ backgroundColor: 'var(--sb-surface)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  02 · Unbreakable Commitment
                </p>
                <Lock className="w-5 h-5 text-[var(--sb-accent)]" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--sb-text)]">
                Strict App Blocker &amp; Focus Timer
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                Lock selected apps behind real commitment mechanics that hold firm when
                temptation spikes.
              </p>
            </div>

            <ul className="mt-7 space-y-4 border-t border-[var(--sb-border)] pt-6 text-sm text-[var(--sb-text-secondary)]">
              <li className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs font-semibold text-[var(--sb-accent)]">01</span>
                <span>
                  <strong className="font-semibold text-[var(--sb-text)]">Intentional 3-Second Lock:</strong>{' '}
                  Hold to confirm before starting a timer so you never lock critical apps by accident.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs font-semibold text-[var(--sb-accent)]">02</span>
                <span>
                  <strong className="font-semibold text-[var(--sb-text)]">Real Commitment &amp; No-Mercy Mode (Pro):</strong>{' '}
                  Choose an optional Emergency Unlock deterrent or hide the unlock button completely until the timer hits zero.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs font-semibold text-[var(--sb-accent)]">03</span>
                <span>
                  <strong className="font-semibold text-[var(--sb-text)]">Multi-Timer Vault (Pro):</strong>{' '}
                  Run independent simultaneous timers—keep social media locked all day while blocking messaging for 90 minutes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs font-semibold text-[var(--sb-emerald)]">04</span>
                <span>
                  <strong className="font-semibold text-[var(--sb-text)]">Optional Anti-Uninstall Device Admin:</strong>{' '}
                  Prevents uninstalling SelfBind or tampering with system time mid-session. Emergency phone calls stay accessible at all times.
                </span>
              </li>
            </ul>
          </article>

          {/* 03. Focus Schedules & Daily Screen Time Limits (Pro) */}
          <article
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--sb-border)] p-6 sm:p-8"
            style={{ backgroundColor: 'var(--sb-surface)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  03 · Automation · Pro
                </p>
                <CalendarClock className="w-5 h-5 text-[var(--sb-accent)]" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--sb-text)]">
                Focus Schedules &amp; Daily Screen Time Limits
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                Put your boundaries on autopilot. Configure recurring weekly schedules and
                per-app daily time quotas so discipline runs without daily setup.
              </p>
            </div>

            <div className="mt-7 space-y-3 border-t border-[var(--sb-border)] pt-6">
              <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                One-Tap Schedule Presets
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
                <div
                  className="flex items-center justify-between rounded-xl border border-[var(--sb-border)] px-4 py-3"
                  style={{ backgroundColor: 'var(--sb-surface-elevated)' }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--sb-text)]">Deep Work</p>
                    <p className="text-xs text-[var(--sb-text-muted)]">Mon – Fri</p>
                  </div>
                  <span className="font-mono text-xs font-medium text-[var(--sb-accent)] tabular-nums">
                    9:00 AM – 5:00 PM
                  </span>
                </div>
                <div
                  className="flex items-center justify-between rounded-xl border border-[var(--sb-border)] px-4 py-3"
                  style={{ backgroundColor: 'var(--sb-surface-elevated)' }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--sb-text)]">Evening Study</p>
                    <p className="text-xs text-[var(--sb-text-muted)]">Daily Quota + Lock</p>
                  </div>
                  <span className="font-mono text-xs font-medium text-[var(--sb-accent)] tabular-nums">
                    6:00 PM – 10:00 PM
                  </span>
                </div>
                <div
                  className="flex items-center justify-between rounded-xl border border-[var(--sb-border)] px-4 py-3"
                  style={{ backgroundColor: 'var(--sb-surface-elevated)' }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--sb-text)]">Sleep Guard</p>
                    <p className="text-xs text-[var(--sb-text-muted)]">Every Night</p>
                  </div>
                  <span className="font-mono text-xs font-medium text-[var(--sb-emerald)] tabular-nums">
                    10:30 PM – 7:00 AM
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* 04. Analytics, Streaks & 4 Built-In Themes */}
          <article
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[var(--sb-border)] p-6 sm:p-8"
            style={{ backgroundColor: 'var(--sb-surface)' }}
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                  04 · Reclaimed Attention &amp; Personalization
                </p>
                <BarChart3 className="w-5 h-5 text-[var(--sb-emerald)]" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--sb-text)]">
                Local Analytics, Streaks &amp; 4 Built-In Themes
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                Track focus hours reclaimed, consecutive active streaks, and resisted impulse
                opens—all computed privately on your device with zero cloud sync.
              </p>
            </div>

            {/* Clean inline 7-day locked hours chart preview */}
            <div className="mt-7 grid grid-cols-1 gap-6 border-t border-[var(--sb-border)] pt-6 sm:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                    7-Day Reclaimed Focus
                  </p>
                  <p className="font-mono text-sm font-semibold text-[var(--sb-emerald)] tabular-nums">
                    15.2h this week
                  </p>
                </div>

                <div className="mt-4 flex h-28 items-end justify-between gap-2">
                  {WEEK_BARS.map((bar) => (
                    <div
                      key={bar.day}
                      className="flex flex-1 flex-col items-center gap-1.5"
                    >
                      <div className="flex h-20 w-full items-end rounded-md bg-[var(--sb-surface-elevated)] p-0.5">
                        <div
                          className="w-full rounded-sm transition-all duration-300"
                          style={{
                            height: `${bar.pct}%`,
                            backgroundColor: bar.current
                              ? 'var(--sb-accent)'
                              : bar.hours > 0
                                ? 'var(--sb-emerald)'
                                : 'var(--sb-border)',
                          }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[var(--sb-text-muted)]">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive 4-Theme selector synced with page theme */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--sb-text-muted)]">
                    <Palette className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview SelfBind&apos;s 4 Built-In Themes</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {THEMES.map((theme) => {
                      const active = theme.id === activeTheme;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => onThemeChange(theme.id)}
                          aria-pressed={active}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'border-[var(--sb-accent)] text-[var(--sb-text)]'
                              : 'border-[var(--sb-border)] text-[var(--sb-text-secondary)] hover:border-[var(--sb-border-strong)] hover:text-[var(--sb-text)]'
                          }`}
                          style={{
                            backgroundColor: active
                              ? 'var(--sb-accent-soft)'
                              : 'var(--sb-surface-elevated)',
                          }}
                        >
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-black/25 shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${theme.swatchBg} 50%, ${theme.swatchAccent} 50%)`,
                            }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{theme.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--sb-text-muted)]">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[var(--sb-amber)]" aria-hidden="true" />
                  <span>Click any theme above to switch this entire page live.</span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
