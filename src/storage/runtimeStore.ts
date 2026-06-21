const store = new Map<string, string>();

export const runtimeStore = {
  getItem: (key: string) => Promise.resolve(store.get(key) ?? null),
  setItem: (key: string, value: string) => {
    store.set(key, value);
    return Promise.resolve();
  },
};
