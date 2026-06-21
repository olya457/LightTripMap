import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {PlaceCard} from '../components/PlaceCards';
import {
  getPlacesByCollection,
  getRouteCollection,
  guidePlaces,
  routeCollections,
} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function RouteListScreen({collectionId}: {collectionId: string}) {
  const {goBack, navigate} = useNavigation();
  const collection = getRouteCollection(collectionId);
  const items =
    collectionId === 'all' ? guidePlaces : getPlacesByCollection(collectionId);
  const title = collection?.title ?? 'Complete Guide';

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => goBack({name: 'guide'})} style={styles.back}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backSpace} />
      </View>
      <Text style={styles.count}>
        {items.length} stops ready for the route
      </Text>
      {collectionId === 'all' ? (
        <View style={styles.collectionRow}>
          {routeCollections.map(item => (
            <View key={item.id} style={styles.collectionPill}>
              <Text style={styles.collectionPillText}>
                {item.emoji} {item.title}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
      {items.map(item => (
        <PlaceCard
          key={item.id}
          place={item}
          onPress={() => navigate({name: 'placeDetail', placeId: item.id})}
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
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
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
