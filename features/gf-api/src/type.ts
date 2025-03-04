export interface ApiSuccess<T = unknown> {
  code: 0;
  data: T;
  msg?: string;
}

export interface ApiError<T = unknown> {
  code: number;
  data: T;
  msg?: string;
}

export type ApiRes<T = unknown, E = unknown> = ApiSuccess<T> | ApiError<E>;
