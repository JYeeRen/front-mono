import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export type CustomAxiosRequestConfig = AxiosRequestConfig;

export interface RequestOption<ResponseData = any> {
  /**
   * The hook before request
   *
   * For example: You can add header token in this hook
   *
   * @param config Axios config
   */
  onRequest: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * The hook to check backend response is success or not
   *
   * @param response Axios response
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /**
   * The hook after backend request fail
   *
   * For example: You can handle the expired token in this hook
   *
   * @param response Axios response
   * @param instance Axios instance
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => Promise<AxiosResponse | null> | Promise<void>;
  /**
   * transform backend response when the responseType is json
   *
   * @param response Axios response
   */
  transformBackendResponse(
    response: AxiosResponse<ResponseData>,
  ): any | Promise<any>;
  /**
   * The hook to handle error
   *
   * For example: You can show error message in this hook
   *
   * @param error
   */
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}

export interface RequestInstanceCommon<T> {
  /**
   * cancel the request by request id
   *
   * if the request provide abort controller sign from config, it will not collect in the abort controller map
   *
   * @param requestId
   */
  cancelRequest: (requestId: string) => void;
  /**
   * cancel all request
   *
   * if the request provide abort controller sign from config, it will not collect in the abort controller map
   */
  cancelAllRequest: () => void;
  /** you can set custom state in the request instance */
  state: T;
}

/** The request instance */
export interface RequestInstance<S = Record<string, unknown>>  extends RequestInstanceCommon<S> {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
}


interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
  stream: ReadableStream<Uint8Array>;
  document: Document;
}
export type ResponseType = keyof ResponseMap | 'json';

export type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap
  ? ResponseMap[R]
  : JsonType;