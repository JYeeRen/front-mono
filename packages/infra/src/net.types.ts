interface EampleAPI {
  'api/noParams': {
    res?: never;
  };
  'api/noRes': {
    params: { str: string };
  };
  'api/both': {
    params: { str: string };
    res: { str: string };
  };
}

export interface Register extends EampleAPI {}

type Api = Register;

export type URLs = keyof Api;

export type Args<URL extends URLs> = Api[URL] extends { params: infer P }
? [data: P]
: [data?: undefined];

export type Res<URL extends URLs> = Api[URL] extends { res: infer R }
  ? R
  : undefined;

interface ApiSuccess<T = unknown> {
  code: 0;
  data: T;
}

interface ApiError<T = unknown> {
  code: number;
  data: T;
  msg?: string;
}

type ApiRes<T = unknown, E = unknown> = ApiSuccess<T> | ApiError<E>;
