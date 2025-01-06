  import axios from 'axios';
  import { v4 } from 'uuid';
  import { djs, logger, storage, BACKEND_HOST } from '@app/infra';

  import type { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
  import { Api, ApiRes, ApiSuccess, OptionalParams, URLs } from './types';

  class Net {
    private readonly client: Axios;
    private readonly utcOffset: number;
    private readonly tz: string;

    constructor() {
      logger.net('init with', BACKEND_HOST);

      this.utcOffset = djs().utcOffset() * 60;
      this.tz = djs.tz.guess();
      this.client = this.getAxiosInstance();
    }

    async post<URL extends URLs, R = Api[URL]['res']>(
      url: URL,
      ...[body, config]: OptionalParams<URL>
    ): Promise<R> {
      if (typeof url !== 'string') {
        throw new Error('miss url');
      }
      const { data } = await this.client.request<ApiSuccess<R>>({
        method: 'POST',
        url,
        data: body,
        ...config,
      });
      return data.data;
    }

    async upload<URL extends URLs, R = Api[URL]['res']>(
      url: URL,
      ...[body, config]: OptionalParams<URL>
    ): Promise<R> {
      if (typeof url !== 'string') {
        throw new Error('miss url');
      }
      const { data } = await this.client.request<ApiSuccess<R>>({
        method: 'POST',
        url,
        data: body,
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.data;
    }

    async download<URL extends URLs, R = Api[URL]['res']>(
      url: URL,
      ...[body, config]: OptionalParams<URL>
    ): Promise<void> {
      if (typeof url !== 'string') {
        throw new Error('miss url');
      }
      const { data } = await this.client.request<ApiSuccess<R>>({
        method: 'POST',
        url,
        data: body,
        ...config,
      });
      const { fileName, url: downloadUrl } = data.data as {
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

    private getAxiosInstance() {
      const client = axios.create({ baseURL: BACKEND_HOST });

      client.interceptors.request.use(this.requestInterceptor.bind(this));
      client.interceptors.response.use(this.responseInterceptor.bind(this));

      return client;
    }

    private requestInterceptor(
      config: InternalAxiosRequestConfig,
    ): InternalAxiosRequestConfig {
      config.headers = config.headers || {};
      config.headers['X-Request-ID'] = v4();
      config.headers.Authorization = `Bearer ${storage.get('token')}`;
      config.headers.Lang = storage.get('lang') || 'zh-CN';
      config.headers.tz = this.tz;
      config.headers.Utcoffset = this.utcOffset;
      return config;
    }

    private responseInterceptor(response: AxiosResponse<ApiRes>): AxiosResponse {
      if (response.data.code !== 0) {
        // throw new ServerError(response.data);
      }
      if (response.data === null) {
        // throw new ServerError(response.data);
      }
      return response;
    }
  }

  export default new Net();
