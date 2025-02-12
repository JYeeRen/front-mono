import axios, { Axios, CreateAxiosDefaults } from 'axios';
import { Api, Res, URLs } from './types';
export type * from './types';

export type PostOptions<URL extends URLs> = Api[URL] extends { params: infer P }
  ? { url: URL; data: P | (() => P) }
  : { url: URL; data?: undefined };

  class Net {
  client: Axios;

  constructor() {
    this.client = axios.create();
  }

  async get<URL extends URLs>(url: URL): Promise<Res<URL>> {
    const res = await this.client.get<Res<URL>>(url);
    return res.data;
  }

  async post<URL extends URLs>(options: PostOptions<URL>): Promise<Res<URL>> {
    const { url, data } = options;
    const res = await this.client.post<Res<URL>>(url, data);
    return res.data;
  }

  init(config?: CreateAxiosDefaults) {
    this.client = axios.create(config);
  }
}

export let net = new Net();
