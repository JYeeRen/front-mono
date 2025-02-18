import i18next, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export type Lng = "en" | "zh-CN";
type Entry = Record<Lng, string>;
type Translation = Record<string, Entry>;

type _Resource = Record<
  Lng,
  {
    [ns: string]: {
      [key: string]: string;
    };
  }
>;

function formatTranslation(trans: Record<string, Translation>): Resource {
  const resources: _Resource = {
    en: {},
    'zh-CN': {},
  };

  for (const [ns, nsTrans] of Object.entries(trans)) {
    resources.en[ns] = {};
    resources['zh-CN'][ns] = {};
    for (const [key, entry] of Object.entries(nsTrans)) {
      resources.en[ns][key] = entry.en;
      resources['zh-CN'][ns][key] = entry['zh-CN'];
    }
  }

  return resources;
}

export interface InitOptions {
  sources: Translation;
  lng: Lng;
}

export function init(options: InitOptions) {
  i18next
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV != "production",
      lng: options.lng || "zh-CN",
      fallbackLng: "zh-CN",
      ns: ["common"],
      defaultNS: "common",
      resources: formatTranslation({ common: options.sources }),
    });
}

export const t = i18next.t.bind(i18next);
export const changeLanguage = i18next.changeLanguage.bind(i18next);

export { useTranslation as useTrans } from "react-i18next";