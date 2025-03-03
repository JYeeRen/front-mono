import store2 from 'store2';
import type { Register } from './type';

interface StoreImpl {
  get<K extends keyof Register>(key: K): Register[K];
  set<K extends keyof Register>(key: K, value: Register[K]): void;
}

let store: StoreImpl = createStore();

export function createStore(ns: string = 'app'): StoreImpl {
  store = store2.namespace(ns || 'app');

  return {
    get<K extends keyof Register>(key: K): Register[K] {
      return this.store.get(key);
    },
    set<K extends keyof Register>(key: K, value: Register[K]) {
      return this.store.set(key, value);
    }
  };
}

export { store };

export type * from './type';
