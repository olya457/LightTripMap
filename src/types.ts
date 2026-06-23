import {ImageSourcePropType} from 'react-native';

export type MainTab = 'home' | 'watch' | 'map' | 'briefs' | 'signals' | 'ready';

export type AppRoute =
  | {name: 'home'}
  | {name: 'sectorList'; sectorId: string}
  | {name: 'siteDetail'; siteId: string; backTo?: AppRoute}
  | {name: 'watch'}
  | {name: 'map'; selectedSiteId?: string}
  | {name: 'briefs'}
  | {name: 'signals'}
  | {name: 'signalNoteDetail'; noteId: string}
  | {name: 'ready'};

export type LightningSector = {
  id: string;
  title: string;
  eyebrow: string;
  symbol: string;
  gradient: [string, string];
};

export type LightningSite = {
  id: string;
  sectorId: string;
  title: string;
  place: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  tag: string;
  description: string;
  image: ImageSourcePropType;
  watchType: 'stormCore' | 'lagoonBase' | 'clearSkyLink';
  lightningWindow: string;
  signal: string;
  fieldRole: string;
};

export type LightningBriefGroup = {
  id: string;
  title: string;
  symbol: string;
};

export type LightningBrief = {
  id: string;
  groupId: string;
  title: string;
  body: string;
};

export type SignalNote = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  image: ImageSourcePropType;
  body: string[];
};

export type StormReadinessQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  image: ImageSourcePropType;
};
