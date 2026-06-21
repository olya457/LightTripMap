import {media} from '../assets/media';
import {FieldNote} from '../types';

export const fieldNotes: FieldNote[] = [
  {
    id: 'night-waterline-route',
    title: 'Building a Night Waterline Route',
    subtitle:
      'How to shape a calm route around lake edges, boat transfers, and open horizons.',
    date: 'May 12, 2025',
    readTime: '6 min read',
    tags: ['Planning', 'Waterline'],
    image: media.noteNightWaterline,
    body: [
      'A night waterline route works best when the itinerary stays simple. Choose one main observation stop, one nearby village or channel, and one flexible return point. That structure gives the route enough shape without making the night feel crowded.',
      'The strongest stops usually have a clean horizon, reflected water, and a clear place to wait. Those details matter more than trying to cover a large distance after dark. Slower movement also gives local guides room to adjust based on conditions.',
      'Before leaving, confirm the boat pickup, return window, and where you can wait safely if weather changes. The route should feel spacious, but the logistics should be precise.',
    ],
  },
  {
    id: 'lake-to-ridge-contrast',
    title: 'Why Lake and Ridge Stops Pair Well',
    subtitle:
      'Flat water views and highland air create a route that feels varied without losing focus.',
    date: 'Apr 28, 2025',
    readTime: '8 min read',
    tags: ['Regions', 'Route Craft'],
    image: media.placeMaracaiboBasin,
    body: [
      'Lake routes give travelers long horizontal views, reflected light, and easy visual orientation. Ridge routes feel more layered because valleys, slopes, and cooler air change the pace of the trip.',
      'When both appear in one plan, the route feels designed instead of random. Start with water if the day needs an easy arrival, then move toward higher ground when the plan calls for a slower scenic pause.',
      'The key is not distance; it is contrast. A good route changes texture every few stops while still belonging to the same overall story.',
    ],
  },
  {
    id: 'reading-the-sky',
    title: 'Reading the Sky Without Overplanning',
    subtitle:
      'A practical way to keep outdoor routes flexible when tropical weather keeps changing.',
    date: 'Mar 15, 2025',
    readTime: '7 min read',
    tags: ['Timing', 'Weather'],
    image: media.checkSkyChannel,
    body: [
      'Outdoor routes in humid regions need flexibility. Instead of planning every minute, build the day around windows: arrival, observation, transfer, and return. This makes the itinerary easier to adjust when clouds, rain, or visibility change.',
      'Watch for practical signals rather than dramatic ones. Darker hills, sudden wind shifts, and fast-moving cloud layers can all suggest that a viewpoint should become a shorter stop.',
      'A flexible plan is not an empty plan. It simply gives each stop a role and lets the route breathe when conditions change.',
    ],
  },
  {
    id: 'photo-route-setup',
    title: 'Photo Routes With Fewer Stops',
    subtitle:
      'Better images often come from staying longer in the right place instead of moving constantly.',
    date: 'Feb 18, 2025',
    readTime: '5 min read',
    tags: ['Photography', 'Pacing'],
    image: media.noteLongExposure,
    body: [
      'A photo-focused route should prioritize patience over coverage. Two carefully chosen stops often produce stronger results than five rushed ones, especially near water or highland viewpoints.',
      'Look for stable foregrounds: docks, shorelines, ridges, boats, or village edges. These give each image structure even when the sky or light keeps changing.',
      'Keep the gear simple and protected. A dry bag, cloth, charged phone, and small light are more useful on wet routes than carrying every accessory.',
    ],
  },
  {
    id: 'sound-and-distance',
    title: 'Sound, Distance, and Route Mood',
    subtitle:
      'Open water, valleys, and forest edges all change how a place feels after sunset.',
    date: 'Jan 27, 2025',
    readTime: '4 min read',
    tags: ['Experience', 'Night'],
    image: media.noteCloudGlow,
    body: [
      'A route is not only what travelers see. Open water makes sound feel wide and distant, valleys can echo, and forest edges make the experience feel close and enclosed.',
      'Use that mood intentionally. A night plan can begin in a village, open onto water, then return through a quieter channel. The changing soundscape helps the route feel complete.',
      'This is one reason it helps to avoid overfilling the itinerary. The spaces between stops are part of the experience.',
    ],
  },
  {
    id: 'wild-route-etiquette',
    title: 'Wild Route Etiquette',
    subtitle:
      'Simple habits that make remote parks, villages, and waterways easier to visit well.',
    date: 'Jan 8, 2025',
    readTime: '5 min read',
    tags: ['Etiquette', 'Local'],
    image: media.placeCanopySouth,
    body: [
      'Remote routes pass through living places, not empty backdrops. Ask before photographing people, follow local guide instructions, and avoid turning docks or homes into props.',
      'Move lightly around water and forest edges. Pack out small waste, avoid unnecessary noise at night, and stay on known paths where local guidance is available.',
      'Good etiquette makes the route safer and better. It also protects the access that future travelers depend on.',
    ],
  },
  {
    id: 'route-readiness',
    title: 'A Simple Readiness Check',
    subtitle:
      'The five things worth confirming before any waterline or highland plan begins.',
    date: 'Dec 16, 2024',
    readTime: '6 min read',
    tags: ['Checklist', 'Safety'],
    image: media.noteBroadSky,
    body: [
      'Before starting, confirm the route order, transfer method, expected return, weather fallback, and who has the plan. Those five details cover most of the avoidable stress.',
      'For waterline routes, ask exactly where the pickup and return happen. For highland and forest routes, confirm how far the walking segment is and whether visibility changes the plan.',
      'The best trips still leave room for surprise, but the basics should be settled before the first stop.',
    ],
  },
];

export const getFieldNote = (id: string) =>
  fieldNotes.find(note => note.id === id);
