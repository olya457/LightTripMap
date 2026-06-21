import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {CollectionCard} from '../components/PlaceCards';
import {getPlacesByCollection, guidePlaces, routeCollections} from '../data/places';
import {useNavigation} from '../navigation/NavigationContext';
import {useRoutePlan} from '../storage/RoutePlanContext';
import {colors} from '../theme';

export function GuideScreen() {
  const {navigate, openTab} = useNavigation();
  const {plannedPlaceIds} = useRoutePlan();

  const openSurpriseStop = () => {
    const place = guidePlaces[Math.floor(Math.random() * guidePlaces.length)];
    navigate({name: 'placeDetail', placeId: place.id});
  };

  return (
    <AppScreen eyebrow="RouteGlow Fieldbook" title="Plan the Route">
      <View style={styles.brief}>
        <View>
          <Text style={styles.briefLabel}>Route plan</Text>
          <Text style={styles.briefValue}>{plannedPlaceIds.length} stops</Text>
        </View>
        <Button
          title="Open Plan"
          variant="cyan"
          onPress={() => openTab('plan')}
          style={styles.briefButton}
        />
      </View>
      <View style={styles.list}>
        {routeCollections.map(collection => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            count={getPlacesByCollection(collection.id).length}
            onPress={() =>
              navigate({name: 'routeList', collectionId: collection.id})
            }
          />
        ))}
      </View>
      <Button
        title="Complete Guide"
        emoji="◎"
        variant="ghost"
        onPress={() => navigate({name: 'routeList', collectionId: 'all'})}
        style={styles.action}
      />
      <Button
        title="Surprise Stop"
        emoji="✦"
        variant="ghost"
        onPress={openSurpriseStop}
        style={styles.action}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  brief: {
    minHeight: 82,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  briefButton: {
    minHeight: 44,
    paddingHorizontal: 16,
  },
  list: {
    marginBottom: 4,
  },
  action: {
    marginTop: 12,
  },
});
