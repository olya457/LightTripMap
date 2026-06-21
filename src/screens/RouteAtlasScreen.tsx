import React, {useEffect, useMemo, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {media} from '../assets/media';
import {AppScreen} from '../components/AppScreen';
import {PlaceCard} from '../components/PlaceCards';
import {guidePlaces} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {GuidePlace} from '../types';

const bounds = {
  minLatitude: 2.5,
  maxLatitude: 11.2,
  minLongitude: -73.6,
  maxLongitude: -61.5,
};

const markerColor: Record<GuidePlace['routeType'], string> = {
  viewpoint: colors.blue,
  waterline: colors.cyan,
  canopy: '#ad5cff',
};

const markerSymbol: Record<GuidePlace['routeType'], string> = {
  viewpoint: '◎',
  waterline: '◇',
  canopy: '✦',
};

const clampPercent = (value: number) => Math.max(6, Math.min(94, value));

function projectPlace(place: GuidePlace, zoom: number) {
  const rawLeft =
    ((place.coordinates.longitude - bounds.minLongitude) /
      (bounds.maxLongitude - bounds.minLongitude)) *
    100;
  const rawTop =
    ((bounds.maxLatitude - place.coordinates.latitude) /
      (bounds.maxLatitude - bounds.minLatitude)) *
    100;

  const left = clampPercent(50 + (rawLeft - 50) * zoom);
  const top = clampPercent(50 + (rawTop - 50) * zoom);

  return {
    left: `${left}%` as `${number}%`,
    top: `${top}%` as `${number}%`,
  };
}

export function RouteAtlasScreen({
  selectedPlaceId,
}: {
  selectedPlaceId?: string;
}) {
  const {navigate} = useNavigation();
  const [selectedId, setSelectedId] = useState(selectedPlaceId);
  const [zoom, setZoom] = useState(1);
  const selected = useMemo(
    () => guidePlaces.find(item => item.id === selectedId),
    [selectedId],
  );

  useEffect(() => {
    if (selectedPlaceId) {
      setSelectedId(selectedPlaceId);
      setZoom(1.18);
    }
  }, [selectedPlaceId]);

  const focusPlace = (place: GuidePlace) => {
    setSelectedId(place.id);
  };

  const adjustZoom = (factor: number) => {
    setZoom(current => Math.max(0.82, Math.min(1.55, current * factor)));
  };

  const resetAtlas = () => {
    setSelectedId(undefined);
    setZoom(1);
  };

  return (
    <AppScreen eyebrow="Route Atlas" title="Map Stops" scroll={false}>
      <ImageBackground
        source={media.introRouteAtlas}
        style={styles.mapCard}
        imageStyle={styles.mapImage}>
        <View style={styles.mapTint} />
        <View style={styles.gridLineVertical} />
        <View style={styles.gridLineHorizontal} />
        {guidePlaces.map(place => {
          const active = selectedId === place.id;
          const color = markerColor[place.routeType];
          const position = projectPlace(place, zoom);

          return (
            <Pressable
              key={place.id}
              onPress={() => focusPlace(place)}
              style={[
                styles.markerWrap,
                position,
                active && styles.markerWrapActive,
              ]}>
              <View style={[styles.markerGlow, {backgroundColor: color}]} />
              <View
                style={[
                  styles.markerCore,
                  {backgroundColor: color},
                  active && styles.markerCoreActive,
                ]}>
                <Text style={styles.markerText}>
                  {markerSymbol[place.routeType]}
                </Text>
              </View>
            </Pressable>
          );
        })}
        <View style={styles.controls}>
          <Pressable onPress={() => adjustZoom(1.18)} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
          <Pressable onPress={() => adjustZoom(0.84)} style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </Pressable>
          <Pressable onPress={resetAtlas} style={styles.controlButton}>
            <Text style={styles.resetText}>⌂</Text>
          </Pressable>
        </View>
        <View style={styles.legend}>
          <LegendDot color={colors.blue} label="Viewpoint" />
          <LegendDot color={colors.cyan} label="Waterline" />
          <LegendDot color="#ad5cff" label="Canopy" />
        </View>
        {selected ? (
          <View style={styles.selectedCard}>
            <Pressable
              hitSlop={12}
              onPress={() => setSelectedId(undefined)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
            <PlaceCard
              compact
              place={selected}
              onPress={() =>
                navigate({name: 'placeDetail', placeId: selected.id})
              }
            />
          </View>
        ) : null}
      </ImageBackground>
    </AppScreen>
  );
}

function LegendDot({color, label}: {color: string; label: string}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, {backgroundColor: color}]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapCard: {
    flex: 1,
    minHeight: 0,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#030916',
    overflow: 'hidden',
  },
  mapImage: {
    opacity: 0.34,
  },
  mapTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 7, 18, 0.54)',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor: 'rgba(79, 145, 255, 0.18)',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: 'rgba(79, 145, 255, 0.18)',
  },
  controls: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  controlText: {
    color: '#4f91ff',
    fontSize: 19,
    fontWeight: '900',
  },
  resetText: {
    color: '#4f91ff',
    fontSize: 18,
    fontWeight: '900',
  },
  markerWrap: {
    position: 'absolute',
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerWrapActive: {
    transform: [{scale: 1.16}],
  },
  markerGlow: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    opacity: 0.2,
  },
  markerCore: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.72)',
  },
  markerCoreActive: {
    borderColor: colors.text,
  },
  markerText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  legend: {
    position: 'absolute',
    left: 12,
    top: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },
  legendText: {
    color: '#b5c4e6',
    fontSize: 11,
    fontWeight: '800',
  },
  selectedCard: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
    paddingTop: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.96)',
  },
  closeText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '800',
  },
});
