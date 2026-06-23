import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {lightningMedia} from '../assets/media';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {LightningSiteCard} from '../components/PlaceCards';
import {lightningSectors, lightningSites} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useLightningWatch} from '../storage/LightningWatchContext';
import {colors, getNavigationMetrics, shadow} from '../theme';

export function WatchPlanScreen() {
  const {openTab, navigate} = useNavigation();
  const {savedSiteIds, removeSavedSite} = useLightningWatch();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const emptyImageSize = Math.min(
    width - metrics.pageX * 2,
    metrics.compact ? 210 : 320,
    height * (metrics.compact ? 0.3 : 0.36),
  );
  const savedSites = lightningSites.filter(item =>
    savedSiteIds.includes(item.id),
  );
  const sectorCount = lightningSectors.filter(sector =>
    savedSites.some(site => site.sectorId === sector.id),
  ).length;
  const hasStormCore = savedSites.some(site => site.watchType === 'stormCore');
  const hasFallback = savedSites.some(
    site => site.watchType === 'clearSkyLink',
  );

  if (savedSites.length === 0) {
    return (
      <AppScreen eyebrow="Night Builder" title="Watch Plan">
        <View style={[styles.empty, metrics.compact && styles.emptyCompact]}>
          <Image
            source={lightningMedia.introWatchGrid}
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
            No lightning windows saved yet
          </Text>
          <Text
            style={[
              styles.emptyBody,
              metrics.compact && styles.emptyBodyCompact,
            ]}>
            Save a Catatumbo storm-core site, then add a lagoon base and a
            clear-sky fallback.
          </Text>
          <Button
            title="Browse Watch Sites"
            onPress={() => openTab('home')}
            style={[
              styles.emptyButton,
              metrics.compact && styles.emptyButtonCompact,
            ]}
          />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Night Builder" title="Watch Plan">
      <View style={styles.summary}>
        <Text style={styles.summaryCount}>{savedSites.length}</Text>
        <Text style={styles.summaryText}>
          saved windows across {sectorCount} lightning sectors.{' '}
          {hasStormCore ? 'Storm core is covered.' : 'Add a storm-core site.'}{' '}
          {hasFallback ? 'Fallback ready.' : 'Add one clear-sky fallback.'}
        </Text>
      </View>
      {savedSites.map((site, index) => (
        <View key={site.id} style={styles.planItem}>
          <Text style={styles.step}>{String(index + 1).padStart(2, '0')}</Text>
          <LightningSiteCard
            compact
            saved
            site={site}
            onPress={() => navigate({name: 'siteDetail', siteId: site.id})}
          />
          <Pressable
            onPress={() => removeSavedSite(site.id)}
            style={styles.removeButton}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      ))}
      <Button
        title="Open Lightning Map"
        emoji="⌖"
        variant="ghost"
        onPress={() => openTab('map')}
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
    minHeight: 88,
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
