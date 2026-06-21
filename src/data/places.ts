import {media} from '../assets/media';
import {GuidePlace, RouteCollection} from '../types';

export const routeCollections: RouteCollection[] = [
  {
    id: 'afterdark-viewpoints',
    title: 'Afterdark Viewpoints',
    eyebrow: 'Night Route',
    emoji: '◎',
    gradient: ['#11245a', '#2545a8'],
  },
  {
    id: 'waterline-routes',
    title: 'Waterline Routes',
    eyebrow: 'Riverside Flow',
    emoji: '◇',
    gradient: ['#053345', '#126174'],
  },
  {
    id: 'canopy-escapes',
    title: 'Canopy Escapes',
    eyebrow: 'Forest Air',
    emoji: '✦',
    gradient: ['#22104b', '#5c1db0'],
  },
];

export const guidePlaces: GuidePlace[] = [
  {
    id: 'maracaibo-basin-night',
    collectionId: 'afterdark-viewpoints',
    title: 'Lake Maracaibo Basin',
    place: 'Zulia Water Basin',
    coordinates: {latitude: 9.8, longitude: -71.5667},
    tag: 'Wide horizon',
    routeType: 'waterline',
    image: media.placeMaracaiboBasin,
    description:
      'A broad water horizon with warm air, fishing villages, and long open views. It works best as the anchor stop for a night route because the lake gives travelers clear sightlines, reflections, and easy orientation from the shoreline.',
  },
  {
    id: 'river-mouth-watch',
    collectionId: 'afterdark-viewpoints',
    title: 'Catatumbo River Mouth',
    place: 'Zulia Wetlands',
    coordinates: {latitude: 9.3035, longitude: -71.9582},
    tag: 'Boat watch',
    routeType: 'viewpoint',
    image: media.placeRiverMouthWatch,
    description:
      'A quiet wetland meeting point where small boats move between channels and open lake water. Add it to the plan when the route needs a slower, more observational stop with strong reflections and a clear sense of place.',
  },
  {
    id: 'ologa-stilt-route',
    collectionId: 'afterdark-viewpoints',
    title: 'Ologa Stilt Village',
    place: 'Lake Maracaibo Wetlands',
    coordinates: {latitude: 9.0708, longitude: -71.7315},
    tag: 'Stilt village',
    routeType: 'viewpoint',
    image: media.placeOlogaStilts,
    description:
      'A compact village route built around narrow waterways, local docks, and low wooden homes above the water. It is a good pick for travelers who want a grounded cultural stop instead of another wide landscape view.',
  },
  {
    id: 'mirador-water-village',
    collectionId: 'afterdark-viewpoints',
    title: 'Congo Mirador',
    place: 'Lake Maracaibo Floating Village',
    coordinates: {latitude: 9.1234, longitude: -71.756},
    tag: 'Floating route',
    routeType: 'viewpoint',
    image: media.placeMiradorWaterVillage,
    description:
      'A floating settlement with water-level paths, platform homes, and a cinematic night atmosphere. Use it as a plan highlight when the itinerary needs texture, human scale, and mirrored water all in one stop.',
  },
  {
    id: 'perija-highlands-pass',
    collectionId: 'afterdark-viewpoints',
    title: 'Sierra de Perija Highlands',
    place: 'Colombian Border Mountains',
    coordinates: {latitude: 10.0667, longitude: -72.6667},
    tag: 'Ridge air',
    routeType: 'canopy',
    image: media.placePerijaHighlands,
    description:
      'A mountain-edge route with cooler air, forested slopes, and deep horizon lines. It pairs well with lake stops because it changes the rhythm of the trip from water routes to elevated viewpoints.',
  },
  {
    id: 'merida-ridge-line',
    collectionId: 'afterdark-viewpoints',
    title: 'Merida Ridge Line',
    place: 'Venezuelan Andes',
    coordinates: {latitude: 8.5989, longitude: -71.1449},
    tag: 'Andes pause',
    routeType: 'viewpoint',
    image: media.placeMeridaRidge,
    description:
      'A highland segment for travelers who want valleys, mountain silhouettes, and changing sky conditions. The stop is useful as a midpoint because it gives the plan a cooler climate and a slower scenic tempo.',
  },
  {
    id: 'pittier-forest-entry',
    collectionId: 'afterdark-viewpoints',
    title: 'Henri Pittier Forest Entry',
    place: 'Coastal Mountains',
    coordinates: {latitude: 10.35, longitude: -67.6833},
    tag: 'Coastal forest',
    routeType: 'canopy',
    image: media.placePittierForest,
    description:
      'A humid forest entry with coastal mountains close by. It is a practical bridge between darker scenic stops and daytime walking routes, especially when the itinerary needs a lush stop near the coast.',
  },
  {
    id: 'orinoco-bend',
    collectionId: 'waterline-routes',
    title: 'Orinoco River Bend',
    place: 'Eastern Venezuela',
    coordinates: {latitude: 8.3167, longitude: -62.6333},
    tag: 'Big river',
    routeType: 'waterline',
    image: media.placeOrinocoBend,
    description:
      'A large river segment with long banks, humid air, and wide movement through the landscape. Add it when the plan needs scale and a route that feels less like a viewpoint and more like a passage.',
  },
  {
    id: 'maracaibo-afterdark',
    collectionId: 'waterline-routes',
    title: 'Maracaibo Afterdark',
    place: 'Northwestern Venezuela',
    coordinates: {latitude: 9.8, longitude: -71.5667},
    tag: 'Night water',
    routeType: 'waterline',
    image: media.placeMaracaiboAfterdark,
    description:
      'A second Maracaibo stop for travelers building a route around evening light, water reflections, and open-air observation. It can be used as the final stop after nearby villages or as a standalone night session.',
  },
  {
    id: 'canaima-lagoon-loop',
    collectionId: 'waterline-routes',
    title: 'Canaima Lagoon Loop',
    place: 'Canaima National Park',
    coordinates: {latitude: 6.2414, longitude: -62.8544},
    tag: 'Lagoon loop',
    routeType: 'waterline',
    image: media.placeCanaimaLagoon,
    description:
      'A compact lagoon route surrounded by waterfalls, cliffs, and forest edges. It gives the plan a clean daytime counterpoint to darker lake stops and works well for photo walks with layered backgrounds.',
  },
  {
    id: 'caroni-channel',
    collectionId: 'waterline-routes',
    title: 'Caroni Channel',
    place: 'Southeastern Venezuela',
    coordinates: {latitude: 8.1, longitude: -63.55},
    tag: 'River power',
    routeType: 'waterline',
    image: media.placeCaroniChannel,
    description:
      'A river-basin stop with strong currents, forest edges, and rocky landscape breaks. Choose it when the route needs a more energetic water segment before moving toward parks or plateau views.',
  },
  {
    id: 'catatumbo-channel',
    collectionId: 'waterline-routes',
    title: 'Catatumbo Channel',
    place: 'Lake Maracaibo Drainage',
    coordinates: {latitude: 9.32, longitude: -72.08},
    tag: 'Channel path',
    routeType: 'viewpoint',
    image: media.placeCatatumboChannel,
    description:
      'A narrow channel route that connects wetland travel with lake observation. It is a useful planning stop for travelers who want transitions, boat movement, and a closer look at the water network.',
  },
  {
    id: 'sinamaica-lagoon',
    collectionId: 'waterline-routes',
    title: 'Sinamaica Lagoon',
    place: 'Zulia Lagoon System',
    coordinates: {latitude: 10.55, longitude: -71.7167},
    tag: 'Lagoon villages',
    routeType: 'waterline',
    image: media.placeSinamaicaLagoon,
    description:
      'A lagoon system with traditional stilt communities and calm water corridors. Add it to the plan when you want a softer cultural stop with easy pacing and a strong relationship to the water.',
  },
  {
    id: 'chama-valley',
    collectionId: 'waterline-routes',
    title: 'Chama Valley',
    place: 'Merida Andes Valley',
    coordinates: {latitude: 8.5931, longitude: -71.156},
    tag: 'Valley line',
    routeType: 'viewpoint',
    image: media.placeChamaValley,
    description:
      'A mountain river valley with cooler air and layered slopes. It is a good connector between highland viewpoints and river-focused routes, especially for travelers who like gradual scenic changes.',
  },
  {
    id: 'canaima-plateau',
    collectionId: 'canopy-escapes',
    title: 'Canaima Plateau',
    place: 'Bolivar State',
    coordinates: {latitude: 6.231, longitude: -62.8544},
    tag: 'Tepui route',
    routeType: 'canopy',
    image: media.placeCanaimaPlateau,
    description:
      'A major natural route with tepui silhouettes, dense greenery, and waterfall access. Use it as a centerpiece for a longer plan because it gives the itinerary a strong sense of distance and discovery.',
  },
  {
    id: 'southern-canopy',
    collectionId: 'canopy-escapes',
    title: 'Southern Canopy Region',
    place: 'Southern Venezuela',
    coordinates: {latitude: 3.4167, longitude: -65.8333},
    tag: 'Remote green',
    routeType: 'canopy',
    image: media.placeCanopySouth,
    description:
      'A remote forest region with deep greenery, winding rivers, and high humidity. It suits travelers who want the plan to feel more exploratory and less centered on classic postcard viewpoints.',
  },
  {
    id: 'pittier-coast-path',
    collectionId: 'canopy-escapes',
    title: 'Pittier Coast Path',
    place: 'Aragua Coast',
    coordinates: {latitude: 10.35, longitude: -67.6833},
    tag: 'Cloud forest',
    routeType: 'canopy',
    image: media.placePittierCoast,
    description:
      'A coastal forest path where mountains and Caribbean air meet. It works well for shorter routes because it combines vegetation, viewpoints, and access to nearby coastlines without needing a long transfer.',
  },
  {
    id: 'nevada-valleys',
    collectionId: 'canopy-escapes',
    title: 'Sierra Nevada Valleys',
    place: 'Venezuelan Andes',
    coordinates: {latitude: 8.5364, longitude: -70.8467},
    tag: 'Mist valleys',
    routeType: 'canopy',
    image: media.placeNevadaValleys,
    description:
      'A valley route with mist, mountain forest, and changing elevation. Add it when the plan needs a calmer walking segment after several waterline or night-view stops.',
  },
  {
    id: 'yapacana-tableland',
    collectionId: 'canopy-escapes',
    title: 'Yapacana Tableland',
    place: 'Amazonas State',
    coordinates: {latitude: 3.95, longitude: -66.8333},
    tag: 'Tableland',
    routeType: 'canopy',
    image: media.placeYapacanaTableland,
    description:
      'A remote tableland route with dense forest around a distinctive flat-topped mountain. It is best treated as an aspirational stop for plans that emphasize wilderness and unusual terrain.',
  },
  {
    id: 'avila-overlook',
    collectionId: 'canopy-escapes',
    title: 'Avila Overlook',
    place: 'Caracas Mountain Wall',
    coordinates: {latitude: 10.55, longitude: -66.8833},
    tag: 'City overlook',
    routeType: 'canopy',
    image: media.placeAvilaOverlook,
    description:
      'A city-edge mountain stop with forest paths and panoramic views above Caracas. It gives the plan a practical urban-access option while still keeping the route focused on landscape and elevation.',
  },
  {
    id: 'mochima-coast',
    collectionId: 'canopy-escapes',
    title: 'Mochima Coast',
    place: 'Caribbean Coast',
    coordinates: {latitude: 10.3667, longitude: -64.3167},
    tag: 'Coastal hills',
    routeType: 'canopy',
    image: media.placeMochimaCoast,
    description:
      'A coastal park route with islands, hills, and warm maritime air. Choose it when the itinerary needs a softer finish with beach access, short walks, and wide blue views.',
  },
];

export const getRouteCollection = (id: string) =>
  routeCollections.find(collection => collection.id === id);

export const getGuidePlace = (id: string) =>
  guidePlaces.find(place => place.id === id);

export const getPlacesByCollection = (collectionId: string) =>
  guidePlaces.filter(place => place.collectionId === collectionId);
