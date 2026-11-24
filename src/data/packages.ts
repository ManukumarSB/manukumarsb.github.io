import { packageNames } from './profile';

export type PubPackage = {
  name: string;
  version: string;
  description: string;
  published: string;
  likes: number;
  downloads: number;
  /// null while pub.dev is still analyzing a freshly published version.
  points: number | null;
  maxPoints: number;
  platforms: string[];
  repository?: string;
};

// Last known numbers, used if pub.dev can't be reached during a build so the
// site never deploys with an empty section.
const fallback: Record<string, PubPackage> = {
  keyboard_dock: {
    name: 'keyboard_dock',
    version: '0.1.0',
    description:
      'Keeps a footer docked above the soft keyboard and the home indicator. Zero dependencies, just MediaQuery.',
    published: '2026-11-23',
    likes: 0,
    downloads: 0,
    points: 160,
    maxPoints: 160,
    platforms: ['android', 'ios', 'web', 'macos', 'windows', 'linux'],
    repository: 'https://github.com/ManukumarSB/keyboard_doc',
  },
  per_app_language: {
    name: 'per_app_language',
    version: '0.1.0',
    description:
      "Let users pick your app's language in Android 13+ and iOS system settings, and keep Flutter in sync. Includes a setup command for the native config.",
    published: '2026-11-24',
    likes: 0,
    downloads: 0,
    points: 160,
    maxPoints: 160,
    platforms: ['android', 'ios'],
    repository: 'https://github.com/ManukumarSB/per_app_language',
  },
  preloaded_page_view: {
    name: 'preloaded_page_view',
    version: '0.1.0',
    description:
      'A PageView that builds the next and previous N pages ahead of time, so videos, images and feeds are ready before you swipe. Zero dependencies.',
    published: '2026-11-23',
    likes: 0,
    downloads: 0,
    points: null,
    maxPoints: 160,
    platforms: ['android', 'ios', 'web', 'macos', 'windows', 'linux'],
    repository: 'https://github.com/ManukumarSB/preloaded_page_view',
  },
  sms_composer_sheet: {
    name: 'sms_composer_sheet',
    version: '1.0.3',
    description:
      'A Flutter plugin for native SMS composer with beautiful bottom sheet UI. Supports iOS and Android with haptic feedback and error handling.',
    published: '2025-11-07',
    likes: 2,
    downloads: 440,
    points: 130,
    maxPoints: 160,
    platforms: ['android', 'ios'],
    repository: 'https://github.com/manukumarsb/sms_composer_sheet',
  },
};

async function getJson(url: string): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

// pub.dev returns no platform tags until it has analyzed a new version.
function platformsFrom(tags: string[] | undefined): string[] | null {
  const platforms = (tags ?? [])
    .filter((t) => t.startsWith('platform:'))
    .map((t) => t.replace('platform:', ''));
  return platforms.length ? platforms : null;
}

async function fetchOne(name: string): Promise<PubPackage> {
  try {
    const [info, score] = await Promise.all([
      getJson(`https://pub.dev/api/packages/${name}`),
      getJson(`https://pub.dev/api/packages/${name}/score`),
    ]);
    const pubspec = info.latest.pubspec;
    return {
      name,
      version: info.latest.version,
      description: pubspec.description ?? '',
      published: String(info.latest.published).slice(0, 10),
      likes: score.likeCount ?? 0,
      downloads: score.downloadCount30Days ?? 0,
      points: score.maxPoints ? score.grantedPoints ?? 0 : null,
      maxPoints: score.maxPoints || 160,
      platforms: platformsFrom(score.tags) ?? fallback[name]?.platforms ?? [],
      repository: pubspec.repository ?? pubspec.homepage,
    };
  } catch (err) {
    console.warn(`[packages] using fallback for ${name}:`, (err as Error).message);
    return fallback[name];
  }
}

export async function loadPackages(): Promise<PubPackage[]> {
  const list = await Promise.all(packageNames.map(fetchOne));
  return list.filter(Boolean);
}
