import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { requestInterceptor } from './interceptor';

let instance: AxiosInstance = createInstance();

/**
 * 创建 axios 实例，更新导出的 instance
 */
function createInstance(config?: CreateAxiosDefaults): AxiosInstance {
  instance = axios.create(config);

  instance.interceptors.request.use(requestInterceptor);

  return instance;
}

export {
  instance,
  createInstance
};