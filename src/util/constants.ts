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
    return `<details repo="rmg-palette" type="city">
${JSON.stringify(cityEntry, null, 4)}
</details>`;
};
export const getGitHubIssueLinesBlock = (lines: PaletteEntry[]) => {
    return `<details repo="rmg-palette" type="lines">
${JSON.stringify(lines, null, 4)}
</details>`;
};

export enum TicketInvalidReasonType {
    COUNTRY_CODE_UNDEFINED = 'COUNTRY_CODE_UNDEFINED',
    CITY_CODE_UNDEFINED = 'CITY_CODE_UNDEFINED',
    LINE_CODE_UNDEFINED = 'LINE_CODE_UNDEFINED',
    LINE_CODE_DUPLICATED = 'LINE_CODE_DUPLICATED',
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

export type InvalidReasonType = TicketInvalidReasonType | TranslationInvalidReasonType;

export const INVALID_REASON: Record<InvalidReasonType, Translation> = {
    COUNTRY_CODE_UNDEFINED: {
        en: 'Country/region code is missing',
        'zh-Hans': '缺少国家/地区代码',
        'zh-Hant': '缺少國家/地區代碼',
    },
    CITY_CODE_UNDEFINED: {
        en: 'City code is missing',
        'zh-Hans': '缺少城市代码',
        'zh-Hant': '缺少城市代碼',
    },
    LINE_CODE_UNDEFINED: {
        en: 'At least one line code is missing',
        'zh-Hans': '至少1条线路的代码缺失',
        'zh-Hant': '至少1條路綫的代碼缺失',
    },
    LINE_CODE_DUPLICATED: {
        en: 'Duplicated line code found',
        'zh-Hans': '包含重复的线路代码',
        'zh-Hant': '包含重複的路綫代碼',
    },

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
