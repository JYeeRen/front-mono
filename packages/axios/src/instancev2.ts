import axios from 'axios';
import type { CreateAxiosDefaults } from 'axios';
import { requestIdInterceptor } from './interceptor';

function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const axiosConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}

/**
 * 创建 axios 实例
 */
function createRequest<ResponseData = any>(axiosConfig?: CreateAxiosDefaults) {
  const axiosConf = createAxiosConfig(axiosConfig);
  const instance = axios.create(axiosConf);

  // 添加 request id
  instance.interceptors.request.use(requestIdInterceptor);

  // TODO AbortController

  // TODO cancelRequest

  return { instance };
}
