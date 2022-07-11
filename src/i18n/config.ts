import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhHansTranslation from './translations/zh-Hans.json';
import zhHantTranslation from './translations/zh-Hant.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';

const resources = {
    [LanguageCode.English]: {
        translation: {},
    },
    [LanguageCode.ChineseSimp]: {
        translation: zhHansTranslation,
    },
    [LanguageCode.ChineseTrad]: {
        translation: zhHantTranslation,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: {
            [LanguageCode.ChineseCN]: [LanguageCode.ChineseSimp, LanguageCode.English],
            [LanguageCode.ChineseHK]: [LanguageCode.ChineseTrad, LanguageCode.English],
            [LanguageCode.ChineseTW]: [LanguageCode.ChineseTrad, LanguageCode.English],

            [LanguageCode.ChineseSimp]: [LanguageCode.ChineseCN, LanguageCode.English],
            [LanguageCode.ChineseTrad]: [LanguageCode.ChineseHK, LanguageCode.ChineseTW, LanguageCode.English],

            default: [LanguageCode.English],
        },
        resources,
    })
    .then(t => {
        document.title = t('RMG Palette');
        document.documentElement.lang = i18n.language;
    });

export default i18n;
