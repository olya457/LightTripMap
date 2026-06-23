import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {SectorCard} from '../components/PlaceCards';
import {
  getSitesBySector,
  lightningSectors,
  lightningSites,
} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useLightningWatch} from '../storage/LightningWatchContext';
import {colors} from '../theme';

export function LightningHomeScreen() {
  const {navigate, openTab} = useNavigation();
  const {savedSiteIds} = useLightningWatch();

  const savedSites = lightningSites.filter(site =>
    savedSiteIds.includes(site.id),
  );
  const coreSaved = savedSites.filter(
    site => site.watchType === 'stormCore',
  ).length;
  const primarySite = useMemo(
    () =>
      savedSites.find(site => site.watchType === 'stormCore') ??
      lightningSites.find(site => site.watchType === 'stormCore') ??
      lightningSites[0],
    [savedSites],
  );

  const openSignalPick = () => {
    const startIndex = savedSiteIds.length % lightningSites.length;
    navigate({name: 'siteDetail', siteId: lightningSites[startIndex].id});
  };

  return (
    <AppScreen eyebrow="Storm Control" title="Lightning Venezuela Trip Map">
      <View style={styles.brief}>
        <View style={styles.briefText}>
          <Text style={styles.briefLabel}>Watch plan</Text>
          <Text style={styles.briefValue}>{savedSiteIds.length} windows</Text>
          <Text style={styles.briefSub}>
            {coreSaved > 0
              ? `${coreSaved} storm-core site saved`
              : 'Start with a Catatumbo storm-core site'}
          </Text>
        </View>
        <Button
          title="Open Watch"
          variant="cyan"
          onPress={() => openTab('watch')}
          style={styles.briefButton}
        />
      </View>
      <View style={styles.priority}>
        <Text style={styles.priorityLabel}>Tonight priority</Text>
        <Text style={styles.priorityTitle}>{primarySite.title}</Text>
        <Text style={styles.priorityMeta}>{primarySite.lightningWindow}</Text>
        <Text style={styles.priorityBody}>{primarySite.fieldRole}</Text>
      </View>
      <View style={styles.list}>
        {lightningSectors.map(sector => (
          <SectorCard
            key={sector.id}
            sector={sector}
            count={getSitesBySector(sector.id).length}
            onPress={() => navigate({name: 'sectorList', sectorId: sector.id})}
          />
        ))}
      </View>
      <Button
        title="All Watch Sites"
        emoji="◎"
        variant="ghost"
        onPress={() => navigate({name: 'sectorList', sectorId: 'all'})}
        style={styles.action}
      />
      <Button
        title="Pick Signal Site"
        emoji="✦"
        variant="ghost"
        onPress={openSignalPick}
        style={styles.action}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  brief: {
    minHeight: 96,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  briefText: {
    flex: 1,
    paddingRight: 12,
  },
  briefLabel: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  briefValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },
  briefSub: {
    color: '#aab8d8',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  briefButton: {
    minHeight: 44,
    paddingHorizontal: 13,
  },
  priority: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#080c1d',
    padding: 16,
    marginBottom: 18,
  },
  priorityLabel: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  priorityTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
    marginTop: 8,
  },
  priorityMeta: {
    color: '#4f91ff',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },
  priorityBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    marginTop: 8,
  },
  list: {
    marginBottom: 4,
  },
  action: {
    marginTop: 12,
  },
});
