/** The union key namespace */
declare namespace UnionKey {
  /**
   * The login module
   *
   * - pwd-login: password login
   * - code-login: phone code login
   * - register: register
   * - reset-pwd: reset password
   * - bind-wechat: bind wechat
   */
  type LoginModule =
    | 'pwd-login'
    | 'code-login'
    | 'register'
    | 'reset-pwd'
    | 'bind-wechat';

  /** Theme scheme */
  type ThemeScheme = 'light' | 'dark' | 'auto';

  /**
   * Reset cache strategy
   *
   * - close: re-cache when close page
   * - refresh: re-cache when refresh page
   */
  type ResetCacheStrategy = 'close' | 'refresh';

  /**
   * The layout mode
   *
   * - vertical: the vertical menu in left
   * - horizontal: the horizontal menu in top
   * - vertical-mix: two vertical mixed menus in left
   * - horizontal-mix: the vertical first level menus in left and horizontal child level menus in top
   */
  type ThemeLayoutMode =
    | 'vertical'
    | 'horizontal'
    | 'vertical-mix'
    | 'horizontal-mix';
}
