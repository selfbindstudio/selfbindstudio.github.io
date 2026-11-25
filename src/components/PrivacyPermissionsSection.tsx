import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { PERMISSIONS, PRIVACY_POLICY_URL } from '../data/selfbindData';

export function PrivacyPermissionsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="privacy"
      className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Concise On-Device Privacy Statement */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
              100% on-device. Zero tracking.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--sb-text-secondary)]">
              SelfBind never asks for an account, collects zero personal data, and includes no
              ads or third-party trackers.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
              Your timers, streaks, and locked apps stay strictly in local{' '}
              <strong className="font-semibold text-[var(--sb-text)]">
                Android Room (SQLite)
              </strong>{' '}
              storage with cloud auto-backup turned off (
              <code className="font-mono text-xs text-[var(--sb-text)]">
                allowBackup=&quot;false&quot;
              </code>
              ). Optional Pro upgrades (Monthly, Lifetime) and Emergency Unlocks are handled
              solely through{' '}
              <strong className="font-semibold text-[var(--sb-text)]">
                Google Play Billing
              </strong>
              .
            </p>

            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sb-accent)] hover:underline whitespace-nowrap"
            >
              <span>Read full Privacy Policy</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Compact Collapsible Permissions Accordion */}
          <div id="permissions" className="scroll-mt-24 lg:col-span-7">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-bold tracking-tight text-[var(--sb-text)]">
                Why SelfBind asks for permissions
              </h3>
              <span className="text-xs text-[var(--sb-text-muted)]">
                Tap any item to inspect
              </span>
            </div>

            <div className="divide-y divide-[var(--sb-border)] border-y border-[var(--sb-border)]">
              {PERMISSIONS.map((perm) => {
                const isOpen = openId === perm.id;
                return (
                  <div key={perm.id}>
                    <button
                      type="button"
                      onClick={() => toggleItem(perm.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[var(--sb-accent)] cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-[var(--sb-text)]">
                        {perm.name}
                        {perm.optional && (
                          <span className="ml-2 text-xs font-normal text-[var(--sb-text-muted)]">
                            · Optional
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[var(--sb-text-muted)] transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 pr-6 space-y-2">
                        <code className="block break-all font-mono text-xs text-[var(--sb-accent)]">
                          {perm.constants}
                        </code>
                        <p className="text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                          {perm.summary}
                        </p>
                        <p className="text-xs leading-relaxed text-[var(--sb-text-muted)]">
                          {perm.boundary}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
