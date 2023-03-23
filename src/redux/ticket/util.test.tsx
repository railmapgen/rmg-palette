import { getTranslationEntityInvalidReasons, TranslationEntry } from './util';
import { TranslationInvalidReasonType } from '../../util/constants';

describe('TicketUtil', () => {
    describe('TicketUtil - translation validation', () => {
        it('Can validate English entry as expected', () => {
            const mockEntries1: TranslationEntry[] = [['zh', '香港']];
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationInvalidReasonType.EN_UNDEFINED,
            ]);

            const mockEntries2: TranslationEntry[] = [
                ['zh', '香港'],
                ['en', 'Hong Kong'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toHaveLength(0);
        });

        it('Can validate Simplified Chinese entry as expected', () => {
            const mockEntries1: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hant', '香港（繁）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationInvalidReasonType.ZH_HANS_UNDEFINED,
            ]);

            const mockEntries2: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hant', '香港（繁）'],
                ['zh-Hans', '香港（简）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toHaveLength(0);

            const mockEntries3: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hant', '香港（繁）'],
                ['zh-Hans', '香港（简）'],
                ['zh-CN', '香港（中）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries3)).toEqual([
                TranslationInvalidReasonType.ZH_VARIANTS_REDEFINED,
            ]);
        });

        it('Can validate Traditional Chinese entries as expected', () => {
            const mockEntries1: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港（简）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries1)).toEqual([
                TranslationInvalidReasonType.ZH_HANT_UNDEFINED,
            ]);

            const mockEntries2: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港（简）'],
                ['zh-TW', '香港（台）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries2)).toEqual([
                TranslationInvalidReasonType.ZH_HK_UNDEFINED,
            ]);

            const mockEntries3: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港（简）'],
                ['zh-HK', '香港（港）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries3)).toEqual([
                TranslationInvalidReasonType.ZH_TW_UNDEFINED,
            ]);

            const mockEntries4: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港（简）'],
                ['zh-HK', '香港（港）'],
                ['zh-TW', '香港（台）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries4)).toHaveLength(0);

            const mockEntries5: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港（简）'],
                ['zh-Hant', '香港（繁）'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries5)).toHaveLength(0);
        });

        it('Can validate duplicated language as expected', () => {
            const mockEntries: TranslationEntry[] = [
                ['zh', '香港'],
                ['en', 'Hong Kong'],
                ['en', 'Hong Kong'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries)).toEqual([
                TranslationInvalidReasonType.LANGUAGE_DUPLICATED,
            ]);
        });
    });
});
