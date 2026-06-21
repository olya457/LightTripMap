import React, {useMemo, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {getInsightsByGroup, insightCards, insightGroups} from '../data/insights';
import {colors, shadow} from '../theme';

export function InsightsScreen() {
  const [groupId, setGroupId] = useState('timing');
  const groupInsights = getInsightsByGroup(groupId);
  const [insightId, setInsightId] = useState(groupInsights[0]?.id);
  const currentInsight = useMemo(
    () => insightCards.find(insight => insight.id === insightId) ?? groupInsights[0],
    [groupInsights, insightId],
  );
  const index = groupInsights.findIndex(
    insight => insight.id === currentInsight.id,
  );

  const selectGroup = (nextGroupId: string) => {
    const nextInsights = getInsightsByGroup(nextGroupId);
    setGroupId(nextGroupId);
    setInsightId(nextInsights[0]?.id);
  };

  const randomInsight = () => {
    const item = groupInsights[Math.floor(Math.random() * groupInsights.length)];
    setInsightId(item.id);
  };

  const shareInsight = () => {
    Share.share({
      title: currentInsight.title,
      message: `${currentInsight.title}\n${currentInsight.body}`,
    });
  };

  return (
    <AppScreen eyebrow="Route Sense" title="Travel Tips">
      <View style={styles.tabs}>
        {insightGroups.map(group => {
          const active = group.id === groupId;
          return (
            <Pressable
              key={group.id}
              onPress={() => selectGroup(group.id)}
              style={[styles.tab, active && styles.activeTab]}>
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {group.emoji} {group.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.feature}>
        <View style={styles.factIcon}>
          <Text style={styles.factIconText}>
            {insightGroups.find(item => item.id === groupId)?.emoji}
          </Text>
        </View>
        <Text style={styles.count}>
          {index + 1}/{groupInsights.length}
        </Text>
        <Text style={styles.factTitle}>{currentInsight.title}</Text>
        <Text style={styles.factBody}>{currentInsight.body}</Text>
      </View>
      <View style={styles.factList}>
        {groupInsights.map(insight => (
          <Pressable
            key={insight.id}
            onPress={() => setInsightId(insight.id)}
            style={[
              styles.factRow,
              insight.id === currentInsight.id && styles.activeFactRow,
            ]}>
            <Text
              numberOfLines={2}
              style={[
                styles.factRowText,
                insight.id === currentInsight.id && styles.activeFactRowText,
              ]}>
              {insight.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <Button
          title="Share Tip"
          emoji="↗"
          variant="ghost"
          onPress={shareInsight}
          style={styles.action}
        />
        <Button
          title="Random"
          emoji="✦"
          variant="ghost"
          onPress={randomInsight}
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
