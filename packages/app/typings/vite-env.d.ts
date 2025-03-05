declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string;
    /** The title of the application */
    readonly VITE_APP_TITLE: string;
    /** The description of the application */
    readonly VITE_APP_DESC: string;
    /** backend service base url */
    readonly VITE_SERVICE_BASE_URL: string;
    /**
     * success code of backend service
     *
     * when the code is received, the request is successful
     */
    readonly VITE_SERVICE_SUCCESS_CODE: string;
    /**
     * logout codes of backend service
     *
     * when the code is received, the user will be logged out and redirected to login page
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_LOGOUT_CODES: string;
    /**
     * modal logout codes of backend service
     *
     * when the code is received, the user will be logged out by displaying a modal
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_MODAL_LOGOUT_CODES: string;
    /**
     * token expired codes of backend service
     *
     * when the code is received, it will refresh the token and resend the request
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_EXPIRED_TOKEN_CODES: string;
    /** when the route mode is static, the defined super role */
    readonly VITE_STATIC_SUPER_ROLE: string;
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string;
    /** Whether to automatically detect updates after configuring application packaging */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE?: CommonType.YesOrNo;
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
