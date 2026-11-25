import { useState } from 'react';
import {
  CreditCard,
  Database,
  ExternalLink,
  HardDrive,
  ShieldCheck,
} from 'lucide-react';
import {
  PERMISSIONS,
  PRIVACY_POLICY_URL,
  type PermissionCategory,
} from '../data/selfbindData';

const PERMISSION_FILTERS: { id: PermissionCategory; label: string }[] = [
  { id: 'all', label: 'All Permissions (7)' },
  { id: 'core', label: 'Core Blocking' },
  { id: 'media-bg', label: 'Media & Background' },
  { id: 'optional', label: 'Optional & Billing' },
];

export function PrivacyPermissionsSection() {
  const [filter, setFilter] = useState<PermissionCategory>('all');

  const filteredPermissions =
    filter === 'all'
      ? PERMISSIONS
      : PERMISSIONS.filter((p) => p.category === filter);

  return (
    <>
      {/* Section 1: 100% On-Device Privacy Architecture */}
      <section
        id="privacy"
        className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[var(--sb-emerald)]">
                Privacy Architecture · Verified Against Official Policy
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
                100% on-device. Zero accounts. Zero tracking.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
                An app blocker sees when you launch your apps—so trust is non-negotiable.
                SelfBind runs entirely locally on your Android device without remote servers,
                ad SDKs, or cloud backups.
              </p>
            </div>

            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-[var(--sb-border-strong)] px-4 py-2.5 text-xs font-semibold text-[var(--sb-text)] hover:bg-[var(--sb-surface)] transition-colors whitespace-nowrap shrink-0 sm:self-auto"
            >
              <span>Read Full Privacy Policy</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div
              className="rounded-2xl border border-[var(--sb-border)] p-6"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <ShieldCheck className="w-5 h-5 text-[var(--sb-emerald)]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-bold text-[var(--sb-text)]">
                Zero Data Collection
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                No sign-up, no email required, no third-party analytics, no advertising SDKs,
                and zero data transmitted to remote servers.
              </p>
            </div>

            <div
              className="rounded-2xl border border-[var(--sb-border)] p-6"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <Database className="w-5 h-5 text-[var(--sb-accent)]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-bold text-[var(--sb-text)]">
                Android Room (SQLite)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                All focus sessions, schedules, streaks, and locked app lists are stored purely
                in a local Android Room SQLite database on your phone.
              </p>
            </div>

            <div
              className="rounded-2xl border border-[var(--sb-border)] p-6"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <HardDrive className="w-5 h-5 text-[var(--sb-accent)]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-bold text-[var(--sb-text)]">
                Cloud Auto-Backup Disabled
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                Explicitly configured with{' '}
                <code className="font-mono text-xs text-[var(--sb-text)]">
                  allowBackup=&quot;false&quot;
                </code>{' '}
                so your usage history stays off cloud drives. Clear app data or uninstall to
                erase everything instantly.
              </p>
            </div>

            <div
              className="rounded-2xl border border-[var(--sb-border)] p-6"
              style={{ backgroundColor: 'var(--sb-surface)' }}
            >
              <CreditCard className="w-5 h-5 text-[var(--sb-amber)]" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-bold text-[var(--sb-text)]">
                Google Play Billing Only
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                Optional Pro upgrades (Monthly, Lifetime) and Emergency Unlocks are processed
                exclusively by Google Play Billing—SelfBind never sees card or billing data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Transparent Permissions Breakdown */}
      <section
        id="permissions"
        className="scroll-mt-20 border-t border-[var(--sb-border)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                Transparent Android Permissions · Plain-English Audit
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--sb-text)] sm:text-4xl">
                Every permission explained—nothing hidden
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--sb-text-secondary)]">
                SelfBind requests only the exact Android system APIs required to enforce strict
                app locks, pause Reels audio, and survive device reboots.
              </p>
            </div>

            {/* Functional category filter buttons */}
            <div
              className="inline-flex flex-wrap items-center gap-1 self-start rounded-xl border border-[var(--sb-border)] p-1 lg:self-auto"
              style={{ backgroundColor: 'var(--sb-surface)' }}
              role="group"
              aria-label="Filter permissions by category"
            >
              {PERMISSION_FILTERS.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    aria-pressed={active}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'text-[var(--sb-accent-ink)]'
                        : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)]'
                    }`}
                    style={active ? { backgroundColor: 'var(--sb-accent)' } : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean hairline-divided permission audit table/list */}
          <div
            className="mt-10 divide-y divide-[var(--sb-border)] overflow-hidden rounded-2xl border border-[var(--sb-border)]"
            style={{ backgroundColor: 'var(--sb-surface)' }}
          >
            {filteredPermissions.map((perm) => (
              <div
                key={perm.id}
                className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-4">
                  <p className="text-xs font-medium text-[var(--sb-text-muted)]">
                    {perm.categoryLabel}
                    {perm.optional ? ' · Optional' : ' · Required'}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-[var(--sb-text)]">
                    {perm.name}
                  </h3>
                  <div className="mt-2.5 flex flex-col gap-1">
                    {perm.constants.map((constant) => (
                      <code
                        key={constant}
                        className="break-all font-mono text-xs text-[var(--sb-accent)]"
                      >
                        {constant}
                      </code>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-2.5">
                  <p className="text-sm leading-relaxed text-[var(--sb-text)]">
                    {perm.purpose}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--sb-text-secondary)]">
                    <span className="font-semibold text-[var(--sb-emerald)]">
                      Privacy boundary:
                    </span>{' '}
                    {perm.guarantee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
