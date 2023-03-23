import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { TranslationInvalidReasonType } from '../../util/constants';

export type TranslationEntity = [LanguageCode, string];

export interface PaletteEntryWithTranslationEntity {
    id: string;
    nameEntity: TranslationEntity[];
    colour: ColourHex;
    fg: MonoColour;
    pantone?: string;
}

export const translationEntityAdapter = createEntityAdapter<TranslationEntity>();
export const translationEntitySelector = translationEntityAdapter.getSelectors();

export const getTranslationEntityInvalidReasons = (
    entities: TranslationEntity[],
    offcialLanguage?: LanguageCode
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

    //Offical Language
    if (offcialLanguage && entities.every(entity => entity[0] !== offcialLanguage)) {
        result.push(TranslationInvalidReasonType.OFFICAL_LANGUAGE_UNDEFINED);
    }

    return result;
};
