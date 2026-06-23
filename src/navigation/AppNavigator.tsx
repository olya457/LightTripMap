import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {LightningBriefsScreen} from '../screens/LightningBriefsScreen';
import {LightningHomeScreen} from '../screens/LightningHomeScreen';
import {LightningMapScreen} from '../screens/LightningMapScreen';
import {LightningSiteDetailScreen} from '../screens/LightningSiteDetailScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {SectorListScreen} from '../screens/SectorListScreen';
import {SignalNoteDetailScreen} from '../screens/SignalNoteDetailScreen';
import {SignalNotesScreen} from '../screens/SignalNotesScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {StormReadinessScreen} from '../screens/StormReadinessScreen';
import {WatchPlanScreen} from '../screens/WatchPlanScreen';
import {runtimeStore} from '../storage/runtimeStore';
import {NavigationProvider, useNavigation} from './NavigationContext';

const ONBOARDING_KEY = 'lightningVenezuelaTripMap.hasCompletedIntro';

type Flow = 'splash' | 'onboarding' | 'app';

export function AppNavigator() {
  const [flow, setFlow] = useState<Flow>('splash');
  const [timerDone, setTimerDone] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 5000);
    runtimeStore
      .getItem(ONBOARDING_KEY)
      .then(value => setHasSeenOnboarding(value === 'true'))
      .catch(() => setHasSeenOnboarding(false));
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timerDone && hasSeenOnboarding !== null) {
      setFlow(hasSeenOnboarding ? 'app' : 'onboarding');
    }
  }, [hasSeenOnboarding, timerDone]);

  const finishOnboarding = () => {
    runtimeStore.setItem(ONBOARDING_KEY, 'true').finally(() => setFlow('app'));
  };

  if (flow === 'splash') {
    return <SplashScreen />;
  }

  if (flow === 'onboarding') {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }

  return (
    <NavigationProvider>
      <AppShell />
    </NavigationProvider>
  );
}

function AppShell() {
  const {route} = useNavigation();

  return (
    <View style={styles.root}>
      {route.name === 'home' ? <LightningHomeScreen /> : null}
      {route.name === 'sectorList' ? (
        <SectorListScreen sectorId={route.sectorId} />
      ) : null}
      {route.name === 'siteDetail' ? (
        <LightningSiteDetailScreen siteId={route.siteId} />
      ) : null}
      {route.name === 'watch' ? <WatchPlanScreen /> : null}
      {route.name === 'map' ? (
        <LightningMapScreen selectedSiteId={route.selectedSiteId} />
      ) : null}
      {route.name === 'briefs' ? <LightningBriefsScreen /> : null}
      {route.name === 'signals' ? <SignalNotesScreen /> : null}
      {route.name === 'signalNoteDetail' ? (
        <SignalNoteDetailScreen noteId={route.noteId} />
      ) : null}
      {route.name === 'ready' ? <StormReadinessScreen /> : null}
      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
