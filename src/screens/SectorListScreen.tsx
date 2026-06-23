import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {LightningSiteCard} from '../components/PlaceCards';
import {
  getLightningSector,
  getSitesBySector,
  lightningSectors,
  lightningSites,
} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function SectorListScreen({sectorId}: {sectorId: string}) {
  const {goBack, navigate} = useNavigation();
  const sector = getLightningSector(sectorId);
  const items =
    sectorId === 'all' ? lightningSites : getSitesBySector(sectorId);
  const title = sector?.title ?? 'All Watch Sites';

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => goBack({name: 'home'})} style={styles.back}>
          <Text style={styles.backText}>‹ Home</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backSpace} />
      </View>
      <Text style={styles.count}>
        {items.length} observation windows for Lightning Venezuela Trip Map
      </Text>
      {sectorId === 'all' ? (
        <View style={styles.collectionRow}>
          {lightningSectors.map(item => (
            <View key={item.id} style={styles.collectionPill}>
              <Text style={styles.collectionPillText}>
                {item.symbol} {item.title}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
      {items.map(item => (
        <LightningSiteCard
          key={item.id}
          site={item}
          onPress={() => navigate({name: 'siteDetail', siteId: item.id})}
        />
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    minWidth: 76,
    paddingVertical: 8,
  },
  backText: {
    color: '#4f91ff',
    fontSize: 16,
    fontWeight: '800',
  },
  backSpace: {
    width: 76,
  },
  headerTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },
  count: {
    color: colors.dim,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
  },
  collectionRow: {
    marginBottom: 12,
  },
  collectionPill: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 8,
  },
  collectionPillText: {
    color: colors.muted,
    fontWeight: '800',
    fontSize: 12,
  },
});
