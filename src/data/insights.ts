import {LightningBrief, LightningBriefGroup} from '../types';

export const lightningBriefGroups: LightningBriefGroup[] = [
  {id: 'windows', title: 'Windows', symbol: '◎'},
  {id: 'signals', title: 'Signals', symbol: '◇'},
  {id: 'safety', title: 'Safety', symbol: '✦'},
];

export const lightningBriefs: LightningBrief[] = [
  {
    id: 'catatumbo-night-peak',
    groupId: 'windows',
    title: 'Treat Catatumbo as a Night System',
    body: 'The main watch plan should be built around evening arrival, a patient night window, and a confirmed return. The app now prioritizes watch windows instead of generic daytime sightseeing.',
  },
  {
    id: 'arrive-before-dark',
    groupId: 'windows',
    title: 'Arrive Before Full Dark',
    body: 'Reach lagoon or village bases while the route is still readable. It gives time to confirm docks, boat position, shelter, and the exact place to wait before lightning activity becomes the focus.',
  },
  {
    id: 'one-core-two-fallbacks',
    groupId: 'windows',
    title: 'Use One Core and Two Fallbacks',
    body: 'A strong watch plan uses one Catatumbo core site, one lagoon base, and one clear-sky fallback. That keeps the itinerary unique without turning the trip into a crowded checklist.',
  },
  {
    id: 'late-night-margin',
    groupId: 'windows',
    title: 'Keep a Late-Night Margin',
    body: 'Storm timing can shift. Keep margin for loading gear, waiting through rain, and returning safely after the best flashes instead of planning a tight transfer immediately after the watch.',
  },
  {
    id: 'cloud-build-signal',
    groupId: 'signals',
    title: 'Watch the Cloud Build, Not Just Flashes',
    body: 'Useful signals include stacked clouds over the lake, sudden wind changes, and darker bands near the horizon. These are more practical than chasing the first visible flash.',
  },
  {
    id: 'water-reflection-signal',
    groupId: 'signals',
    title: 'Reflections Help You Read Distance',
    body: 'Water reflections make far lightning easier to track. A dock, lagoon edge, or open water base can be more useful than a high point when the goal is observing the Catatumbo glow.',
  },
  {
    id: 'village-scale-signal',
    groupId: 'signals',
    title: 'Village Scale Keeps the Map Specific',
    body: 'Stilt villages, docks, and boat lanes give the lightning plan a local shape. They also help travelers understand where they can wait respectfully and where movement should stay limited.',
  },
  {
    id: 'ridge-as-contrast',
    groupId: 'signals',
    title: 'Ridges Are Weather Contrast',
    body: 'Highland and coastal mountain sites are not replacements for Catatumbo. They are contrast stops for reading cloud lines, cooling down, and saving a day when the lake window needs flexibility.',
  },
  {
    id: 'confirm-boat-chain',
    groupId: 'safety',
    title: 'Confirm the Boat Chain',
    body: 'Before any night watch, confirm pickup, return, shelter, and who is responsible for timing. A beautiful lightning plan still depends on a reliable way back.',
  },
  {
    id: 'avoid-exposed-waiting',
    groupId: 'safety',
    title: 'Avoid Exposed Waiting',
    body: 'If weather turns severe, do not wait on open shore, isolated docks, exposed ridges, or under a lone tree. Move to protected shelter and let the watch window adjust.',
  },
  {
    id: 'keep-power-independent',
    groupId: 'safety',
    title: 'Keep Power Independent',
    body: 'Night observation needs a charged phone, offline notes, a small backup light, and a dry way to store them. The whole plan should not depend on one battery.',
  },
  {
    id: 'respect-stilt-communities',
    groupId: 'safety',
    title: 'Respect Stilt Communities',
    body: 'Floating and stilt villages are living places. Ask before photographing people, keep night noise down, and let local guides set the pace around homes and docks.',
  },
];

export const getBriefsByGroup = (groupId: string) =>
  lightningBriefs.filter(brief => brief.groupId === groupId);
