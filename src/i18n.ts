import i18next from "i18next";
import Backend from "i18next-fs-backend"
import i18nextMiddleware from "i18next-http-middleware"
import path from "path";

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "en",
    preload: ["en", "vi"],
    supportedLngs: ['vi', 'en'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'), 
    },
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"],
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
    },
  });

console.log(i18next.services.resourceStore.data);  // Log the loaded resources

export default i18next;
