export type ThemeId = 'classic-dark' | 'nordic-slate' | 'sky-daylight' | 'zen-sand';

export const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.selfbind.app';
export const PRIVACY_POLICY_URL =
  'https://sites.google.com/view/selfbind-privacy/';
export const SUPPORT_EMAIL = 'vishnuaravind.mech@gmail.com';
export const GITHUB_REPO_URL = 'https://github.com/VISHNU-ARAVIND-99/LockIn';
export const SITE_URL = 'https://selfbindstudio.github.io/';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  swatchBg: string;
  swatchAccent: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'classic-dark',
    name: 'Classic Dark',
    swatchBg: '#0C0D11',
    swatchAccent: '#5D9CDB',
  },
  {
    id: 'nordic-slate',
    name: 'Nordic Slate',
    swatchBg: '#0E151F',
    swatchAccent: '#68ACEC',
  },
  {
    id: 'sky-daylight',
    name: 'Sky Daylight',
    swatchBg: '#F5F8FC',
    swatchAccent: '#2264BF',
  },
  {
    id: 'zen-sand',
    name: 'Zen Sand',
    swatchBg: '#F4F1EA',
    swatchAccent: '#2B5F82',
  },
];

export interface ScreenshotItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  featured: boolean;
}

export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'vault',
    src: './screenshot-1.png',
    title: 'Strict App Vault',
    caption: 'Pick distracting apps, hold 3 seconds to lock, and stay focused.',
    featured: true,
  },
  {
    id: 'browser',
    src: './screenshot-2.png',
    title: 'Clean Browser',
    caption: 'Search with SafeSearch enforced—no Reels, Shorts, feeds, or ads.',
    featured: true,
  },
  {
    id: 'analytics',
    src: './screenshot-3.png',
    title: 'Focus Analytics',
    caption: 'See reclaimed hours, active streaks, and blocked attempts locally.',
    featured: true,
  },
  {
    id: 'tamper-guard',
    src: './screenshot-4.png',
    title: 'Tamper Guard',
    caption: 'Blocks uninstalling or changing device time until the timer ends.',
    featured: false,
  },
  {
    id: 'schedules',
    src: './screenshot-5.png',
    title: 'Focus Schedules',
    caption: 'Automate work, study, and sleep locks with daily app limits.',
    featured: false,
  },
  {
    id: 'permissions',
    src: './screenshot-6.png',
    title: 'On-Device Privacy',
    caption: 'Zero accounts, zero trackers, and clear permission controls.',
    featured: false,
  },
];

export interface PermissionItem {
  id: string;
  name: string;
  constants: string;
  optional?: boolean;
  summary: string;
  boundary: string;
}

export const PERMISSIONS: PermissionItem[] = [
  {
    id: 'usage-access',
    name: 'Usage Access',
    constants: 'android.permission.PACKAGE_USAGE_STATS',
    summary:
      'Checks which app is currently in the foreground so SelfBind can trigger locks or Impulse Guard locally.',
    boundary:
      'Never reads screen content, messages, keystrokes, passwords, photos, or browsing history.',
  },
  {
    id: 'display-overlay',
    name: 'Display Over Other Apps',
    constants: 'android.permission.SYSTEM_ALERT_WINDOW',
    summary:
      'Shows full-screen lock screens, breathing pause overlays, and mini-window guard banners over blocked apps.',
    boundary:
      'Only displays when an active timer, schedule, or Impulse Guard rule is triggered.',
  },
  {
    id: 'launcher-visibility',
    name: 'App Launcher Visibility',
    constants: '<queries> ACTION_MAIN / CATEGORY_LAUNCHER',
    summary:
      'Lists launchable apps installed on your phone so you can choose which ones to block.',
    boundary:
      'Processed strictly in local memory and Android Room SQLite—never leaves your device.',
  },
  {
    id: 'media-silence',
    name: 'Media Silence & Process Control',
    constants: 'KILL_BACKGROUND_PROCESSES · REORDER_TASKS · AudioManager',
    summary:
      'Auto-pauses and mutes Reels or Shorts audio when an overlay appears, then restores system audio cleanly afterward.',
    boundary:
      'Only manages playback focus during interruptions—never accesses your microphone.',
  },
  {
    id: 'device-admin',
    name: 'Device Administrator',
    constants: 'android.permission.BIND_DEVICE_ADMIN',
    optional: true,
    summary:
      'Optional anti-uninstall guard that prevents removing SelfBind while a lock timer is actively running.',
    boundary:
      'No remote wipe, password reset, or camera policies. Emergency calls always remain accessible.',
  },
  {
    id: 'background-reliability',
    name: 'Background Reliability & Battery Exemption',
    constants:
      'FOREGROUND_SERVICE_SPECIAL_USE · SCHEDULE_EXACT_ALARM · RECEIVE_BOOT_COMPLETED · REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
    summary:
      'Keeps timers accurate in the notification drawer and restores active locks after reboots or OEM battery sweeps.',
    boundary:
      'Event-driven local enforcement with zero background uploads.',
  },
  {
    id: 'internet-access',
    name: 'Internet Access',
    constants: 'INTERNET · ACCESS_NETWORK_STATE',
    summary:
      'Used strictly for Google Play Billing (Pro upgrades & Emergency Unlock), In-App Reviews, and the optional Clean Browser.',
    boundary:
      'Zero analytics SDKs, zero ads, and SelfBind never receives or stores payment details.',
  },
];
