import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {AppRoute, MainTab} from '../types';

type NavigationValue = {
  route: AppRoute;
  activeTab: MainTab;
  navigate: (route: AppRoute) => void;
  openTab: (tab: MainTab) => void;
  goBack: (fallback?: AppRoute) => void;
};

const initialRoute: AppRoute = {name: 'guide'};

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

const tabRoutes: Record<MainTab, AppRoute> = {
  guide: {name: 'guide'},
  plan: {name: 'plan'},
  atlas: {name: 'atlas'},
  insights: {name: 'insights'},
  notes: {name: 'notes'},
  check: {name: 'check'},
};

function getTab(route: AppRoute): MainTab {
  if (route.name === 'plan') {
    return 'plan';
  }
  if (route.name === 'atlas') {
    return 'atlas';
  }
  if (route.name === 'insights') {
    return 'insights';
  }
  if (route.name === 'notes' || route.name === 'noteDetail') {
    return 'notes';
  }
  if (route.name === 'check') {
    return 'check';
  }
  return 'guide';
}

export function NavigationProvider({children}: {children: ReactNode}) {
  const [stack, setStack] = useState<AppRoute[]>([initialRoute]);
  const route = stack[stack.length - 1];
  const activeTab = getTab(route);

  const value = useMemo<NavigationValue>(
    () => ({
      route,
      activeTab,
      navigate: next => setStack(current => [...current, next]),
      openTab: tab => setStack([tabRoutes[tab]]),
      goBack: fallback =>
        setStack(current =>
          current.length > 1 ? current.slice(0, -1) : [fallback ?? initialRoute],
        ),
    }),
    [activeTab, route],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error('useNavigation must be used inside NavigationProvider');
  }
  return value;
}
