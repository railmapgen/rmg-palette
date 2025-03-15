import {
    CityEntry,
    ColourHex,
    getCityList,
    getPalette,
    MonoColour,
    PaletteEntry,
} from '@railmapgen/rmg-palette-resources';
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
    officialLanguages: LanguageCode[]
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
    if (officialLanguages.some(language => entities.every(entity => entity[0] !== language))) {
        result.push(TranslationInvalidReasonType.OFFICIAL_LANGUAGE_UNDEFINED);
    }

    return result;
};

export const getTicketByCityId = async (
    id: string,
    cityList?: CityEntry[]
): Promise<{ city: CityEntry; palettes: PaletteEntry[] } | undefined> => {
    const city = (cityList ?? (await getCityList())).find(entry => entry.id === id);
    if (!city) {
        console.error(`getTicketByCityId(${id}), invalid city ID`);
        return undefined;
    }

    try {
        const palettes = await getPalette(id);
        return { city, palettes };
    } catch (e) {
        console.error(`getTicketByCityId(${id}), unexpected errors`, e);
        return undefined;
    }
};
