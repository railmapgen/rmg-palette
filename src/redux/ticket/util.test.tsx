import { createTranslationEntityInitialState, getTranslationEntityInvalidReasons } from './util';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';
import { nanoid } from 'nanoid';
import { TranslationEntityInvalidReason } from '../../util/constants';

describe('TicketUtil', () => {
    describe('TicketUtil - translation validation', () => {
        it('Can validate English entry as expected', () => {
            const mockEntries1 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.Chinese, name: '香港' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationEntityInvalidReason.EN_UNDEFINED,
            ]);

            const mockEntries2 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.Chinese, name: '香港' },
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toHaveLength(0);
        });

        it('Can validate Simplified Chinese entry as expected', () => {
            const mockEntries1 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseTrad, name: '香港（繁）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationEntityInvalidReason.ZH_HANS_UNDEFINED,
            ]);

            const mockEntries2 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseTrad, name: '香港（繁）' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toHaveLength(0);

            const mockEntries3 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseTrad, name: '香港（繁）' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
                { id: nanoid(), lang: LanguageCode.ChineseCN, name: '香港（中）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries3)).toEqual([
                TranslationEntityInvalidReason.ZH_VARIANTS_REDEFINED,
            ]);
        });

        it('Can validate Traditional Chinese entries as expected', () => {
            const mockEntries1 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationEntityInvalidReason.ZH_HANT_UNDEFINED,
            ]);

            const mockEntries2 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
                { id: nanoid(), lang: LanguageCode.ChineseTW, name: '香港（台）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toEqual([
                TranslationEntityInvalidReason.ZH_HK_UNDEFINED,
            ]);

            const mockEntries3 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
                { id: nanoid(), lang: LanguageCode.ChineseHK, name: '香港（港）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries3)).toEqual([
                TranslationEntityInvalidReason.ZH_TW_UNDEFINED,
            ]);

            const mockEntries4 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
                { id: nanoid(), lang: LanguageCode.ChineseHK, name: '香港（港）' },
                { id: nanoid(), lang: LanguageCode.ChineseTW, name: '香港（台）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries4)).toHaveLength(0);

            const mockEntries5 = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.ChineseSimp, name: '香港（简）' },
                { id: nanoid(), lang: LanguageCode.ChineseTrad, name: '香港（繁）' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries5)).toHaveLength(0);
        });

        it('Can validate duplicated language as expected', () => {
            const mockEntries = createTranslationEntityInitialState([
                { id: nanoid(), lang: LanguageCode.Chinese, name: '香港' },
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
                { id: nanoid(), lang: LanguageCode.English, name: 'Hong Kong' },
            ]);
            expect(getTranslationEntityInvalidReasons(mockEntries)).toEqual([
                TranslationEntityInvalidReason.LANGUAGE_DUPLICATED,
            ]);
        });
    });
});
