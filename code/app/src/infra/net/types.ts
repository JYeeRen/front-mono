interface ExampleAPI {
  '/api/example': {
    params?: never;
    res?: never;
  }
}

export type Sources =  ExampleAPI;

export type Api = Sources;

export type URLs = keyof Api;

export interface ApiError {
  code: number;
  data: unknown;
  msg?: string;
}

export interface ApiSuccess<T = unknown> {
  code: 0;
  data: T;
}

export type ApiRes<T = unknown> = ApiSuccess<T> | ApiError;

export interface ApiClient {
  post<URL extends URLs, R = Api[URL]["res"]>(url: URL, ...[body, config]: OptionalParams<URL>): Promise<R>;
}

import type { AxiosRequestConfig } from "axios";

export type OptionalParams<
  URL extends URLs,
  D = Api[URL]["params"]
> = D extends undefined ? [D?, AxiosRequestConfig?] : [D, AxiosRequestConfig?];
