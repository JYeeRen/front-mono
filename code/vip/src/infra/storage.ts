
import store, { StoreType } from "store2";
import { logger, APP_NAME } from '@app/infra';

interface StorageValues {
  token: string;
  lang: 'zh-CN' | 'en';
}

type StorageKeys = keyof StorageValues;

class Store2 {
  store: StoreType;

  constructor() {
    logger.store('init with', APP_NAME);
    this.store = store.namespace(APP_NAME);
  }
  
  set<K extends StorageKeys>(key: K, value: StorageValues[K], type: 'local' | 'session' = 'local') {
    if (type === 'session') {
      this.store.session.set(key, value);
      return;
    }
    this.store.set(key, value);
  }

  get<K extends StorageKeys>(key: K, type: 'local' | 'session' = 'local'): StorageValues[K] {
    if (type === 'session') {
      return this.store.session.get(key);
    }
    return this.store.get(key);
  }
}

const storage = new Store2();

export default storage;
