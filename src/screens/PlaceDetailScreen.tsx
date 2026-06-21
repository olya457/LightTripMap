import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Button} from '../components/Buttons';
import {getGuidePlace} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useRoutePlan} from '../storage/RoutePlanContext';
import {colors, getNavigationMetrics, layout} from '../theme';

const routeTypeLabel = {
  viewpoint: 'Viewpoint',
  waterline: 'Waterline',
  canopy: 'Canopy',
};

export function PlaceDetailScreen({placeId}: {placeId: string}) {
  const {goBack, navigate} = useNavigation();
  const {isPlanned, togglePlanned} = useRoutePlan();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const place = getGuidePlace(placeId);

  if (!place) {
    return null;
  }

  const planned = isPlanned(place.id);

  const sharePlace = () => {
    Share.share({
      title: place.title,
      message: `${place.title}\n${place.place}\n${place.description}`,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: metrics.contentBottom},
        ]}>
        <ImageBackground
          source={place.image}
          style={[styles.hero, metrics.compact && styles.heroCompact]}>
          <View style={styles.heroShade} />
          <View style={styles.heroActions}>
            <Pressable onPress={() => goBack({name: 'guide'})} style={styles.topButton}>
              <Text style={styles.topButtonText}>‹ Back</Text>
            </Pressable>
            <Pressable onPress={sharePlace} style={styles.roundButton}>
              <Text style={styles.roundButtonText}>↗</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={[styles.body, {paddingHorizontal: metrics.pageX}]}>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{place.tag}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{routeTypeLabel[place.routeType]}</Text>
            </View>
          </View>
          <Text style={[styles.title, metrics.compact && styles.titleCompact]}>
            {place.title}
          </Text>
          <Text style={styles.place}>◎ {place.place}</Text>
          <View style={styles.coordinates}>
            <Text style={styles.coordinatesText}>
              ⌖ {Math.abs(place.coordinates.latitude).toFixed(4)}° N,{' '}
              {Math.abs(place.coordinates.longitude).toFixed(4)}° W
            </Text>
          </View>
          <Text style={styles.description}>{place.description}</Text>
          <View style={styles.actionRow}>
            <Button
              title={planned ? 'In Plan' : 'Add Stop'}
              emoji={planned ? '◇' : '+'}
              variant={planned ? 'cyan' : 'ghost'}
              onPress={() => togglePlanned(place.id)}
              style={styles.rowButton}
            />
            <Button
              title="Share"
              emoji="↗"
              variant="ghost"
              onPress={sharePlace}
              style={styles.rowButton}
            />
          </View>
          <Button
            title="Open Atlas"
            emoji="⌖"
            onPress={() => navigate({name: 'atlas', selectedPlaceId: place.id})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.androidInset + layout.statusTopGap,
  },
  content: {},
  hero: {
    height: 282,
    justifyContent: 'flex-start',
  },
  heroCompact: {
    height: 236,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  heroActions: {
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topButton: {
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: 'rgba(7, 13, 31, 0.78)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topButtonText: {
    color: '#4f91ff',
    fontWeight: '900',
    fontSize: 15,
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(7, 13, 31, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  body: {
    marginTop: -36,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.18)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 23,
    lineHeight: 28,
  },
  place: {
    color: colors.dim,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
  },
  coordinates: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  coordinatesText: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 22,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rowButton: {
    flex: 1,
    marginRight: 10,
  },
});
