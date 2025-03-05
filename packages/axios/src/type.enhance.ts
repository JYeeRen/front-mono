import { AxiosRequestConfig } from "axios";

export interface Register {}

export interface Register {
  'api/noParams': {
    data: string;
    res: 'noParams';
  };
  'api/params': {
    params: {
      id: number;
    };
    data: string;
    res: 'params';
  };
  'api/body': {
    data: {
      id: number;
    };
    res: 'body';
  };
  'api/paramsBody': {
    params: {
      id: number;
    };
    data: {
      id: number;
    };
    res: 'paramsBody';
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

export type CustomAxiosRequestConfig<URL extends URLs> = 
  AxiosRequestConfig
  & { url: URL }
  & Body<URL> 
  & Params<URL>;