import axios, {
  type Axios,
  type AxiosRequestConfig as ARC,
  type AxiosResponse,
  type InternalAxiosRequestConfig as IARC,
  type CreateAxiosDefaults,
} from "axios";
import { v4 } from "uuid";
// import { sStorage } from "./sstorage";
// import { ServerError } from "./error";
import djs from "../djs";
import type {
  Api,
  ApiClient,
  ApiRes,
  ApiSuccess,
  OptionalParams,
  URLs,
} from "./types";
import { EventEmitter } from "events";

class Net extends EventEmitter implements ApiClient {
  initialized = false;

  private client?: Axios;
  private readonly utcOffset: number;
  private readonly tz: string;

  constructor() {
    super();
    // logger.infra("baseURL", BACKEND_HOST);
    this.utcOffset = djs().utcOffset() * 60;
    this.tz = djs.tz.guess();
    this.init({ baseURL: import.meta.env.VITE_BACKEND_HOST });
  }

  get svc() {
    if (!this.initialized) {
      throw new Error("net not initialized");
    }
    return this.client!;
  }

  init(config: CreateAxiosDefaults) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(this.requestInterceptor.bind(this));
    this.client.interceptors.response.use(this.responseInterceptor.bind(this));
    this.initialized = true;
    this.emit("initialized");
  }

  async post<URL extends URLs, R = Api[URL]["res"]>(
    url: URL,
    ...[body, config]: OptionalParams<URL>
  ): Promise<R> {
    if (typeof url !== "string") {
      throw new Error("miss url");
    }
    const { data } = await this.request<ApiSuccess<R>>({
      method: "POST",
      url,
      data: body,
      ...config,
    });
    return data.data;
  }

  async upload<URL extends URLs, R = Api[URL]["res"]>(
    url: URL,
    ...[body, config]: OptionalParams<URL>
  ): Promise<R> {
    if (typeof url !== "string") {
      throw new Error("miss url");
    }
    const { data } = await this.request<ApiSuccess<R>>({
      method: "POST",
      url,
      data: body,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  }

  async download<URL extends URLs, R = Api[URL]["res"]>(
    url: URL,
    ...[body, config]: OptionalParams<URL>
  ): Promise<void> {
    if (typeof url !== "string") {
      throw new Error("miss url");
    }
    const { data } = await this.request<ApiSuccess<R>>({
      method: "POST",
      url,
      data: body,
      ...config,
    });
    const { fileName, url: downloadUrl } = data.data as {
      fileName: string;
      url: string;
    };

    if (!fileName) throw new Error("导出失败");
    if (!downloadUrl) throw new Error("导出失败");
    await this.browserDownload(fileName, downloadUrl);
  }

  async browserDownload(fileName: string, downloadUrl: string) {
    const res = await axios.get(downloadUrl, {
      responseType: "blob",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const blob = res.data;
    if (!(blob instanceof Blob)) throw new Error("blob");

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    if (fileName) {
      link.download = fileName;
    }
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  private async request<T>(config: ARC): Promise<AxiosResponse<T>> {
    return await this.svc.request<T>(config);
  }

  private async requestInterceptor(config: IARC): Promise<IARC> {
    config.headers = config.headers || {};
    config.headers["X-Request-ID"] = v4();
    // config.headers.Authorization = `Bearer ${sStorage.get("token")}`;
    // config.headers.Lang = sStorage.get("lang") || "zh-CN";
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

export const net = new Net();
