import { AxiosResponse, InternalAxiosRequestConfig as IARC } from 'axios';
import { v4 } from 'uuid';
import { store } from '@gkd/store';
import { ApiRes } from './types';
import djs from '@gkd/djs';

export function requestInterceptor(config: IARC): IARC {
  config.headers = config.headers || {};
  config.headers['X-Request-ID'] = v4();
  config.headers.Authorization = `Bearer ${store.get('token')}`;
  config.headers.Lang = store.get('lang') || 'zh-CN';
  config.headers.tz = djs.tz.guess();
  config.headers.Utcoffset = djs().utcOffset() * 60;
  return config;
}

export function responseInterceptor(response: AxiosResponse<ApiRes>): AxiosResponse {
  if (response.data.code !== 0) {
    throw new Error(
      `${response.config.method} ${response.config.url} => ${response.data.code} ${response.data.msg}`,
    );
  }
  return response;
}
