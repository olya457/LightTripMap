import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {runtimeStore} from './runtimeStore';

type LightningWatchValue = {
  savedSiteIds: string[];
  isSavedSite: (id: string) => boolean;
  toggleSavedSite: (id: string) => void;
  removeSavedSite: (id: string) => void;
};

const STORAGE_KEY = 'lightningVenezuelaTripMap.savedSiteIds';

const LightningWatchContext = createContext<LightningWatchValue | undefined>(
  undefined,
);

export function LightningWatchProvider({children}: {children: ReactNode}) {
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    runtimeStore
      .getItem(STORAGE_KEY)
      .then(value => {
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            setSavedSiteIds(parsed.filter(item => typeof item === 'string'));
          }
        }
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) {
      runtimeStore
        .setItem(STORAGE_KEY, JSON.stringify(savedSiteIds))
        .catch(() => undefined);
    }
  }, [hydrated, savedSiteIds]);

  const value = useMemo<LightningWatchValue>(
    () => ({
      savedSiteIds,
      isSavedSite: id => savedSiteIds.includes(id),
      toggleSavedSite: id =>
        setSavedSiteIds(current =>
          current.includes(id)
            ? current.filter(item => item !== id)
            : [...current, id],
        ),
      removeSavedSite: id =>
        setSavedSiteIds(current => current.filter(item => item !== id)),
    }),
    [savedSiteIds],
  );

  return (
    <LightningWatchContext.Provider value={value}>
      {children}
    </LightningWatchContext.Provider>
  );
}

export function useLightningWatch() {
  const value = useContext(LightningWatchContext);
  if (!value) {
    throw new Error(
      'useLightningWatch must be used inside LightningWatchProvider',
    );
  }
  return value;
}
