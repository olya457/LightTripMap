import React, {useMemo, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {
  getBriefsByGroup,
  lightningBriefGroups,
  lightningBriefs,
} from '../data/insights';
import {colors, shadow} from '../theme';

export function LightningBriefsScreen() {
  const [groupId, setGroupId] = useState('windows');
  const groupBriefs = getBriefsByGroup(groupId);
  const [briefId, setBriefId] = useState(groupBriefs[0]?.id);
  const currentBrief = useMemo(
    () => lightningBriefs.find(brief => brief.id === briefId) ?? groupBriefs[0],
    [groupBriefs, briefId],
  );
  const index = groupBriefs.findIndex(brief => brief.id === currentBrief.id);

  const selectGroup = (nextGroupId: string) => {
    const nextBriefs = getBriefsByGroup(nextGroupId);
    setGroupId(nextGroupId);
    setBriefId(nextBriefs[0]?.id);
  };

  const randomBrief = () => {
    const item = groupBriefs[Math.floor(Math.random() * groupBriefs.length)];
    setBriefId(item.id);
  };

  const shareBrief = () => {
    Share.share({
      title: currentBrief.title,
      message: `${currentBrief.title}\n${currentBrief.body}`,
    });
  };

  return (
    <AppScreen eyebrow="Lightning Briefs" title="Watch Intelligence">
      <View style={styles.tabs}>
        {lightningBriefGroups.map(group => {
          const active = group.id === groupId;
          return (
            <Pressable
              key={group.id}
              onPress={() => selectGroup(group.id)}
              style={[styles.tab, active && styles.activeTab]}>
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {group.symbol} {group.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.feature}>
        <View style={styles.factIcon}>
          <Text style={styles.factIconText}>
            {lightningBriefGroups.find(item => item.id === groupId)?.symbol}
          </Text>
        </View>
        <Text style={styles.count}>
          {index + 1}/{groupBriefs.length}
        </Text>
        <Text style={styles.factTitle}>{currentBrief.title}</Text>
        <Text style={styles.factBody}>{currentBrief.body}</Text>
      </View>
      <View style={styles.factList}>
        {groupBriefs.map(brief => (
          <Pressable
            key={brief.id}
            onPress={() => setBriefId(brief.id)}
            style={[
              styles.factRow,
              brief.id === currentBrief.id && styles.activeFactRow,
            ]}>
            <Text
              numberOfLines={2}
              style={[
                styles.factRowText,
                brief.id === currentBrief.id && styles.activeFactRowText,
              ]}>
              {brief.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <Button
          title="Share Brief"
          emoji="↗"
          variant="ghost"
          onPress={shareBrief}
          style={styles.action}
        />
        <Button
          title="Random"
          emoji="✦"
          variant="ghost"
          onPress={randomBrief}
          style={styles.action}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 7,
  },
  activeTab: {
    borderColor: colors.borderStrong,
    backgroundColor: '#0d244f',
  },
  tabText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
  },
  activeTabText: {
    color: '#4f91ff',
  },
  feature: {
    minHeight: 238,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 22,
    marginBottom: 18,
    ...shadow,
  },
  factIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1a38',
  },
  factIconText: {
    fontSize: 24,
  },
  count: {
    position: 'absolute',
    top: 24,
    right: 24,
    color: '#4f91ff',
    fontWeight: '900',
  },
  factTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 22,
  },
  factBody: {
    color: '#aab8d8',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 12,
  },
  factList: {
    marginBottom: 28,
  },
  factRow: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#101b3a',
    backgroundColor: '#080c1d',
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
  },
  activeFactRow: {
    borderColor: colors.border,
    backgroundColor: colors.panel,
  },
  factRowText: {
    color: colors.dim,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '800',
  },
  activeFactRowText: {
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginRight: 12,
  },
});
