import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import {AppRoute, MainTab} from '../types';

type NavigationValue = {
  route: AppRoute;
  activeTab: MainTab;
  navigate: (route: AppRoute) => void;
  openTab: (tab: MainTab) => void;
  goBack: (fallback?: AppRoute) => void;
};

const initialRoute: AppRoute = {name: 'home'};

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

const tabRoutes: Record<MainTab, AppRoute> = {
  home: {name: 'home'},
  watch: {name: 'watch'},
  map: {name: 'map'},
  briefs: {name: 'briefs'},
  signals: {name: 'signals'},
  ready: {name: 'ready'},
};

function getTab(route: AppRoute): MainTab {
  if (route.name === 'watch') {
    return 'watch';
  }
  if (route.name === 'map') {
    return 'map';
  }
  if (route.name === 'briefs') {
    return 'briefs';
  }
  if (route.name === 'signals' || route.name === 'signalNoteDetail') {
    return 'signals';
  }
  if (route.name === 'ready') {
    return 'ready';
  }
  return 'home';
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
          current.length > 1
            ? current.slice(0, -1)
            : [fallback ?? initialRoute],
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
