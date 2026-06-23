import React, {useEffect, useMemo, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {lightningMedia} from '../assets/media';
import {AppScreen} from '../components/AppScreen';
import {LightningSiteCard} from '../components/PlaceCards';
import {lightningSites} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {LightningSite} from '../types';

const bounds = {
  minLatitude: 2.5,
  maxLatitude: 11.2,
  minLongitude: -73.6,
  maxLongitude: -61.5,
};

const markerColor: Record<LightningSite['watchType'], string> = {
  stormCore: colors.blue,
  lagoonBase: colors.cyan,
  clearSkyLink: '#ad5cff',
};

const markerSymbol: Record<LightningSite['watchType'], string> = {
  stormCore: '◎',
  lagoonBase: '◇',
  clearSkyLink: '✦',
};

const clampPercent = (value: number) => Math.max(6, Math.min(94, value));

function projectLightningSite(site: LightningSite, zoom: number) {
  const rawLeft =
    ((site.coordinates.longitude - bounds.minLongitude) /
      (bounds.maxLongitude - bounds.minLongitude)) *
    100;
  const rawTop =
    ((bounds.maxLatitude - site.coordinates.latitude) /
      (bounds.maxLatitude - bounds.minLatitude)) *
    100;

  const left = clampPercent(50 + (rawLeft - 50) * zoom);
  const top = clampPercent(50 + (rawTop - 50) * zoom);

  return {
    left: `${left}%` as `${number}%`,
    top: `${top}%` as `${number}%`,
  };
}

export function LightningMapScreen({
  selectedSiteId,
}: {
  selectedSiteId?: string;
}) {
  const {navigate} = useNavigation();
  const [selectedId, setSelectedId] = useState(selectedSiteId);
  const [zoom, setZoom] = useState(1);
  const selected = useMemo(
    () => lightningSites.find(item => item.id === selectedId),
    [selectedId],
  );

  useEffect(() => {
    if (selectedSiteId) {
      setSelectedId(selectedSiteId);
      setZoom(1.18);
    }
  }, [selectedSiteId]);

  const focusSite = (site: LightningSite) => {
    setSelectedId(site.id);
  };

  const adjustZoom = (factor: number) => {
    setZoom(current => Math.max(0.82, Math.min(1.55, current * factor)));
  };

  const resetMap = () => {
    setSelectedId(undefined);
    setZoom(1);
  };

  return (
    <AppScreen eyebrow="Lightning Map" title="Watch Sites" scroll={false}>
      <ImageBackground
        source={lightningMedia.introMapBackdrop}
        style={styles.mapCard}
        imageStyle={styles.mapImage}>
        <View style={styles.mapTint} />
        <View style={styles.gridLineVertical} />
        <View style={styles.gridLineHorizontal} />
        <View style={styles.catatumboPulse} />
        {lightningSites.map(site => {
          const active = selectedId === site.id;
          const color = markerColor[site.watchType];
          const position = projectLightningSite(site, zoom);

          return (
            <Pressable
              key={site.id}
              onPress={() => focusSite(site)}
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
                  {markerSymbol[site.watchType]}
                </Text>
              </View>
            </Pressable>
          );
        })}
        <View style={styles.controls}>
          <Pressable
            onPress={() => adjustZoom(1.18)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
          <Pressable
            onPress={() => adjustZoom(0.84)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </Pressable>
          <Pressable onPress={resetMap} style={styles.controlButton}>
            <Text style={styles.resetText}>⌂</Text>
          </Pressable>
        </View>
        <View style={styles.legend}>
          <LegendDot color={colors.blue} label="Storm core" />
          <LegendDot color={colors.cyan} label="Lagoon base" />
          <LegendDot color="#ad5cff" label="Clear-sky link" />
        </View>
        <View style={styles.mapLabel}>
          <Text style={styles.mapLabelText}>Catatumbo focus</Text>
          <Text style={styles.mapLabelSub}>Lake Maracaibo night system</Text>
        </View>
        {selected ? (
          <View style={styles.selectedCard}>
            <Pressable
              hitSlop={12}
              onPress={() => setSelectedId(undefined)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
            <LightningSiteCard
              compact
              site={selected}
              onPress={() =>
                navigate({name: 'siteDetail', siteId: selected.id})
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
  catatumboPulse: {
    position: 'absolute',
    left: '12%',
    top: '14%',
    width: 138,
    height: 138,
    borderRadius: 69,
    borderWidth: 2,
    borderColor: 'rgba(79, 145, 255, 0.2)',
    backgroundColor: 'rgba(29, 97, 255, 0.08)',
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
  mapLabel: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    maxWidth: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.82)',
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  mapLabelText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  mapLabelSub: {
    color: colors.dim,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    marginTop: 3,
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
