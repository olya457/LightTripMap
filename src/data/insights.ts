import {Insight, InsightGroup} from '../types';

export const insightGroups: InsightGroup[] = [
  {id: 'timing', title: 'Timing', emoji: '◎'},
  {id: 'regions', title: 'Regions', emoji: '◇'},
  {id: 'safety', title: 'Safety', emoji: '✦'},
];

export const insightCards: Insight[] = [
  {
    id: 'start-with-water',
    groupId: 'timing',
    title: 'Start With Water Stops',
    body:
      'Waterline places are easier to orient around at the beginning of a route. They give the plan clear landmarks before moving into forest or highland segments.',
  },
  {
    id: 'leave-night-buffer',
    groupId: 'timing',
    title: 'Leave a Night Buffer',
    body:
      'Evening routes need extra time for transfers, loading gear, and waiting for the sky to settle. A 30 minute buffer keeps the plan relaxed instead of rushed.',
  },
  {
    id: 'pair-one-anchor',
    groupId: 'timing',
    title: 'Pair One Anchor With Two Small Stops',
    body:
      'A strong route often works best with one main destination and two lighter nearby stops. This keeps the day varied without turning it into a checklist.',
  },
  {
    id: 'shorten-humid-days',
    groupId: 'timing',
    title: 'Shorten Humid Days',
    body:
      'On very humid days, shorter walking segments usually feel better than packed schedules. Save the longer transfers for cooler morning or evening windows.',
  },
  {
    id: 'use-return-light',
    groupId: 'timing',
    title: 'Use Return Light',
    body:
      'When a stop has strong reflections or ridgelines, the return leg can be as valuable as the arrival. Avoid planning every route as a one-way rush.',
  },
  {
    id: 'keep-one-open-slot',
    groupId: 'timing',
    title: 'Keep One Open Slot',
    body:
      'A blank slot in the plan gives room for local advice, weather shifts, or a place that deserves more time once you arrive.',
  },
  {
    id: 'lake-and-ridge',
    groupId: 'regions',
    title: 'Lake and Ridge Routes Feel Different',
    body:
      'Lake stops are open, reflective, and horizontal. Ridge stops are cooler, more layered, and slower. Mixing both makes the itinerary feel more deliberate.',
  },
  {
    id: 'villages-add-scale',
    groupId: 'regions',
    title: 'Villages Add Scale',
    body:
      'Small water villages keep a scenic route from feeling anonymous. They add docks, homes, boats, and everyday details that help the place feel specific.',
  },
  {
    id: 'forests-need-margin',
    groupId: 'regions',
    title: 'Forests Need More Margin',
    body:
      'Canopy routes often move slower because trails, humidity, and visibility change quickly. Give forest stops more time than their map distance suggests.',
  },
  {
    id: 'coast-is-a-soft-finish',
    groupId: 'regions',
    title: 'Coastlines Make Soft Finishes',
    body:
      'A coastal stop is a good final segment after intense lake or highland routes. It gives the itinerary a wider, calmer ending.',
  },
  {
    id: 'repeat-maracaibo-with-purpose',
    groupId: 'regions',
    title: 'Repeat Maracaibo With Purpose',
    body:
      'The same basin can support more than one route if each stop has a different role: village detail, open horizon, boat transfer, or night observation.',
  },
  {
    id: 'tepui-stops-anchor-longer-plans',
    groupId: 'regions',
    title: 'Tepui Stops Anchor Longer Plans',
    body:
      'Plateau and tableland destinations are best used as central anchors rather than quick extras. They make the whole plan feel more expansive.',
  },
  {
    id: 'confirm-local-transfer',
    groupId: 'safety',
    title: 'Confirm Local Transfers',
    body:
      'For water villages, lagoons, and remote parks, confirm local transfers before the day starts. A beautiful plan still depends on a reliable way in and out.',
  },
  {
    id: 'pack-for-wet-edges',
    groupId: 'safety',
    title: 'Pack for Wet Edges',
    body:
      'Even when the plan is not a hike, docks, boats, and lagoon paths can be wet. Dry bags and shoes with grip matter more than extra accessories.',
  },
  {
    id: 'avoid-open-ground',
    groupId: 'safety',
    title: 'Avoid Open Ground During Bad Weather',
    body:
      'If weather turns severe, move away from exposed shoreline, isolated trees, and open ridges. Wait from a protected area and keep the route flexible.',
  },
  {
    id: 'share-the-plan',
    groupId: 'safety',
    title: 'Share the Plan',
    body:
      'Send the route order and expected return time to someone off-route, especially when the plan includes boats, wetlands, or remote forest sections.',
  },
  {
    id: 'respect-local-rhythm',
    groupId: 'safety',
    title: 'Respect Local Rhythm',
    body:
      'Villages and park communities are not scenery. Move slowly, ask before photographing people, and let local guides set the pace where needed.',
  },
  {
    id: 'night-route-power',
    groupId: 'safety',
    title: 'Carry Independent Power',
    body:
      'Night routes need a charged phone, a small backup light, and offline notes. Do not make the whole plan depend on a single battery.',
  },
];

export const getInsightsByGroup = (groupId: string) =>
  insightCards.filter(insight => insight.groupId === groupId);
