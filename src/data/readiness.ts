import {lightningMedia} from '../assets/media';
import {StormReadinessQuestion} from '../types';

export const stormReadinessQuestions: StormReadinessQuestion[] = [
  {
    id: 'watch-window-anchor',
    question: 'What should anchor a Catatumbo lightning night?',
    options: [
      'One confirmed watch window with a return plan',
      'As many distant sites as possible',
      'A route with no shelter point',
      'A transfer that starts only after midnight',
    ],
    answer: 'One confirmed watch window with a return plan',
    image: lightningMedia.checkSkyOrb,
  },
  {
    id: 'lagoon-arrival',
    question: 'Why arrive at a lagoon base before full dark?',
    options: [
      'To confirm docks, boat position, and shelter',
      'To avoid speaking with local guides',
      'To start the watch with an empty battery',
      'To make the return route harder to read',
    ],
    answer: 'To confirm docks, boat position, and shelter',
    image: lightningMedia.checkSkyChannel,
  },
  {
    id: 'severe-weather',
    question: 'What is safest if weather turns severe near open water?',
    options: [
      'Move to protected shelter and wait',
      'Stand on the most exposed dock',
      'Wait under one isolated tree',
      'Continue to the highest ridge immediately',
    ],
    answer: 'Move to protected shelter and wait',
    image: lightningMedia.checkCloudPath,
  },
  {
    id: 'watch-plan-shape',
    question: 'Which plan shape keeps the trip flexible?',
    options: [
      'One storm core, one lagoon base, one clear-sky fallback',
      'Only remote stops with no local transfer',
      'Five identical lake views in a row',
      'No fallback if storms shift',
    ],
    answer: 'One storm core, one lagoon base, one clear-sky fallback',
    image: lightningMedia.checkBranchingSky,
  },
  {
    id: 'night-power',
    question: 'What should be independent during a night watch?',
    options: [
      'Phone power, backup light, and offline notes',
      'Only decorative camera gear',
      'A paper plan left at the hotel',
      'A single battery shared by everyone',
    ],
    answer: 'Phone power, backup light, and offline notes',
    image: lightningMedia.noteLongExposure,
  },
];
