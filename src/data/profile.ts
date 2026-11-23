// Everything personal on the site lives here. Edit this file, push, done.

export const profile = {
  name: 'Manukumar S B',
  fullName: 'Manukumar Salukoppalu Balarama',
  shortName: 'Manu',
  role: 'Senior Software Engineer',
  focus: ['Flutter', 'iOS', 'Android'],
  location: 'Irvine, California',
  email: 'manu.sb71@gmail.com',
  photo: '/me.jpg',
  intro:
    "I've spent 8+ years shipping Flutter apps to real people in the field — canvassers walking turf, kids learning to count, teams who need the app to just work. I care about the boring parts too: crash-free sessions, clean releases, and code the next person can read.",
  links: {
    github: 'https://github.com/ManukumarSB',
    linkedin: 'https://www.linkedin.com/in/manukumarsb/',
    pub: 'https://pub.dev/packages/keyboard_dock',
  },
};

export const stats = [
  { value: 8, suffix: '+', label: 'years shipping Flutter' },
  { value: 3, suffix: '', label: 'production apps I own today' },
  { value: 99, suffix: '%+', label: 'crash-free sessions' },
  { value: 198, suffix: '', label: 'teams in the XPRIZE we won' },
];

export type Job = {
  company: string;
  domain: string;
  role: string;
  start: string;
  end: string;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: 'Political Data Intelligence',
    domain: 'Political tech',
    role: 'Senior Software Engineer',
    start: 'Feb 2025',
    end: 'Present',
    points: [
      'Own three production Flutter apps — PDI Connect, PDI Mobile and BlueVote Canvasser — from first prototype to App Store and Play Console.',
      'Built Mapbox turf maps that render live GeoJSON polygons, so field teams can see exactly where they have and haven’t knocked.',
      'Untangled Branch.io deep links across Universal Links and App Links, and keep all three apps above 99% crash-free.',
      'Tracked down Android 12+ FCM ANRs that were crashing the app in production, and shipped in-app updates and Lottie onboarding.',
    ],
    tags: ['Flutter', 'Mapbox', 'Branch.io', 'Firebase', 'Clean Architecture'],
  },
  {
    company: 'VoterCircle',
    domain: 'Political tech',
    role: 'Senior Software Engineer',
    start: 'Jul 2019',
    end: 'Jan 2025',
    points: [
      'Led the Flutter codebase for five and a half years and carried it through several major Flutter upgrades without breaking clients.',
      'Ran a multi-tenant white-label setup: one codebase, many branded apps, all released through Fastlane pipelines.',
      'Introduced BLoC and Provider, UI automation tests, and full English/Spanish localization.',
      'Pitched in on the React and Next.js web side when the team needed it.',
    ],
    tags: ['Flutter', 'BLoC', 'Fastlane', 'White-label', 'i18n'],
  },
  {
    company: 'Sutara Learning Foundation',
    domain: 'Education',
    role: 'Software Engineer',
    start: 'Dec 2017',
    end: 'Jun 2019',
    points: [
      'Co-built CHIMPLE, a children’s learning app with 30+ games for early reading and math, in Flutter and React Native.',
      'Part of the team that won the Google-backed Global Learning XPRIZE, out of 198 teams worldwide. Both apps are open source.',
    ],
    tags: ['Flutter', 'React Native', 'Firebase', 'SQLite', 'XPRIZE'],
  },
];

export type Project = {
  title: string;
  kind: string;
  blurb: string;
  tags: string[];
  url?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: 'BlueVote Canvasser',
    kind: 'Work · iOS & Android',
    blurb:
      'Field app for door-to-door canvassing. Turf maps, walk lists and offline-friendly data entry for volunteers.',
    tags: ['Flutter', 'Mapbox', 'GeoJSON'],
    accent: '#4FD1FF',
  },
  {
    title: 'PDI Connect & PDI Mobile',
    kind: 'Work · iOS & Android',
    blurb:
      'Two apps for campaign staff, sharing one clean-architecture core. Deep links, push, calendar scheduling.',
    tags: ['Flutter', 'Firebase', 'Branch.io'],
    accent: '#7C8CFF',
  },
  {
    title: 'CHIMPLE',
    kind: 'XPRIZE winner · Open source',
    blurb:
      'A tablet that teaches kids to read and count on their own. 30+ games, built for children who may never have seen a classroom.',
    tags: ['Flutter', 'React Native', 'Education'],
    url: 'https://github.com/chimple',
    accent: '#FFB547',
  },
  {
    title: 'Flow Track',
    kind: 'Side project',
    blurb: 'Personal finance tracker — where the money went, and where it should go next month.',
    tags: ['Flutter', 'Local storage'],
    url: 'https://github.com/ManukumarSB/flow-track-flutter',
    accent: '#3EE0A1',
  },
  {
    title: 'Gen AI PDF Chat',
    kind: 'Side project',
    blurb: 'Upload a PDF, ask it questions. A playground for running different AI providers from a Flutter app.',
    tags: ['Flutter', 'LLMs', 'RAG'],
    url: 'https://github.com/ManukumarSB/flutter_gen_ai_chat',
    accent: '#FF6B4A',
  },
  {
    title: 'Flutter CI/CD',
    kind: 'Experiment',
    blurb: 'A small reference for building and shipping Flutter apps on every push with Codemagic.',
    tags: ['CI/CD', 'Codemagic'],
    url: 'https://github.com/ManukumarSB/flutter_ci_cd_demo',
    accent: '#C38BFF',
  },
];

export const skills = {
  Mobile: ['Flutter', 'Dart', 'iOS', 'Android', 'React Native', 'Swift', 'Kotlin'],
  Architecture: ['Clean Architecture', 'BLoC', 'Riverpod', 'Provider', 'MVVM', 'SOLID'],
  Shipping: ['Fastlane', 'App Store Connect', 'Play Console', 'TestFlight', 'GitHub Actions', 'Codemagic'],
  Platform: ['Firebase', 'Crashlytics', 'FCM', 'Remote Config', 'Supabase', 'Mapbox', 'Branch.io'],
  Web: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS'],
};

// Shown in the ticker. Order is deliberate: most-used first.
export const ticker = [
  'Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'Riverpod', 'Mapbox', 'Firebase',
  'Fastlane', 'Swift', 'Kotlin', 'React Native', 'Next.js', 'Supabase', 'Lottie',
  'Deep Linking', 'CI/CD', 'On-device AI',
];

export const offline = [
  { title: 'Pickleball', text: 'You’ll find me at Southern California tournaments most weekends.' },
  { title: 'Pacific Northwest', text: 'Trails, rain, and the best coffee stops between Portland and Seattle.' },
  { title: 'Tech & travel vlog', text: 'Filming the places I go and the things I build.' },
];

export const nowLearning = 'On-device AI and edge RAG in Flutter, and more Next.js on the web side.';

// Published packages. Stats are fetched from pub.dev at build time.
export const packageNames = ['keyboard_dock', 'sms_composer_sheet'];
