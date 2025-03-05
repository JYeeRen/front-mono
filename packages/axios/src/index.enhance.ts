import { createRequest } from "src";
import type { CustomAxiosRequestConfig, URLs } from './type.enhance';

export async function createEnhanceRequest<URL extends URLs>(config: CustomAxiosRequestConfig<URL>) {
  // const request = base();

  // const res = await request({ url: 'api/noParams' });
  // res.data;
}

type Response<T = unknown> = {
  code: number;
  data: T;
  msg?: string;
}

const request = createRequest<Response>({
  baseURL: 'https://api.github.com',
  headers: {}
}, {
  isBackendSuccess(response) {
    return String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
  },
  async onBackendFail(response, instance) {
    const responseCode = String(response.data.code);

    function handleLogout() {
      console.log('Logout');
    }
    -401
    const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
    "Authorization : Bearer get token key fail"
  }
});