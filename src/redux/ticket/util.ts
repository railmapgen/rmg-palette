import { CityEntry, cityList, ColourHex, MonoColour, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { TranslationInvalidReasonType } from '../../util/constants';

export type TranslationEntry = [LanguageCode, string];

export interface PaletteEntryWithTranslationEntry {
    id: string;
    nameEntity: TranslationEntry[];
    colour: ColourHex;
    fg: MonoColour;
    pantone?: string;
}

export const getTranslationEntityInvalidReasons = (
    entities: TranslationEntry[],
    officialLanguage?: LanguageCode
): TranslationInvalidReasonType[] => {
    const result = [];

    // English
    if (!entities.some(entity => entity[0] === 'en' && entity[1])) {
        result.push(TranslationInvalidReasonType.EN_UNDEFINED);
    }

    // Chinese
    const zhHansExists = entities.some(entity => entity[0] === 'zh-Hans' && entity[1]);
    const zhHantExists = entities.some(entity => entity[0] === 'zh-Hant' && entity[1]);
    const zhCNExists = entities.some(entity => entity[0] === 'zh-CN' && entity[1]);
    const zhHKExists = entities.some(entity => entity[0] === 'zh-HK' && entity[1]);
    const zhTWExists = entities.some(entity => entity[0] === 'zh-TW' && entity[1]);

    if (!entities.some(entity => entity[0] === 'zh' && entity[1])) {
        if (!zhHansExists && !zhHantExists && !zhCNExists && !zhHKExists && !zhTWExists) {
            // not exist any Chinese
            result.push(TranslationInvalidReasonType.ZH_UNDEFINED);
        } else {
            // zh-Hans not defined
            if (!zhHansExists) {
                if (!zhCNExists) {
                    result.push(TranslationInvalidReasonType.ZH_HANS_UNDEFINED);
                }
            } else {
                if (zhCNExists) {
                    result.push(TranslationInvalidReasonType.ZH_VARIANTS_REDEFINED);
                }
            }

            // zh-Hant not defined
            if (!zhHantExists) {
                if (!zhHKExists && !zhTWExists) {
                    // zh-HK zh-TW both not defined
                    result.push(TranslationInvalidReasonType.ZH_HANT_UNDEFINED);
                } else if (!zhHKExists) {
                    // zh-HK not defined
                    result.push(TranslationInvalidReasonType.ZH_HK_UNDEFINED);
                } else if (!zhTWExists) {
                    // zh-TW not defined
                    result.push(TranslationInvalidReasonType.ZH_TW_UNDEFINED);
                }
            } else {
                if (zhHKExists || zhTWExists) {
                    result.push(TranslationInvalidReasonType.ZH_VARIANTS_REDEFINED);
                }
            }
        }
    } else {
        if (zhHansExists || zhHantExists || zhCNExists || zhHKExists || zhTWExists) {
            result.push(TranslationInvalidReasonType.ZH_VARIANTS_REDEFINED);
        }
    }

    // Duplication
    if (new Set(entities.map(entity => entity[0])).size !== entities.length) {
        result.push(TranslationInvalidReasonType.LANGUAGE_DUPLICATED);
    }

    // Official Language
    if (officialLanguage && entities.every(entity => entity[0] !== officialLanguage)) {
        result.push(TranslationInvalidReasonType.OFFICIAL_LANGUAGE_UNDEFINED);
    }

    return result;
};

export const getTicketByCityId = async (
    id: string
): Promise<{ city: CityEntry; palettes: PaletteEntry[] } | undefined> => {
    const city = cityList.find(entry => entry.id === id);
    if (!city) {
        console.error('getTicketByCityId():: invalid city ID', id);
        return undefined;
    }

    try {
        const paletteModule = await import(`../../../node_modules/@railmapgen/rmg-palette-resources/palettes/${id}.js`);
        const { default: palettes } = paletteModule;
        return { city, palettes };
    } catch (e) {
        console.error('getTicketByCityId():: unexpected errors', e);
        return undefined;
    }
};
