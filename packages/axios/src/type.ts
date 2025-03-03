import { AxiosRequestConfig } from 'axios';

export interface Register {
  'api/noParams': {
    res?: { str: 'noParams' };
  };
  'api/noRes': {
    data: { str: '' };
  };
  'api/both': {
    data: { str: string };
    res: { str: 'both' };
  };
}

export type Api = Register;

export type URLs = keyof Api;

export type Res<Url extends URLs> = Api[Url] extends { res: infer R }
  ? R
  : Api[Url] extends { res?: infer R }
    ? R | undefined
    : undefined;

export type Body<URL extends URLs> = Api[URL] extends { data: infer D }
  ? { data: D | (() => D) }
  : { data?: undefined };

export type Params<URL extends URLs> = Api[URL] extends { params: infer D }
  ? { params: D | (() => D) }
  : { params?: undefined };

export type ReqConfig<URL extends URLs> = AxiosRequestConfig & Body<URL> & Params<URL>;
