import { ColourHex, LanguageCode, MonoColour, Translation } from '@railmapgen/rmg-palette-resources';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { TranslationInvalidReasonType } from '../../util/constants';

export interface TranslationEntity {
    id: string;
    lang: LanguageCode;
    name: string;
}

export interface PaletteEntryWithTranslationEntity {
    id: string;
    nameEntity: EntityState<TranslationEntity>;
    colour: ColourHex;
    fg: MonoColour;
}

export const translationEntityAdapter = createEntityAdapter<TranslationEntity>();
export const translationEntitySelector = translationEntityAdapter.getSelectors();

export const createTranslationEntityInitialState = (entities: TranslationEntity[]) => {
    return translationEntityAdapter.upsertMany(translationEntityAdapter.getInitialState(), entities);
};

export const convertEntityStateToTranslation = (entityState: EntityState<TranslationEntity>): Translation => {
    return translationEntitySelector.selectAll(entityState).reduce<Translation>(
        (acc, cur) => ({
            ...acc,
            [cur.lang]: cur.name,
        }),
        {}
    );
};

export const getTranslationEntityInvalidReasons = (
    entityState: EntityState<TranslationEntity>,
    offcialLanguage?: LanguageCode
): TranslationInvalidReasonType[] => {
    const result = [];
    const entities = translationEntitySelector.selectAll(entityState);

    // English
    if (!entities.some(entity => entity.lang === LanguageCode.English && entity.name)) {
        result.push(TranslationInvalidReasonType.EN_UNDEFINED);
    }

    // Chinese
    const zhHansExists = entities.some(entity => entity.lang === LanguageCode.ChineseSimp && entity.name);
    const zhHantExists = entities.some(entity => entity.lang === LanguageCode.ChineseTrad && entity.name);
    const zhCNExists = entities.some(entity => entity.lang === LanguageCode.ChineseCN && entity.name);
    const zhHKExists = entities.some(entity => entity.lang === LanguageCode.ChineseHK && entity.name);
    const zhTWExists = entities.some(entity => entity.lang === LanguageCode.ChineseTW && entity.name);

    if (!entities.some(entity => entity.lang === LanguageCode.Chinese && entity.name)) {
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
    if (new Set(entities.map(entity => entity.lang)).size !== entities.length) {
        result.push(TranslationInvalidReasonType.LANGUAGE_DUPLICATED);
    }

    //Offical Language
    if (offcialLanguage && entities.every(entity => entity.lang !== offcialLanguage)) {
        result.push(TranslationInvalidReasonType.OFFICAL_LANGUAGE_UNDEFINED);
    }

    return result;
};
