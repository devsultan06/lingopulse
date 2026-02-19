import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import fr from "../locales/fr.json";
import es from "../locales/es.json";
import ar from "../locales/ar.json";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
