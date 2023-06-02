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

    if (!zhHansExists) {
        result.push(TranslationInvalidReasonType.ZH_HANS_UNDEFINED);
    }

    if (!zhHantExists) {
        result.push(TranslationInvalidReasonType.ZH_HANT_UNDEFINED);
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
