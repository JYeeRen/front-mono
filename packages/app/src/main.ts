import { createRequest } from '@repo/axios';
import type { AxiosResponse } from '@repo/axios';

export interface RequestInstanceState {
  /** whether the request is refreshing token */
  refreshTokenFn: Promise<boolean> | null;
  /** the request error message stack */
  errMsgStack: string[];
}

const request = createRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL: 'https://api.github.com',
    headers: {},
  },
  {
    isBackendSuccess(response) {
      return (
        String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE
      );
    },
    async onBackendFail(response) {
      const responseCode = String(response.data.code);

      function handleLogout() {
        // authStore.resetStore();
      }

      function logoutAndCleanup() {
        handleLogout();
        window.removeEventListener('beforeunload', handleLogout);

        request.state.errMsgStack = request.state.errMsgStack.filter(
          (msg) => msg !== response.data.msg,
        );
      }

      // when the backend response code is in `logoutCodes`, it means the user will be logged out and redirected to login page
      const logoutCodes =
        import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
      // "Authorization : Bearer get token key fail"
      if (logoutCodes.includes(responseCode)) {
        handleLogout();
        return null;
      }

      // when the backend response code is in `modalLogoutCodes`, it means the user will be logged out by displaying a modal
      const modalLogoutCodes =
        import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (
        modalLogoutCodes.includes(responseCode) &&
        !request.state.errMsgStack?.includes(response.data.msg)
      ) {
        request.state.errMsgStack = [
          ...(request.state.errMsgStack || []),
          response.data.msg,
        ];

        // prevent the user from refreshing the page
        window.addEventListener('beforeunload', handleLogout);

        // window.$dialog?.error({
        //   title: $t('common.error'),
        //   content: response.data.msg,
        //   positiveText: $t('common.confirm'),
        //   maskClosable: false,
        //   closeOnEsc: false,
        //   onPositiveClick() {
        //     logoutAndCleanup();
        //   },
        //   onClose() {
        //     logoutAndCleanup();
        //   },
        // });

        return null;
      }

      // when the backend response code is in `expiredTokenCodes`, it means the token is expired, and refresh token
      // the api `refreshToken` can not return error code in `expiredTokenCodes`, otherwise it will be a dead loop, should return `logoutCodes` or `modalLogoutCodes`
      const expiredTokenCodes =
        import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(responseCode)) {
        // const success = await handleExpiredRequest(request.state);
        // if (success) {
        //   const Authorization = getAuthorization();
        //   Object.assign(response.config.headers, { Authorization });

        //   return instance.request(response.config) as Promise<AxiosResponse>;
        // }
      }

      return null;
    },
  },
);
