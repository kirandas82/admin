// i18n.tsx
import i18n from 'i18next'; // Correct import
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translation files from a backend server or local path
  .use(LanguageDetector) // Detect user language (from browser, query string, etc.)
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Fallback language when detection fails
    debug: true, // Enable debug messages in development mode
    detection: {
      // Options for language detection
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag'],
      caches: ['localStorage', 'cookie'], // Cache the detected language to avoid re-detection
    },
    interpolation: {
      escapeValue: false, // React already escapes content by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n ;