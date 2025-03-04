import { InternalAxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

export function requestIdInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.set('X-Request-Id', v4());
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
