declare namespace App {
  namespace Theme {
    interface ThemeSetting {}
  }

  namespace I18n {
    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };
  }

  namespace Global {}

  namespace Service {
    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: number;
      /** The backend service response message */
      msg: string;
      /** The backend service response data */
      data: T;
    };
  }
}