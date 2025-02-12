interface EampleAPI {
  'api/noParams': {
    res?: { str: 'noParams' };
  };
  'api/noRes': {
    params: { str: '' };
  };
  'api/both': {
    params: { str: string };
    res: { str: 'both' };
  };
}

export interface Register extends EampleAPI {}

export type Api = Register;

export type URLs = keyof Api;

// export type Data<URL extends URLs> = Api[URL] extends { params: infer P }
//   ? P
//   : undefined;

// export type Args<URL extends URLs> = Api[URL] extends { params: infer P }
// ? [url: URL, data: P]
// : [url: URL, data?: undefined];

export type Res<URL extends URLs> = Api[URL] extends { res: infer R }
  ? R
  : Api[URL] extends { res?: infer R }
    ? R | undefined
    : undefined;

// interface ApiSuccess<T = unknown> {
//   code: 0;
//   data: T;
// }

// interface ApiError<T = unknown> {
//   code: number;
//   data: T;
//   msg?: string;
// }

// type ApiRes<T = unknown, E = unknown> = ApiSuccess<T> | ApiError<E>;
