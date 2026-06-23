import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, shadow} from '../theme';
import {LightningSector, LightningSite} from '../types';

type SectorCardProps = {
  sector: LightningSector;
  count: number;
  onPress: () => void;
};

export function SectorCard({sector, count, onPress}: SectorCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.collectionCard}>
      <View
        style={[styles.collectionGlow, {backgroundColor: sector.gradient[1]}]}
      />
      <View style={styles.collectionBody}>
        <Text style={styles.collectionEyebrow}>{sector.eyebrow}</Text>
        <Text style={styles.collectionTitle}>{sector.title}</Text>
        <Text style={styles.collectionCount}>{count} Windows</Text>
      </View>
      <Text style={styles.collectionEmoji}>{sector.symbol}</Text>
    </Pressable>
  );
}

type LightningSiteCardProps = {
  site: LightningSite;
  onPress: () => void;
  compact?: boolean;
  saved?: boolean;
};

export function LightningSiteCard({
  site,
  onPress,
  compact = false,
  saved = false,
}: LightningSiteCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.placeCard, compact && styles.placeCardCompact]}>
      <ImageBackground
        source={site.image}
        style={[styles.placeImage, compact && styles.placeImageCompact]}
        imageStyle={styles.placeImageRadius}>
        <View style={styles.imageShade} />
        <View style={styles.placeBadge}>
          <Text style={styles.placeBadgeText}>
            {saved ? 'Saved' : site.tag}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.placeBody}>
        <Text style={styles.placeTitle}>{site.title}</Text>
        <Text style={styles.placeMeta}>{site.place}</Text>
        <View style={styles.signalBox}>
          <Text style={styles.signalLabel}>{site.lightningWindow}</Text>
          <Text numberOfLines={2} style={styles.signalText}>
            {site.signal}
          </Text>
        </View>
        {!compact ? (
          <Text numberOfLines={3} style={styles.placeDescription}>
            {site.description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  collectionCard: {
    minHeight: 116,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    overflow: 'hidden',
    marginBottom: 14,
    ...shadow,
  },
  collectionGlow: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.26,
  },
  collectionBody: {
    padding: 18,
  },
  collectionEyebrow: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  collectionTitle: {
    color: colors.text,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
    marginTop: 7,
    paddingRight: 74,
  },
  collectionCount: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  collectionEmoji: {
    position: 'absolute',
    right: 18,
    top: 28,
    color: colors.text,
    fontSize: 31,
    fontWeight: '900',
  },
  placeCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    overflow: 'hidden',
    marginBottom: 14,
  },
  placeCardCompact: {
    flexDirection: 'row',
    minHeight: 132,
  },
  placeImage: {
    height: 174,
  },
  placeImageCompact: {
    width: 118,
    height: '100%',
  },
  placeImageRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  placeBadge: {
    alignSelf: 'flex-start',
    margin: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(7, 13, 31, 0.72)',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  placeBadgeText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  placeBody: {
    flex: 1,
    padding: 15,
  },
  placeTitle: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
  },
  placeMeta: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  signalBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#16234a',
    backgroundColor: '#080c1d',
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginTop: 11,
  },
  signalLabel: {
    color: colors.cyan,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  signalText: {
    color: '#aab8d8',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  placeDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    marginTop: 11,
  },
});
