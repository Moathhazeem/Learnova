// src/config/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

i18n
    .use(initReactI18next)
    .init({
        resources: { en: { translation: en }, ar: { translation: ar } },
        lng: "en",           // اللغة الافتراضية
        fallbackLng: "en",   // لو مش موجود ترجمة
        interpolation: { escapeValue: false },
    });

export default i18n;