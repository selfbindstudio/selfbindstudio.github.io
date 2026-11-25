export type ThemeId = 'classic-dark' | 'nordic-slate' | 'sky-daylight' | 'zen-sand';

export const GOOGLE_PLAY_URL = '[PASTE_YOUR_GOOGLE_PLAY_URL_HERE]';
export const PRIVACY_POLICY_URL = 'https://sites.google.com/view/selfbind-privacy/';
export const SUPPORT_EMAIL = 'vishnuaravind.mech@gmail.com';
export const GITHUB_REPO_URL = 'https://github.com/VISHNU-ARAVIND-99/LockIn';
export const SITE_URL = 'https://selfbindstudio.github.io/';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  mode: 'Dark' | 'Light';
  description: string;
  swatchBg: string;
  swatchSurface: string;
  swatchAccent: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'classic-dark',
    name: 'Classic Dark',
    mode: 'Dark',
    description: 'Deep obsidian canvas with steel-blue and emerald focus accents.',
    swatchBg: '#0C0D11',
    swatchSurface: '#1C202A',
    swatchAccent: '#5D9CDB',
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate',
    mode: 'Dark',
    description: 'Cool slate twilight palette crafted for late-night study sessions.',
    swatchBg: '#0E151F',
    swatchSurface: '#1E2C3E',
    swatchAccent: '#68ACEC',
  },
  {
    id: 'sky-daylight',
    name: 'Sky Daylight',
    mode: 'Light',
    description: 'Crisp high-contrast daylight surfaces for bright work environments.',
    swatchBg: '#F5F8FC',
    swatchSurface: '#FFFFFF',
    swatchAccent: '#2264BF',
  },
  {
    id: 'zen-sand',
    name: 'Zen Sand',
    mode: 'Light',
    description: 'Warm archival paper tones that soften glare during long reading.',
    swatchBg: '#F4F1EA',
    swatchSurface: '#FCFBF7',
    swatchAccent: '#2B5F82',
  },
];

export interface ScreenshotItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  screenLabel: string;
  featured: boolean;
  fallbackMetrics: string[];
}

export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'vault',
    src: './screenshot-1.png',
    title: 'Lock Apps. No Excuses.',
    caption: 'Select distracting apps, hold 3 seconds to commit, and enforce unbreakable countdown timers.',
    screenLabel: 'App Vault',
    featured: true,
    fallbackMetrics: ['1 Active Timer', 'Instagram Locked · 59m left', 'Hold 3s to Commit'],
  },
  {
    id: 'browser',
    src: './screenshot-2.png',
    title: 'Browse Without Traps',
    caption: 'Built-in Clean Browser strips Reels, Shorts, algorithmic feeds, and ads across 4 SafeSearch engines.',
    screenLabel: 'Clean Browser',
    featured: true,
    fallbackMetrics: ['22 Trackers Blocked', 'SafeSearch Enforced', 'No Shorts or Feeds'],
  },
  {
    id: 'analytics',
    src: './screenshot-3.png',
    title: 'See Hours You Reclaim',
    caption: 'Monitor focus streaks, 7-day locked hours, resisted impulse opens, and most-blocked apps locally.',
    screenLabel: 'Focus Analytics',
    featured: true,
    fallbackMetrics: ['26.6h Reclaimed This Week', '3-Day Active Streak', '62 Attempts Blocked'],
  },
  {
    id: 'tamper-guard',
    src: './screenshot-4.png',
    title: 'Real Skin in the Game',
    caption: 'Tamper Guard blocks uninstalling SelfBind or changing system time, with optional No-Mercy Mode.',
    screenLabel: 'Tamper Guard',
    featured: false,
    fallbackMetrics: ['Tamper Guard Active', 'System Settings Protected', 'No-Mercy Mode (Pro)'],
  },
  {
    id: 'schedules',
    src: './screenshot-5.png',
    title: 'Focus on Autopilot',
    caption: 'Recurring weekday schedules, daily app quotas, and one-tap Work, Study, and Sleep presets.',
    screenLabel: 'Automation',
    featured: false,
    fallbackMetrics: ['Mon–Fri · 9:00 AM–5:00 PM', '10:30 PM–7:00 AM Sleep', 'Per-App Daily Limits'],
  },
  {
    id: 'permissions',
    src: './screenshot-6.png',
    title: '100% Private & On-Device',
    caption: 'Transparent 4-step permission checklist with zero sign-in, zero analytics SDKs, and local Room storage.',
    screenLabel: 'Privacy Setup',
    featured: false,
    fallbackMetrics: ['4 / 4 Permissions Active', 'Zero Login Required', 'Android Room SQLite'],
  },
];

export type PermissionCategory = 'all' | 'core' | 'media-bg' | 'optional';

export interface PermissionItem {
  id: string;
  name: string;
  constants: string[];
  category: Exclude<PermissionCategory, 'all'>;
  categoryLabel: string;
  optional?: boolean;
  purpose: string;
  guarantee: string;
}

export const PERMISSIONS: PermissionItem[] = [
  {
    id: 'usage-access',
    name: 'Usage Access',
    constants: ['android.permission.PACKAGE_USAGE_STATS'],
    category: 'core',
    categoryLabel: 'Core Blocking',
    purpose:
      'Queries recent foreground UsageEvents strictly on-device to detect when a locked app, Impulse Guard app, or protected system settings screen opens.',
    guarantee:
      'Never reads, captures, stores, or transmits screen content, personal messages, keystrokes, passwords, photos, or browsing history.',
  },
  {
    id: 'display-overlay',
    name: 'Display Over Other Apps',
    constants: ['android.permission.SYSTEM_ALERT_WINDOW'],
    category: 'core',
    categoryLabel: 'Core Blocking',
    purpose:
      'Renders full-screen focus lock screens, Impulse Guard calm breathing pause overlays, and mini-window guard banners immediately over blocked apps.',
    guarantee:
      'Only activates during an active focus session, scheduled window, or Impulse Guard trigger you explicitly configure.',
  },
  {
    id: 'launcher-visibility',
    name: 'App Launcher Visibility',
    constants: ['<queries> ACTION_MAIN / CATEGORY_LAUNCHER'],
    category: 'core',
    categoryLabel: 'Core Blocking',
    purpose:
      'Lists launchable apps installed on your Android device so you can choose which apps to include in lock timers, schedules, or Impulse Guard.',
    guarantee:
      'Processed strictly in local memory and Android Room SQLite. Your installed app list never leaves your phone.',
  },
  {
    id: 'media-silence',
    name: 'Media Silence & Process Control',
    constants: ['KILL_BACKGROUND_PROCESSES', 'REORDER_TASKS', 'AudioManager'],
    category: 'media-bg',
    categoryLabel: 'Media & Background',
    purpose:
      'Automatically pauses and mutes background Reels, Shorts, and autoplay audio the moment an overlay triggers, then restores your audio cleanly afterward.',
    guarantee:
      'Used exclusively to silence distracting media during interruptions—never records audio or accesses your microphone.',
  },
  {
    id: 'device-admin',
    name: 'Device Administrator',
    constants: ['android.permission.BIND_DEVICE_ADMIN'],
    category: 'optional',
    categoryLabel: 'Optional Safeguard',
    optional: true,
    purpose:
      'Optional anti-uninstall protection that blocks removing SelfBind or bypassing Tamper Guard while a commitment timer is actively running.',
    guarantee:
      'SelfBind does not request or use remote wipe, password reset, camera disable, or device factory-reset policies. Emergency calls remain accessible at all times.',
  },
  {
    id: 'background-reliability',
    name: 'Background Reliability & Battery Exemption',
    constants: [
      'FOREGROUND_SERVICE_SPECIAL_USE',
      'SCHEDULE_EXACT_ALARM',
      'RECEIVE_BOOT_COMPLETED',
      'REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
    ],
    category: 'media-bg',
    categoryLabel: 'Media & Background',
    purpose:
      'Maintains countdown timers in the notification drawer and fires exact revival alarms so active locks and recurring schedules survive reboots and OEM battery sweeps.',
    guarantee:
      'Lightweight event-driven foreground enforcement engineered for minimal battery overhead with zero background data uploads.',
  },
  {
    id: 'internet-access',
    name: 'Internet Access',
    constants: ['INTERNET', 'ACCESS_NETWORK_STATE'],
    category: 'optional',
    categoryLabel: 'Billing & Clean Browser',
    purpose:
      'Used strictly for official Google Play Billing (Pro upgrades & Emergency Unlock), Google Play In-App Reviews, and web pages you visit in the optional Clean Browser.',
    guarantee:
      'Zero telemetry pings, zero crash-reporting trackers, and zero third-party ad networks. SelfBind never receives or stores payment card details.',
  },
];

export const SAFE_SEARCH_ENGINES = [
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    host: 'duckduckgo.com/?kp=1',
    note: 'Strict SafeSearch locked · No search history profiling',
    sampleTitle: 'Self-binding (Ulysses pact) — Behavioral Psychology',
    sampleSnippet:
      'Precommitment places intentional barriers while calm and rational so impulsive triggers lose leverage later.',
    blockedCount: 19,
  },
  {
    id: 'google',
    name: 'Google',
    host: 'google.com/search?safe=active',
    note: 'SafeSearch enforced · Ad trackers & Shorts carousel stripped',
    sampleTitle: 'Self-binding in psychology — Precommitment strategies',
    sampleSnippet:
      'Often compared to Ulysses tying himself to the mast to resist the Sirens, self-binding reduces reliance on willpower when temptation hits.',
    blockedCount: 22,
  },
  {
    id: 'bing',
    name: 'Bing',
    host: 'bing.com/search?adlt=strict',
    note: 'Strict filter forced · Sponsored cards removed',
    sampleTitle: 'Habit Friction & Attention Recovery Research',
    sampleSnippet:
      'Adding a deliberate 5-second breathing pause before social feeds interrupts automatic dopamine loops.',
    blockedCount: 24,
  },
  {
    id: 'brave',
    name: 'Brave Search',
    host: 'search.brave.com/search?safesearch=strict',
    note: 'Independent index · Tracker scripts blocked at WebView layer',
    sampleTitle: 'Digital Minimalism & Intentional Smartphone Boundaries',
    sampleSnippet:
      'Separating information lookup from algorithmic feeds preserves utility without losing hours to infinite scroll.',
    blockedCount: 16,
  },
] as const;
