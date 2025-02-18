import axios, { Axios, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { Api, Res, URLs } from './types';
import { requestInterceptor, responseInterceptor } from './interceptor';
export type * from './types';

export type PostOptions<URL extends URLs> = Api[URL] extends { params: infer P }
  ? { url: URL; data: P | (() => P) }
  : { url: URL; data?: undefined };

class Net {
  client: Axios;

  constructor() {
    this.client = axios.create();
  }

  async request<URL extends URLs>(
    options: AxiosRequestConfig & { url: URL },
  ): Promise<Res<URL>> {
    const res = await this.client.request<Res<URL>>(options);
    return res.data;
  }

  async get<URL extends URLs>(url: URL): Promise<Res<URL>> {
    return await this.request<URL>({ method: 'GET', url });
  }

  async post<URL extends URLs>(options: PostOptions<URL>): Promise<Res<URL>> {
    return await this.request<URL>({
      method: 'POST',
      url: options.url,
      data: options.data,
    });
  }

  async download<URL extends URLs>(options: PostOptions<URL>): Promise<void> {
    const { url } = options;
    if (typeof url !== 'string') {
      throw new Error('miss url');
    }

    const data = await this.request<URL>({
      method: 'POST',
      url,
      data: options.data,
    });

    const { fileName, url: downloadUrl } = data as {
      fileName: string;
      url: string;
    };

    if (!fileName) throw new Error('导出失败');
    if (!downloadUrl) throw new Error('导出失败');
    await this.browserDownload(fileName, downloadUrl);
  }

  async browserDownload(fileName: string, downloadUrl: string) {
    const res = await axios.get(downloadUrl, {
      responseType: 'blob',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    const blob = res.data;
    if (!(blob instanceof Blob)) throw new Error('blob');

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    if (fileName) {
      link.download = fileName;
    }
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  init(config?: CreateAxiosDefaults) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(requestInterceptor);
    this.client.interceptors.response.use(responseInterceptor);
  }
}

export let net = new Net();
