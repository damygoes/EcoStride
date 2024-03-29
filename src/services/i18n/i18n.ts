import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationDE from "@locales/de/translation.json";
import translationEN from "@locales/en/translation.json";
import translationFR from "@locales/fr/translation.json";
import translationNL from "@locales/nl/translation.json";

export const defaultNS = "translation" as const;

export const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  fr: {
    translation: translationFR,
  },
  nl: {
    translation: translationNL,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
