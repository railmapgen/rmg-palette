import { CityEntry, PaletteEntry, Translation } from '@railmapgen/rmg-palette-resources';

export type ColourHex = `#${string}`;

export enum MonoColour {
    black = '#000',
    white = '#fff',
}

/**
 * @property {string} 0 - Chinese characters
 * @property {string} 1 - Latin characters
 */
export type Name = [string, string];

export const GITHUB_ISSUE_PREAMBLE = '**Do not edit lines below, they are meant for bots only!!!**';
export const getGitHubIssueCityBlock = (cityEntry: CityEntry | null) => {
    return `<details repo='rmg-palette' type='city'>
${JSON.stringify(cityEntry, null, 4)}
</details>`;
};
export const getGitHubIssueLinesBlock = (lines: PaletteEntry[]) => {
    return `<details repo='rmg-palette' type='lines'>
${JSON.stringify(lines, null, 4)}
</details>`;
};

export enum TicketInvalidReason {
    COUNTRY_CODE_UNDEFINED = 'Country code is missing',
    CITY_CODE_UNDEFINED = 'City code is missing',
    LINE_CODE_UNDEFINED = 'At least one line code is missing',
    LINE_CODE_DUPLICATED = 'Duplicated line code found',
}

export enum TranslationInvalidReasonType {
    EN_UNDEFINED = 'EN_UNDEFINED',
    ZH_UNDEFINED = 'ZH_UNDEFINED',
    ZH_HANS_UNDEFINED = 'ZH_HANS_UNDEFINED',
    ZH_HANT_UNDEFINED = 'ZH_HANT_UNDEFINED',
    ZH_HK_UNDEFINED = 'ZH_HK_UNDEFINED',
    ZH_TW_UNDEFINED = 'ZH_TW_UNDEFINED',
    ZH_VARIANTS_REDEFINED = 'ZH_VARIANTS_REDEFINED',
    LANGUAGE_DUPLICATED = 'LANGUAGE_DUPLICATED',
}

export const TRANSLATION_INVALID_REASON: Record<TranslationInvalidReasonType, Translation> = {
    EN_UNDEFINED: {
        en: 'English name is missing',
        'zh-Hans': '缺少英文名称',
        'zh-Hant': '缺少英文名稱',
    },
    ZH_UNDEFINED: {
        en: 'Chinese name is missing',
        'zh-Hans': '缺少中文名称',
        'zh-Hant': '缺少中文名稱',
    },
    ZH_HANS_UNDEFINED: {
        en: 'Simplified Chinese name is missing',
        'zh-Hans': '缺少简体中文名称',
        'zh-Hant': '缺少簡體中文名稱',
    },
    ZH_HANT_UNDEFINED: {
        en: 'Traditional Chinese name is missing',
        'zh-Hans': '缺少繁体中文名称',
        'zh-Hant': '缺少繁體中文名稱',
    },
    ZH_HK_UNDEFINED: {
        en: 'Traditional Chinese (Hong Kong variant) name is missing',
        'zh-Hans': '缺少繁体中文（香港变体）名称',
        'zh-Hant': '缺少繁體中文（香港變體）名稱',
    },
    ZH_TW_UNDEFINED: {
        en: 'Traditional Chinese (Taiwan variant) name is missing',
        'zh-Hans': '缺少繁体中文（台湾变体）名称',
        'zh-Hant': '缺少繁體中文（台灣變體）名稱',
    },
    ZH_VARIANTS_REDEFINED: {
        en: 'Chinese variants are redefined',
        'zh-Hans': '包含重复的中文变体',
        'zh-Hant': '包含重複的中文變體',
    },
    LANGUAGE_DUPLICATED: {
        en: 'Duplicated language found',
        'zh-Hans': '包含重复的语言',
        'zh-Hant': '包含重複的語言',
    },
};
