import {media} from '../assets/media';
import {ReadinessQuestion} from '../types';

export const readinessQuestions: ReadinessQuestion[] = [
  {
    id: 'route-anchor',
    question:
      'What makes a route feel clear instead of crowded?',
    options: [
      'One anchor stop with two lighter nearby stops',
      'As many distant places as possible',
      'Only places with the same scenery',
      'No planned return point',
    ],
    answer: 'One anchor stop with two lighter nearby stops',
    image: media.checkSkyOrb,
  },
  {
    id: 'night-buffer',
    question:
      'What should be added to an evening waterline plan?',
    options: [
      'A 30 minute timing buffer',
      'A second phone with no charge',
      'A faster transfer after dark',
      'A route with no waiting point',
    ],
    answer: 'A 30 minute timing buffer',
    image: media.checkSkyChannel,
  },
  {
    id: 'wet-edges',
    question:
      'Which item matters most around docks, boats, and lagoon paths?',
    options: [
      'Shoes with grip',
      'Extra city shoes',
      'Loose paper maps only',
      'Heavy decorative gear',
    ],
    answer: 'Shoes with grip',
    image: media.checkCloudPath,
  },
  {
    id: 'weather-shift',
    question:
      'What is the best response if weather turns severe near open ground?',
    options: [
      'Move to a protected area and wait',
      'Stay on the exposed shoreline',
      'Stand under an isolated tree',
      'Continue to the highest ridge',
    ],
    answer: 'Move to a protected area and wait',
    image: media.placeMaracaiboAfterdark,
  },
  {
    id: 'local-transfer',
    question:
      'What should be confirmed before visiting water villages or remote parks?',
    options: [
      'Pickup, return, and local transfer details',
      'Only the photo angle',
      'A route with no guide contact',
      'The longest possible walking segment',
    ],
    answer: 'Pickup, return, and local transfer details',
    image: media.noteLongExposure,
  },
];
