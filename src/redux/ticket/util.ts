import { LanguageCode, MonoColour, Translation } from '@railmapgen/rmg-palette-resources';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { ColourHex, TranslationEntityInvalidReason } from '../../util/constants';

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
    entityState: EntityState<TranslationEntity>
): TranslationEntityInvalidReason[] => {
    const result = [];
    const entities = translationEntitySelector.selectAll(entityState);

    // English
    if (!entities.some(entity => entity.lang === LanguageCode.English && entity.name)) {
        result.push(TranslationEntityInvalidReason.EN_UNDEFINED);
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
            result.push(TranslationEntityInvalidReason.ZH_UNDEFINED);
        } else {
            // zh-Hans not defined
            if (!zhHansExists) {
                if (!zhCNExists) {
                    result.push(TranslationEntityInvalidReason.ZH_HANS_UNDEFINED);
                }
            } else {
                if (zhCNExists) {
                    result.push(TranslationEntityInvalidReason.ZH_VARIANTS_REDEFINED);
                }
            }

            // zh-Hant not defined
            if (!zhHantExists) {
                if (!zhHKExists && !zhTWExists) {
                    // zh-HK zh-TW both not defined
                    result.push(TranslationEntityInvalidReason.ZH_HANT_UNDEFINED);
                } else if (!zhHKExists) {
                    // zh-HK not defined
                    result.push(TranslationEntityInvalidReason.ZH_HK_UNDEFINED);
                } else if (!zhTWExists) {
                    // zh-TW not defined
                    result.push(TranslationEntityInvalidReason.ZH_TW_UNDEFINED);
                }
            } else {
                if (zhHKExists || zhTWExists) {
                    result.push(TranslationEntityInvalidReason.ZH_VARIANTS_REDEFINED);
                }
            }
        }
    } else {
        if (zhHansExists || zhHantExists || zhCNExists || zhHKExists || zhTWExists) {
            result.push(TranslationEntityInvalidReason.ZH_VARIANTS_REDEFINED);
        }
    }

    // Duplication
    if (new Set(entities.map(entity => entity.lang)).size !== entities.length) {
        result.push(TranslationEntityInvalidReason.LANGUAGE_DUPLICATED);
    }

    return result;
};
