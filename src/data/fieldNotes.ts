import {lightningMedia} from '../assets/media';
import {SignalNote} from '../types';

export const signalNotes: SignalNote[] = [
  {
    id: 'catatumbo-night-window',
    title: 'Building a Catatumbo Night Window',
    subtitle:
      'How to shape a patient watch around lake air, village bases, and a confirmed return.',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    tags: ['Catatumbo', 'Timing'],
    image: lightningMedia.noteNightWaterline,
    body: [
      'A Catatumbo lightning night works best when the plan is simple: arrive before full dark, confirm the exact waiting point, stay through one clear watch window, and keep the return route settled before the sky becomes the whole story.',
      'The strongest observation sites usually have a clean horizon, reflected water, a protected place to wait, and a local transfer that does not depend on improvising after midnight. Those details matter more than trying to cover too many locations.',
      'Lightning Venezuela Trip Map treats each saved site as a role in the night, not just another pin. A storm core, lagoon base, and fallback link is usually stronger than a long list of stops.',
    ],
  },
  {
    id: 'maracaibo-reflection-logic',
    title: 'Why Reflections Matter on Lake Maracaibo',
    subtitle:
      'Open water makes distant flashes easier to read and gives photos a stable foreground.',
    date: 'Jun 2, 2026',
    readTime: '6 min read',
    tags: ['Maracaibo', 'Observation'],
    image: lightningMedia.siteMaracaiboBasin,
    body: [
      'Lake Maracaibo is useful because it gives the eye a wide horizontal reference. Reflections can make distant lightning easier to track, especially when clouds build over the lake while the shoreline remains dark.',
      'For photos, a dock, boat edge, or village platform can stabilize the frame without needing to move constantly. The map marks these places as watch bases when they help the traveler wait well.',
      'A good reflection watch does not require rushing to the most dramatic point. It rewards patience, a dry bag, a charged phone, and a clear agreement with the boat operator.',
    ],
  },
  {
    id: 'reading-storm-signals',
    title: 'Reading Storm Signals Without Chasing',
    subtitle:
      'A practical way to observe cloud build, wind shifts, and safe waiting points.',
    date: 'May 21, 2026',
    readTime: '7 min read',
    tags: ['Signals', 'Weather'],
    image: lightningMedia.checkSkyChannel,
    body: [
      'The goal is not to chase every flash. Useful signals include building cloud towers, sudden wind changes, darker lake bands, and the way reflections begin to appear before the main lightning window.',
      'When signals strengthen, the plan should become calmer, not more frantic. Move to the agreed waiting point, keep gear protected, and let the watch window unfold from a place that has shelter nearby.',
      'If the sky becomes severe, the correct move is to pause from protection. The app keeps clear-sky links in the map so a shifted plan still has a meaningful next step.',
    ],
  },
  {
    id: 'long-exposure-watch-kit',
    title: 'A Lean Kit for Lightning Photos',
    subtitle:
      'The gear that helps most around wet docks, boats, and low-light observation.',
    date: 'Apr 30, 2026',
    readTime: '5 min read',
    tags: ['Photography', 'Gear'],
    image: lightningMedia.noteLongExposure,
    body: [
      'Night lightning photos benefit from stable foregrounds and protected gear more than from carrying too much. A small tripod or steady surface, a dry cloth, a power bank, and a waterproof pouch are often enough for a focused watch.',
      'Frame the waterline, dock, or stilt village edge before the brightest flashes arrive. This keeps the image tied to Venezuela rather than becoming an abstract sky picture.',
      'Respect the place while shooting. Keep lights low around homes and boats, avoid blocking docks, and ask before photographing people or private spaces.',
    ],
  },
  {
    id: 'village-night-etiquette',
    title: 'Night Etiquette in Stilt Villages',
    subtitle:
      'Simple habits for moving carefully around homes, docks, and local boat routes.',
    date: 'Apr 12, 2026',
    readTime: '5 min read',
    tags: ['Local', 'Respect'],
    image: lightningMedia.noteCloudGlow,
    body: [
      'The most memorable lightning bases are often living communities. Move slowly, keep night noise down, and let local guides decide where visitors should wait, photograph, or step off the boat.',
      'A village is not just foreground for a storm. It is the reason the trip can be specific, grounded, and possible. Respectful movement protects access for everyone who comes later.',
      'Before the watch begins, confirm what is private, what is safe, and where the return pickup happens. Good etiquette and good logistics usually point to the same behavior.',
    ],
  },
  {
    id: 'fallbacks-that-still-feel-venezuelan',
    title: 'Fallbacks That Still Feel Venezuelan',
    subtitle:
      'How highlands, forests, and coastlines keep a lightning trip from becoming all-or-nothing.',
    date: 'Mar 26, 2026',
    readTime: '6 min read',
    tags: ['Fallbacks', 'Regions'],
    image: lightningMedia.noteBroadSky,
    body: [
      'A weather fallback should not feel like a failed plan. Andes valleys, coastal mountains, Canaima, and forest edges can keep the itinerary tied to Venezuelan sky and landscape even when the main Catatumbo window shifts.',
      'Use fallback links for daylight cloud reading, calmer walking, or a recovery day after a late night watch. They give the trip rhythm without pretending every place has the same lightning role.',
      'The map separates storm core, lagoon base, and clear-sky link so each stop has a reason to exist. That is the difference between a watch plan and a copied list of attractions.',
    ],
  },
];

export const getSignalNote = (id: string) =>
  signalNotes.find(note => note.id === id);
