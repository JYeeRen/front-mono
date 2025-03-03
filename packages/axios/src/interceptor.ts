import { InternalAxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers = config.headers || {};
  config.headers['X-Request-Id'] = v4();
  // config.headers.Authorization = `Bearer ${store.get('token')}`;
  // config.headers.Lang = store.get('lang') || 'zh-CN';
  // config.headers.tz = djs.tz.guess();
  // config.headers.Utcoffset = djs().utcOffset() * 60;
  return config;
}

// export function responseInterceptor(response: AxiosResponse): AxiosResponse {
//   const backendSuccess = response.data.status === '200';
//   if (backendSuccess) {
//     return response;
//   }
//   throw new Error(
//     `${response.config.method} ${response.config.url} => ${response.data.code} ${response.data.msg}`,
//   );
// }
