import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import {runtimeStore} from './runtimeStore';

type RoutePlanValue = {
  plannedPlaceIds: string[];
  isPlanned: (id: string) => boolean;
  togglePlanned: (id: string) => void;
  removePlanned: (id: string) => void;
};

const STORAGE_KEY = 'routeGlow.plannedPlaceIds';

const RoutePlanContext = createContext<RoutePlanValue | undefined>(
  undefined,
);

export function RoutePlanProvider({children}: {children: ReactNode}) {
  const [plannedPlaceIds, setPlannedPlaceIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    runtimeStore.getItem(STORAGE_KEY)
      .then(value => {
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            setPlannedPlaceIds(parsed.filter(item => typeof item === 'string'));
          }
        }
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) {
      runtimeStore.setItem(STORAGE_KEY, JSON.stringify(plannedPlaceIds)).catch(
        () => undefined,
      );
    }
  }, [hydrated, plannedPlaceIds]);

  const value = useMemo<RoutePlanValue>(
    () => ({
      plannedPlaceIds,
      isPlanned: id => plannedPlaceIds.includes(id),
      togglePlanned: id =>
        setPlannedPlaceIds(current =>
          current.includes(id)
            ? current.filter(item => item !== id)
            : [...current, id],
        ),
      removePlanned: id =>
        setPlannedPlaceIds(current => current.filter(item => item !== id)),
    }),
    [plannedPlaceIds],
  );

  return (
    <RoutePlanContext.Provider value={value}>
      {children}
    </RoutePlanContext.Provider>
  );
}

export function useRoutePlan() {
  const value = useContext(RoutePlanContext);
  if (!value) {
    throw new Error('useRoutePlan must be used inside RoutePlanProvider');
  }
  return value;
}
