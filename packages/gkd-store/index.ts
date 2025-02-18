import store2, { StoreType } from 'store2';

export interface StoreValues {
  token: string;
  lang: "en" | "zh-CN";
}

class Store {

  store: StoreType;

  constructor(ns?: string) {
    this.store = store2.namespace(ns ?? import.meta.env.VITE_APP_NAME ?? 'app');
  }

  get<K extends keyof StoreValues>(key: K): StoreValues[K] {
    return this.store.get(key);
  }

  set<K extends keyof StoreValues>(key: K, value: StoreValues[K]) {
    return this.store.set(key, value);
  }

  init(ns: string) {
    this.store = store2.namespace(ns);
  }
}

export let store = new Store();
