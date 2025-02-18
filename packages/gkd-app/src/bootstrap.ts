import { net } from '@gkd/api';
import { store } from '@gkd/store';
import logger from '@gkd/logger';
import { init as init_i18n, InitOptions as I18nInitOptions, Lng } from '@gkd/i18n';


interface BootStrapOptions extends I18nInitOptions {
  appName: string;
  baseUrl: string;
}

export function bootstrap(options?: BootStrapOptions) {
  logger.boot('bootstrap');
  
  const appName = options?.appName ?? 'app';
  store.init(appName);
  logger.boot('0x00 init @gkd/store', { appName });

  const lng: Lng = store.get('lang') ?? 'zh-CN';
  logger.boot('0x01 @gkd/i18n', { lng });
  init_i18n({ lng, sources: options?.sources ?? {} });

  logger.boot('0x02 @gkd/api', { baseURL: options?.baseUrl });
  net.init({ baseURL: options?.baseUrl });
}
