import rmgRuntime from '@railmapgen/rmg-runtime';
import enTranslation from './translations/en.json';
import zhHansTranslation from './translations/zh-Hans.json';
import zhHantTranslation from './translations/zh-Hant.json';
import koTranslation from './translations/ko.json';
import { defaultTranslation } from '@railmapgen/rmg-translate';

const i18n = new rmgRuntime.I18nBuilder()
    .withAppName('Palette')
    .withLng(rmgRuntime.getLanguage())
    .withDefaultResource(defaultTranslation)
    .withResource('en', enTranslation)
    .withResource('zh-Hans', zhHansTranslation)
    .withResource('zh-Hant', zhHantTranslation)
    .withResource('ko', koTranslation)
    .build();

export default i18n;
