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
import {getLightningSite} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useLightningWatch} from '../storage/LightningWatchContext';
import {colors, getNavigationMetrics, layout} from '../theme';

const watchTypeLabel = {
  stormCore: 'Storm core',
  lagoonBase: 'Lagoon base',
  clearSkyLink: 'Clear-sky link',
};

export function LightningSiteDetailScreen({siteId}: {siteId: string}) {
  const {goBack, navigate} = useNavigation();
  const {isSavedSite, toggleSavedSite} = useLightningWatch();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const site = getLightningSite(siteId);

  if (!site) {
    return null;
  }

  const saved = isSavedSite(site.id);

  const shareSite = () => {
    Share.share({
      title: site.title,
      message: `${site.title}\n${site.place}\n${site.lightningWindow}\n${site.description}`,
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
          source={site.image}
          style={[styles.hero, metrics.compact && styles.heroCompact]}>
          <View style={styles.heroShade} />
          <View style={styles.heroActions}>
            <Pressable
              onPress={() => goBack({name: 'home'})}
              style={styles.topButton}>
              <Text style={styles.topButtonText}>‹ Back</Text>
            </Pressable>
            <Pressable onPress={shareSite} style={styles.roundButton}>
              <Text style={styles.roundButtonText}>↗</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={[styles.body, {paddingHorizontal: metrics.pageX}]}>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{site.tag}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {watchTypeLabel[site.watchType]}
              </Text>
            </View>
          </View>
          <Text style={[styles.title, metrics.compact && styles.titleCompact]}>
            {site.title}
          </Text>
          <Text style={styles.place}>◎ {site.place}</Text>
          <View style={styles.coordinates}>
            <Text style={styles.coordinatesText}>
              ⌖ {Math.abs(site.coordinates.latitude).toFixed(4)}° N,{' '}
              {Math.abs(site.coordinates.longitude).toFixed(4)}° W
            </Text>
          </View>
          <View style={styles.windowPanel}>
            <Text style={styles.windowLabel}>Observation window</Text>
            <Text style={styles.windowTitle}>{site.lightningWindow}</Text>
            <Text style={styles.windowBody}>{site.signal}</Text>
            <Text style={styles.windowRole}>{site.fieldRole}</Text>
          </View>
          <Text style={styles.description}>{site.description}</Text>
          <View style={styles.actionRow}>
            <Button
              title={saved ? 'Saved' : 'Save Window'}
              emoji={saved ? '◇' : '+'}
              variant={saved ? 'cyan' : 'ghost'}
              onPress={() => toggleSavedSite(site.id)}
              style={styles.rowButton}
            />
            <Button
              title="Share"
              emoji="↗"
              variant="ghost"
              onPress={shareSite}
              style={styles.rowButton}
            />
          </View>
          <Button
            title="Open Lightning Map"
            emoji="⌖"
            onPress={() => navigate({name: 'map', selectedSiteId: site.id})}
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
  windowPanel: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#080c1d',
    padding: 14,
  },
  windowLabel: {
    color: colors.dim,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  windowTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 7,
  },
  windowBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    marginTop: 7,
  },
  windowRole: {
    color: '#4f91ff',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 10,
    textTransform: 'uppercase',
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
