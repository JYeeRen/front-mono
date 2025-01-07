import type { InternalAxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Register {}

export type Sources = Register;

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
  msg?: string;
}

export type ApiRes<T = unknown> = ApiSuccess<T> | ApiError;

export type Params<URL extends URLs> = Api[URL] extends {
  params: infer P;
}
  ? P
  : undefined;

export type Res<URL extends URLs> = Api[URL] extends {
  res: infer R;
}
  ? R
  : undefined;

export type OptionalParams<URL extends URLs> = Api[URL] extends {
  params: infer P;
}
  ? [P, InternalAxiosRequestConfig?]
  : [undefined?, InternalAxiosRequestConfig?];
