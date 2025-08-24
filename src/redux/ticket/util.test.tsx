import { getTranslationEntityInvalidReasons, TranslationEntry } from './util';
import { TranslationInvalidReasonType } from '../../util/constants';

describe('TicketUtil', () => {
    describe('TicketUtil - translation validation', () => {
        it('Can validate English entry as expected', () => {
            const mockEntries1: TranslationEntry[] = [
                ['zh-Hans', '香港'],
                ['zh-Hant', '香港'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries1, [])).toEqual([
                TranslationInvalidReasonType.EN_UNDEFINED,
            ]);

            const mockEntries2: TranslationEntry[] = [
                ['zh-Hans', '香港'],
                ['zh-Hant', '香港'],
                ['en', 'Hong Kong'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries2, [])).toHaveLength(0);
        });

        it('Can validate duplicated language as expected', () => {
            const mockEntries: TranslationEntry[] = [
                ['zh-Hans', '香港'],
                ['zh-Hant', '香港'],
                ['en', 'Hong Kong'],
                ['en', 'Hong Kong'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries, [])).toEqual([
                TranslationInvalidReasonType.LANGUAGE_DUPLICATED,
            ]);
        });

        it('Can validate missing official language as expected', () => {
            const mockEntries: TranslationEntry[] = [
                ['en', 'Hong Kong'],
                ['zh-Hans', '香港'],
            ];
            expect(getTranslationEntityInvalidReasons(mockEntries, ['en', 'zh-Hant'])).toEqual([
                TranslationInvalidReasonType.ZH_HANT_UNDEFINED,
                TranslationInvalidReasonType.OFFICIAL_LANGUAGE_UNDEFINED,
            ]);
        });
    });
});
