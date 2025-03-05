import { CreateAxiosDefaults } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import { isHttpSuccess } from './shared';
import { RequestOption } from './type';

export function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const axiosConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: isHttpSuccess,
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}

export function createRetryOptions() {
  const retryConfig: IAxiosRetryConfig = {
    retries: 0,
  };

  return retryConfig;
}

export function createDefaultOptions<ResponseData = any>(options?: Partial<RequestOption<ResponseData>>) {
  const opts: RequestOption<ResponseData> = {
    onRequest: async config => config,
    isBackendSuccess: _response => true,
    onBackendFail: async () => {},
    transformBackendResponse: async response => response.data,
    onError: async () => {}
  };

  Object.assign(opts, options);

  return opts;
}
