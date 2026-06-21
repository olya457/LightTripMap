import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {FieldNoteDetailScreen} from '../screens/FieldNoteDetailScreen';
import {FieldNotesScreen} from '../screens/FieldNotesScreen';
import {GuideScreen} from '../screens/GuideScreen';
import {InsightsScreen} from '../screens/InsightsScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PlaceDetailScreen} from '../screens/PlaceDetailScreen';
import {PlanScreen} from '../screens/PlanScreen';
import {ReadinessScreen} from '../screens/ReadinessScreen';
import {RouteAtlasScreen} from '../screens/RouteAtlasScreen';
import {RouteListScreen} from '../screens/RouteListScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {runtimeStore} from '../storage/runtimeStore';
import {NavigationProvider, useNavigation} from './NavigationContext';

const ONBOARDING_KEY = 'routeGlow.hasCompletedIntro';

type Flow = 'splash' | 'onboarding' | 'app';

export function AppNavigator() {
  const [flow, setFlow] = useState<Flow>('splash');
  const [timerDone, setTimerDone] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 5000);
    runtimeStore.getItem(ONBOARDING_KEY)
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
      {route.name === 'guide' ? <GuideScreen /> : null}
      {route.name === 'routeList' ? (
        <RouteListScreen collectionId={route.collectionId} />
      ) : null}
      {route.name === 'placeDetail' ? (
        <PlaceDetailScreen placeId={route.placeId} />
      ) : null}
      {route.name === 'plan' ? <PlanScreen /> : null}
      {route.name === 'atlas' ? (
        <RouteAtlasScreen selectedPlaceId={route.selectedPlaceId} />
      ) : null}
      {route.name === 'insights' ? <InsightsScreen /> : null}
      {route.name === 'notes' ? <FieldNotesScreen /> : null}
      {route.name === 'noteDetail' ? (
        <FieldNoteDetailScreen noteId={route.noteId} />
      ) : null}
      {route.name === 'check' ? <ReadinessScreen /> : null}
      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
