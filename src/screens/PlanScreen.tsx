import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {media} from '../assets/media';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {PlaceCard} from '../components/PlaceCards';
import {guidePlaces, routeCollections} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useRoutePlan} from '../storage/RoutePlanContext';
import {colors, getNavigationMetrics, shadow} from '../theme';

export function PlanScreen() {
  const {openTab, navigate} = useNavigation();
  const {plannedPlaceIds, removePlanned} = useRoutePlan();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const emptyImageSize = Math.min(
    width - metrics.pageX * 2,
    metrics.compact ? 210 : 320,
    height * (metrics.compact ? 0.3 : 0.36),
  );
  const plannedPlaces = guidePlaces.filter(item =>
    plannedPlaceIds.includes(item.id),
  );

  if (plannedPlaces.length === 0) {
    return (
      <AppScreen eyebrow="Route Builder" title="Route Plan">
        <View style={[styles.empty, metrics.compact && styles.emptyCompact]}>
          <Image
            source={media.introPlaceGrid}
            style={[
              styles.emptyImage,
              {width: emptyImageSize, height: emptyImageSize},
              metrics.compact && styles.emptyImageCompact,
            ]}
          />
          <Text
            style={[
              styles.emptyTitle,
              metrics.compact && styles.emptyTitleCompact,
            ]}>
            No stops in the plan yet
          </Text>
          <Text
            style={[
              styles.emptyBody,
              metrics.compact && styles.emptyBodyCompact,
            ]}>
            Add places from the guide to build a route that feels intentional.
          </Text>
          <Button
            title="Browse Guide"
            onPress={() => openTab('guide')}
            style={[styles.emptyButton, metrics.compact && styles.emptyButtonCompact]}
          />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Route Builder" title="Route Plan">
      <View style={styles.summary}>
        <Text style={styles.summaryCount}>{plannedPlaces.length}</Text>
        <Text style={styles.summaryText}>
          planned stops across{' '}
          {
            routeCollections.filter(collection =>
              plannedPlaces.some(place => place.collectionId === collection.id),
            ).length
          }{' '}
          route collections
        </Text>
      </View>
      {plannedPlaces.map((place, index) => (
        <View key={place.id} style={styles.planItem}>
          <Text style={styles.step}>{String(index + 1).padStart(2, '0')}</Text>
          <PlaceCard
            compact
            planned
            place={place}
            onPress={() => navigate({name: 'placeDetail', placeId: place.id})}
          />
          <Pressable
            onPress={() => removePlanned(place.id)}
            style={styles.removeButton}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      ))}
      <Button
        title="Open Atlas"
        emoji="⌖"
        variant="ghost"
        onPress={() => openTab('atlas')}
        style={styles.mapButton}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyCompact: {
    paddingTop: 8,
  },
  emptyImage: {
    borderRadius: 22,
    marginBottom: 30,
    ...shadow,
  },
  emptyImageCompact: {
    borderRadius: 18,
    marginBottom: 18,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyTitleCompact: {
    fontSize: 21,
    lineHeight: 26,
  },
  emptyBody: {
    color: '#b5b5be',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  emptyBodyCompact: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 18,
  },
  emptyButton: {
    width: '100%',
  },
  emptyButtonCompact: {
    minHeight: 50,
  },
  summary: {
    minHeight: 78,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCount: {
    color: colors.cyan,
    fontSize: 30,
    fontWeight: '900',
    marginRight: 14,
  },
  summaryText: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  planItem: {
    marginBottom: 10,
  },
  step: {
    color: '#4f91ff',
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 6,
    letterSpacing: 1,
  },
  removeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: -6,
  },
  removeText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
  },
  mapButton: {
    marginTop: 12,
  },
});
