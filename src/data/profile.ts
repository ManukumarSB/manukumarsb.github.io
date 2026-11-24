// Everything personal on the site lives here. Edit this file, push, done.

export const profile = {
  name: 'Manukumar S B',
  fullName: 'Manukumar Salukoppalu Balarama',
  shortName: 'Manu',
  role: 'Senior Software Engineer',
  focus: ['Flutter', 'iOS', 'Android'],
  location: 'Irvine, California',
  email: 'manubalarama@gmail.com',
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
  { value: 20, suffix: '+', label: 'white-label apps built & shipped' },
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
      'Built the OutreachCircle app from scratch, published it to the App Store and Google Play, and kept it maintained and updated for five and a half years.',
      'Built and shipped 20+ white-label apps for clients from the same codebase — each one taken from setup through both store releases and ongoing updates, automated with Fastlane.',
      'Carried the codebase through several major Flutter upgrades without breaking a single client app.',
      'Introduced BLoC and Provider, UI automation tests, and full English/Spanish localization.',
      'Pitched in on the React and Next.js web side when the team needed it.',
    ],
    tags: ['Flutter', 'OutreachCircle', 'White-label', 'Fastlane', 'i18n'],
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
    title: 'OutreachCircle',
    kind: 'Work · iOS & Android',
    blurb:
      'Relational organizing app for campaigns and nonprofits. I built it from the first commit, shipped it to both stores, and spun 20+ branded white-label versions out of the same codebase.',
    tags: ['Flutter', 'White-label', 'Fastlane'],
    accent: '#5EEAD4',
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
    title: 'GoKalpa',
    kind: 'Personal · Live product',
    blurb:
      'From farmer to farmer — a marketplace where farmers across India buy and sell cattle for dairy, farming and breeding. Built end to end in Flutter.',
    tags: ['Flutter', 'Flutter Web', 'Marketplace'],
    url: 'https://gokalpa.in/',
    accent: '#F5B841',
  },
  {
    title: 'My Event',
    kind: 'Personal · Web + iOS & Android',
    blurb:
      'Started as a wedding planner, grew into a general event planner. Budget and expense tracking, guest list, shared invites and a countdown to the day — a Next.js web app with a Flutter companion.',
    tags: ['Next.js', 'Flutter', 'Firebase', 'Tailwind'],
    accent: '#FF7AB6',
  },
  {
    title: 'MyDay',
    kind: 'Personal · iOS & Android',
    blurb:
      'Habits and tasks with weekly insights. An excuse to go all-in on motion: Lottie onboarding, animated theme switching, micro-interactions everywhere.',
    tags: ['Flutter', 'Lottie', 'Hive', 'i18n'],
    accent: '#3EE0A1',
  },
  {
    title: 'FlowTrack',
    kind: 'Personal · Android, iOS & Web',
    blurb:
      'Personal finance from one codebase: multiple accounts, savings goals with progress estimates, and monthly reports that tell you where the money went.',
    tags: ['Flutter', 'Firebase', 'fl_chart'],
    url: 'https://github.com/ManukumarSB/flow-track-flutter',
    accent: '#2B7FFF',
  },
  {
    title: 'Park Assist',
    kind: 'Experiment · Android · Wi-Fi Aware',
    blurb:
      'Find a free parking slot with no internet. The lot publishes its slots over Wi-Fi Aware (NAN), nearby phones discover it directly, see a live grid and claim a spot — peer to peer, no router.',
    tags: ['Android', 'Java', 'Wi-Fi Aware', 'Peer-to-peer'],
    url: 'https://github.com/ManukumarSB/Parking_with_NAN',
    accent: '#22D3EE',
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
    title: 'Dart MCP Server',
    kind: 'Experiment',
    blurb:
      'A Model Context Protocol server written in pure Dart — STDIO, WebSocket and HTTP transports — so AI assistants can call tools built in the language I use every day.',
    tags: ['Dart', 'MCP', 'AI tooling'],
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

// The AI chat (hosted on Honestify), embedded on the site.
export const chat = {
  url: 'https://www.honestify.me/manu',
  // Shown as a replayed sample conversation. Keep these factual.
  samples: [
    {
      q: "What's your current role?",
      a: 'Senior Software Engineer at Political Data Intelligence. I own three production Flutter apps end to end.',
    },
    {
      q: 'Biggest thing you have built?',
      a: 'OutreachCircle, from the first commit, plus 20+ white-label apps from the same codebase — all shipped to both stores.',
    },
    {
      q: 'Favourite part of the stack?',
      a: 'Clean architecture with BLoC or Riverpod, and the release pipeline. I like apps that never crash.',
    },
  ],
};

export const nowLearning = 'On-device AI and edge RAG in Flutter, and more Next.js on the web side.';

// Published packages. Stats are fetched from pub.dev at build time.
export const packageNames = ['per_app_language', 'preloaded_page_view', 'keyboard_dock', 'sms_composer_sheet'];
