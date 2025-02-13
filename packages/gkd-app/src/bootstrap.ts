import { net } from '@gkd/api';
import { store } from '@gkd/store';
import logger from '@gkd/logger';

interface BootStrapOptions {
  appName: string;
  baseUrl: string;
}

export function bootstrap(options?: BootStrapOptions) {
  logger.infra('bootstrap start');
  
  logger.infra('boot app with', { appName: options?.appName });
  
  store.init(options?.appName ?? 'app');
  logger.infra('store init with', { appName: options?.appName });

  net.init({ baseURL: options?.baseUrl });
  logger.infra('net init with', { baseURL: options?.baseUrl });
}
