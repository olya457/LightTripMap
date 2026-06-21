import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, shadow} from '../theme';
import {GuidePlace, RouteCollection} from '../types';

export function CollectionCard({
  collection,
  count,
  onPress,
}: {
  collection: RouteCollection;
  count: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.collection,
        {backgroundColor: collection.gradient[0], borderColor: collection.gradient[1]},
        pressed && styles.pressed,
      ]}>
      <View>
        <Text style={styles.collectionEmoji}>{collection.emoji}</Text>
        <Text style={styles.collectionTitle}>{collection.title}</Text>
        <Text style={styles.collectionCount}>{count} Stops</Text>
      </View>
      <View style={styles.collectionArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </Pressable>
  );
}

export function PlaceCard({
  place,
  onPress,
  compact = false,
  planned = false,
}: {
  place: GuidePlace;
  onPress: () => void;
  compact?: boolean;
  planned?: boolean;
}) {
  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.compact, pressed && styles.pressed]}>
        <Image source={place.image} style={styles.compactImage} />
        <View style={styles.compactBody}>
          <Text numberOfLines={1} style={styles.placeTitle}>
            {place.title}
          </Text>
          <Text numberOfLines={1} style={styles.placeMeta}>
            ◎ {place.place}
          </Text>
          <View style={styles.smallTag}>
            <Text style={styles.smallTagText}>{place.tag}</Text>
          </View>
        </View>
        {planned ? <Text style={styles.plannedIcon}>◇</Text> : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <ImageBackground source={place.image} style={styles.cardImage} imageStyle={styles.cardImageRadius}>
        <View style={styles.imageShade} />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{place.tag}</Text>
        </View>
      </ImageBackground>
      <View style={styles.cardBody}>
        <Text style={styles.placeTitle}>{place.title}</Text>
        <Text style={styles.placeMeta}>◎ {place.place}</Text>
        <Text numberOfLines={3} style={styles.placeDescription}>
          {place.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.99}],
  },
  collection: {
    minHeight: 130,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  collectionEmoji: {
    fontSize: 29,
    marginBottom: 16,
  },
  collectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    maxWidth: 230,
  },
  collectionCount: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 8,
  },
  collectionArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(45, 117, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(70, 151, 255, 0.4)',
  },
  arrowText: {
    color: '#54a2ff',
    fontSize: 32,
    lineHeight: 35,
  },
  card: {
    borderRadius: 18,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    justifyContent: 'flex-start',
  },
  cardImageRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  tag: {
    alignSelf: 'flex-start',
    margin: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.22)',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardBody: {
    padding: 16,
  },
  placeTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  placeMeta: {
    color: colors.dim,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  placeDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  compact: {
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 10,
    marginBottom: 12,
  },
  compactImage: {
    width: 78,
    height: 68,
    borderRadius: 12,
  },
  compactBody: {
    flex: 1,
    marginLeft: 12,
  },
  smallTag: {
    alignSelf: 'flex-start',
    marginTop: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  smallTagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  plannedIcon: {
    fontSize: 20,
    marginLeft: 8,
    ...shadow,
  },
});
