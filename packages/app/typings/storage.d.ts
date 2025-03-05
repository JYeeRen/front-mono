declare namespace StorageType {
  interface Session {}

  interface Local {
    /** The i18n language */
    lang: App.I18n.LangType;
    /** The token */
    token: string;
    /** The dark mode */
    darkMode: boolean;
    /** The theme settings */
    themeSettings: App.Theme.ThemeSetting;
    /**
     * The override theme flags
     *
     * The value is the build time of the project
     */
    overrideThemeFlag: string;
  }
}
