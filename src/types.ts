import {ImageSourcePropType} from 'react-native';

export type MainTab = 'guide' | 'plan' | 'atlas' | 'insights' | 'notes' | 'check';

export type AppRoute =
  | {name: 'guide'}
  | {name: 'routeList'; collectionId: string}
  | {name: 'placeDetail'; placeId: string; backTo?: AppRoute}
  | {name: 'plan'}
  | {name: 'atlas'; selectedPlaceId?: string}
  | {name: 'insights'}
  | {name: 'notes'}
  | {name: 'noteDetail'; noteId: string}
  | {name: 'check'};

export type RouteCollection = {
  id: string;
  title: string;
  eyebrow: string;
  emoji: string;
  gradient: [string, string];
};

export type GuidePlace = {
  id: string;
  collectionId: string;
  title: string;
  place: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  tag: string;
  description: string;
  image: ImageSourcePropType;
  routeType: 'viewpoint' | 'waterline' | 'canopy';
};

export type InsightGroup = {
  id: string;
  title: string;
  emoji: string;
};

export type Insight = {
  id: string;
  groupId: string;
  title: string;
  body: string;
};

export type FieldNote = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  image: ImageSourcePropType;
  body: string[];
};

export type ReadinessQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  image: ImageSourcePropType;
};
