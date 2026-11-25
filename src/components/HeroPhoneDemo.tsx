import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Clock,
  Lock,
  RotateCcw,
  Shield,
  Volume2,
  VolumeX,
  Wind,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

type DemoTab = 'impulse' | 'vault';
type ImpulsePhase = 'ready' | 'breathing' | 'decision' | 'resisted' | 'pass';

const BREATH_SECONDS = 5;
const HOLD_MS = 3000;

export function HeroPhoneDemo() {
  const [tab, setTab] = useState<DemoTab>('impulse');
  const [phase, setPhase] = useState<ImpulsePhase>('ready');
  const [secondsLeft, setSecondsLeft] = useState(BREATH_SECONDS);
  const [resistedCount, setResistedCount] = useState(14);
  const [passSeconds, setPassSeconds] = useState(300);
  const [screenshotFailed, setScreenshotFailed] = useState(false);

  // Hold 3-second intentional lock simulator inside Impulse / Lock view
  const [holdProgress, setHoldProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(3556); // 59m 16s
  const holdStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Breathing countdown timer
  useEffect(() => {
    if (phase !== 'breathing') return;
    if (secondsLeft <= 0) {
      setPhase('decision');
      return;
    }
    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase, secondsLeft]);

  // Timed access pass countdown
  useEffect(() => {
    if (phase !== 'pass') return;
    const interval = window.setInterval(() => {
      setPassSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phase]);

  // Active lock countdown
  useEffect(() => {
    if (!isLocked) return;
    const interval = window.setInterval(() => {
      setLockSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isLocked]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const triggerImpulseGuard = () => {
    setSecondsLeft(BREATH_SECONDS);
    setPhase('breathing');
  };

  const handleResist = () => {
    setResistedCount((prev) => prev + 1);
    setPhase('resisted');
  };

  const handleAccessPass = () => {
    setPassSeconds(300);
    setPhase('pass');
  };

  const resetImpulse = () => {
    setPhase('ready');
    setSecondsLeft(BREATH_SECONDS);
  };

  const startHold = () => {
    if (isLocked) return;
    holdStartRef.current = performance.now();
    const tick = (now: number) => {
      if (holdStartRef.current === null) return;
      const elapsed = now - holdStartRef.current;
      const pct = Math.min(100, (elapsed / HOLD_MS) * 100);
      setHoldProgress(pct);
      if (pct >= 100) {
        holdStartRef.current = null;
        setIsLocked(true);
        setLockSeconds(3556);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    holdStartRef.current = null;
    if (!isLocked) {
      setHoldProgress(0);
    }
  };

  const formatMMSS = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatHHMMSS = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Mode Switcher */}
      <div
        className="mb-4 inline-flex items-center gap-1 rounded-xl border border-[var(--sb-border)] p-1"
        style={{ backgroundColor: 'var(--sb-surface)' }}
        role="tablist"
        aria-label="Phone preview mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'impulse'}
          onClick={() => setTab('impulse')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            tab === 'impulse'
              ? 'text-[var(--sb-accent-ink)]'
              : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)]'
          }`}
          style={
            tab === 'impulse'
              ? { backgroundColor: 'var(--sb-accent)' }
              : undefined
          }
        >
          Interactive Impulse Guard
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'vault'}
          onClick={() => setTab('vault')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            tab === 'vault'
              ? 'text-[var(--sb-accent-ink)]'
              : 'text-[var(--sb-text-secondary)] hover:text-[var(--sb-text)]'
          }`}
          style={
            tab === 'vault'
              ? { backgroundColor: 'var(--sb-accent)' }
              : undefined
          }
        >
          App Screenshot Preview
        </button>
      </div>

      {/* Android Device Frame */}
      <div
        className="relative w-full max-w-[330px] rounded-[2.4rem] border-[3px] border-[#2C313D] bg-[#0B0C0F] p-2.5"
        style={{ boxShadow: 'var(--sb-shadow)' }}
      >
        {/* Inner screen bezel */}
        <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#13151B] text-[#F3F5F8]">
          {tab === 'vault' ? (
            <div className="relative aspect-[9/16.5] w-full bg-[#090B10]">
              {!screenshotFailed ? (
                <img
                  src="./screenshot-1.png"
                  alt="SelfBind Strict App Blocker Vault interface showing active timer and locked Instagram app"
                  referrerPolicy="no-referrer"
                  onError={() => setScreenshotFailed(true)}
                  className="h-full w-full object-cover object-bottom"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-5 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BrandLogo size={26} />
                      <span className="font-display text-sm font-bold text-white">
                        Self<span className="text-[#5D9CDB]">Bind</span>
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#D9A154]">PRO</span>
                  </div>
                  <div className="space-y-2.5 my-auto">
                    <div className="rounded-xl border border-white/10 bg-[#1B1E27] p-3">
                      <p className="text-xs text-[#9BA1AE]">Active Focus Vault</p>
                      <p className="mt-1 font-mono text-lg font-semibold text-white tabular-nums">
                        Timer #1 · 58m 22s left
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#5D9CDB]/30 bg-[#1B1E27] p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">Instagram</p>
                        <p className="text-xs text-[#5D9CDB]">Locked · Tamper Guard</p>
                      </div>
                      <Lock className="w-4 h-4 text-[#5D9CDB]" />
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#1B1E27] p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">YouTube Shorts</p>
                        <p className="text-xs text-[#47B881]">Impulse Guard Active</p>
                      </div>
                      <Shield className="w-4 h-4 text-[#47B881]" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#5D9CDB] py-2.5 text-center text-xs font-semibold text-[#08101A]">
                    Session Active · 00:59:16
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Live Interactive Impulse Guard & Hold-3s Lock Simulation */
            <div className="flex min-h-[540px] flex-col justify-between p-4">
              {/* Android status bar */}
              <div className="flex items-center justify-between px-1 pb-2 text-[11px] font-mono text-[#9BA1AE] tabular-nums">
                <span>5:14</span>
                <span className="h-3.5 w-3.5 rounded-full bg-black border border-white/10" aria-hidden="true" />
                <span>5G · 84%</span>
              </div>

              {/* SelfBind mini app header */}
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <div className="flex items-center gap-2">
                  <BrandLogo size={24} />
                  <span className="font-display text-sm font-bold tracking-tight text-white">
                    Self<span className="text-[#5D9CDB]">Bind</span>
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#47B881] tabular-nums">
                  {resistedCount} resisted today
                </span>
              </div>

              {/* Dynamic Impulse Guard Core Stage */}
              <div className="my-3 flex-1 flex flex-col justify-center">
                {phase === 'ready' && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-[#1B1E27] p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">
                          Impulse Guard Ready
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#47B881]">
                          <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                          On-Device
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#9BA1AE]">
                        Tap below to feel how SelfBind intercepts an automatic doomscroll
                        open, mutes Reels/Shorts audio, and inserts a calm breathing pause.
                      </p>
                      <button
                        type="button"
                        onClick={triggerImpulseGuard}
                        className="mt-3 w-full rounded-lg bg-[#5D9CDB] px-3 py-2.5 text-xs font-semibold text-[#08101A] hover:bg-[#73ADE6] transition-colors cursor-pointer"
                      >
                        Simulate Opening Instagram Reels
                      </button>
                    </div>

                    {/* Hold 3s to Lock interactive commitment bar */}
                    <div className="rounded-xl border border-white/10 bg-[#1B1E27] p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">
                          Strict Commitment Lock
                        </span>
                        <span className="font-mono text-[11px] text-[#9BA1AE] tabular-nums">
                          {isLocked ? formatHHMMSS(lockSeconds) : '3s hold'}
                        </span>
                      </div>
                      {!isLocked ? (
                        <>
                          <p className="mt-1 text-[11px] leading-relaxed text-[#9BA1AE]">
                            Press and hold 3 seconds to commit—no accidental taps.
                          </p>
                          <button
                            type="button"
                            onMouseDown={startHold}
                            onMouseUp={cancelHold}
                            onMouseLeave={cancelHold}
                            onTouchStart={startHold}
                            onTouchEnd={cancelHold}
                            className="relative mt-2.5 w-full overflow-hidden rounded-lg border border-[#5D9CDB]/40 bg-[#13161D] px-3 py-2.5 text-xs font-semibold text-white select-none cursor-pointer"
                          >
                            <span
                              className="absolute inset-y-0 left-0 bg-[#5D9CDB]/35 transition-none"
                              style={{ width: `${holdProgress}%` }}
                              aria-hidden="true"
                            />
                            <span className="relative z-10 inline-flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-[#5D9CDB]" aria-hidden="true" />
                              {holdProgress > 0
                                ? `Holding… ${Math.ceil(((100 - holdProgress) / 100) * 3)}s`
                                : 'Hold 3s to Lock 2 Apps'}
                            </span>
                          </button>
                        </>
                      ) : (
                        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-[#47B881]/35 bg-[#47B881]/10 px-3 py-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#47B881]">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            Vault Locked · Tamper Guard On
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setIsLocked(false);
                              setHoldProgress(0);
                            }}
                            className="text-[11px] text-[#9BA1AE] hover:text-white underline cursor-pointer"
                          >
                            Reset demo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {phase === 'breathing' && (
                  <div className="flex flex-col items-center text-center py-3">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#D9A154]">
                      <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reels audio paused &amp; muted automatically</span>
                    </div>

                    {/* Calm Breathing Ring */}
                    <div className="relative my-6 flex h-36 w-36 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full border border-[#5D9CDB]/40 bg-[#5D9CDB]/10 transition-transform duration-1000 ease-in-out"
                        style={{
                          transform:
                            secondsLeft % 2 === 1 ? 'scale(1.06)' : 'scale(0.86)',
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-4 rounded-full border border-[#47B881]/45 bg-[#1B1E27]"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <Wind className="w-5 h-5 text-[#5D9CDB] mb-1" aria-hidden="true" />
                        <span className="font-mono text-2xl font-bold text-white tabular-nums">
                          {secondsLeft}s
                        </span>
                        <span className="text-[11px] text-[#9BA1AE]">
                          {secondsLeft > 2 ? 'Inhale slowly' : 'Exhale calmly'}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-white">
                      Pause before opening Instagram
                    </p>
                    <p className="mt-1 text-xs text-[#9BA1AE]">
                      Do you genuinely need this app right now?
                    </p>
                  </div>
                )}

                {phase === 'decision' && (
                  <div className="flex flex-col items-center text-center py-2 space-y-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#47B881]/15 text-[#47B881]">
                      <Shield className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">
                        Still want to open Instagram?
                      </p>
                      <p className="mt-1 text-xs text-[#9BA1AE]">
                        Background media stays muted until you choose. Audio restores cleanly
                        when you exit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResist}
                      className="w-full rounded-lg bg-[#5D9CDB] px-4 py-2.5 text-xs font-semibold text-[#08101A] hover:bg-[#73ADE6] transition-colors cursor-pointer"
                    >
                      Close App &amp; Protect Focus
                    </button>
                    <button
                      type="button"
                      onClick={handleAccessPass}
                      className="w-full rounded-lg border border-white/15 bg-[#1B1E27] px-4 py-2.5 text-xs font-medium text-[#D6DBE5] hover:bg-[#242834] transition-colors cursor-pointer"
                    >
                      Continue with 5-Min Access Pass
                    </button>
                  </div>
                )}

                {phase === 'resisted' && (
                  <div className="flex flex-col items-center text-center py-4 space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#47B881]/15 text-[#47B881]">
                      <Check className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">Impulse Resisted</p>
                      <p className="mt-1 text-xs text-[#9BA1AE]">
                        Saved locally to your Android Room streak. Audio focus restored cleanly.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#47B881]">
                      <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>System audio restored</span>
                    </div>
                    <button
                      type="button"
                      onClick={resetImpulse}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#1B1E27] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#242834] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Try Again</span>
                    </button>
                  </div>
                )}

                {phase === 'pass' && (
                  <div className="flex flex-col items-center text-center py-4 space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#5D9CDB]/15 text-[#5D9CDB]">
                      <Clock className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Timed Access Pass Active
                      </p>
                      <p className="mt-1 font-mono text-2xl font-bold text-[#5D9CDB] tabular-nums">
                        {formatMMSS(passSeconds)}
                      </p>
                      <p className="mt-1 text-xs text-[#9BA1AE]">
                        Instagram auto-locks when the 5-minute window ends. Audio restored.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetImpulse}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#1B1E27] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#242834] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>End Pass &amp; Reset Demo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom SelfBind navigation mirror */}
              <div className="grid grid-cols-4 border-t border-white/8 pt-2.5 text-center text-[10px] font-medium text-[#828998]">
                <span className="text-[#5D9CDB]">Vault</span>
                <span>Automation</span>
                <span>Browser</span>
                <span>Analytics</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
