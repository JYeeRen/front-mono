import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import { v4 } from 'uuid';
import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import type {
  CustomAxiosRequestConfig,
  MappedType,
  RequestInstance,
  RequestOption,
  ResponseType
} from './type';
import {
  createAxiosConfig,
  createDefaultOptions,
  createRetryOptions,
} from './options';

/**
 * 创建 axios 实例
 */
function createCommonRequest<ResponseData = any>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData>>,
) {
  const opts = createDefaultOptions<ResponseData>(options);

  const axiosConf = createAxiosConfig(axiosConfig);
  const instance = axios.create(axiosConf);

  const abortControllerMap = new Map<string, AbortController>();

  const retryOptions = createRetryOptions();

  axiosRetry(instance, retryOptions);

  // 添加 abort controller
  instance.interceptors.request.use((config) => {
    const _config: InternalAxiosRequestConfig = { ...config };

    // 添加 request id
    const requestId = v4();
    _config.headers.set('X-Request-Id', v4());

    if (!_config.signal) {
      const abortController = new AbortController();
      _config.signal = abortController.signal;
      abortControllerMap.set(requestId, abortController);
    }

    // before request hook
    const handledConfig = opts?.onRequest(_config) || config;

    return handledConfig;
  });

  instance.interceptors.response.use(async (response) => {
    if (opts.isBackendSuccess(response)) {
      return Promise.resolve(response);
    }

    const fail = await opts.onBackendFail(response, instance);
    if (fail) {
      return fail;
    }

    const backendError = new AxiosError<ResponseData>(
      'the backend request error',
      'BACKEND_ERROR',
      response.config,
      response.request,
      response,
    );

    await opts.onError(backendError);

    return Promise.reject(backendError);
  }),
    async (error: AxiosError<ResponseData>) => {
      await opts.onError(error);

      return Promise.reject(error);
    };

  function cancelRequest(requestId: string) {
    const abortController = abortControllerMap.get(requestId);
    if (abortController) {
      abortController.abort();
      abortControllerMap.delete(requestId);
    }
  }

  function cancelAllRequest() {
    abortControllerMap.forEach((abortController) => {
      abortController.abort();
    });
    abortControllerMap.clear();
  }

  return {
    instance,
    cancelRequest,
    cancelAllRequest,
    opts,
  };
}

/**
 * create a request instance
 *
 * @param axiosConfig axios config
 * @param options request options
 */
export function createRequest<
  ResponseData = any,
  State = Record<string, unknown>,
>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData>>,
) {
  const { instance, opts, cancelRequest, cancelAllRequest } =
    createCommonRequest<ResponseData>(axiosConfig, options);

  const request: RequestInstance<State> = async function request<T = any, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig,
  ) {
    const response: AxiosResponse<ResponseData> = await instance(config);

    const responseType = response.config?.responseType || 'json';

    if (responseType === 'json') {
      return opts.transformBackendResponse(response);
    }

    return response.data as MappedType<R, T>;
  } as RequestInstance<State>;

  request.cancelRequest = cancelRequest;
  request.cancelAllRequest = cancelAllRequest;
  request.state = {} as State;

  return request;
}

export type * from './type';
export type { CreateAxiosDefaults, AxiosResponse, AxiosError };
