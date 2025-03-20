import { createI18n } from 'vue-i18n';
import da_dk from './danish/da_dk.json';
import en_us from './english/en_us.json';
import {storageKey} from "@/_locals/languages.js";

const i18n = createI18n({
    legacy: false,
    locale: JSON.parse(localStorage.getItem(storageKey))?.fullTitle || 'en_us',
    fallbackLocale: 'en_us',
    globalInjection: true,
    messages: {
        da_dk,
        en_us
    }
});

export default i18n;
