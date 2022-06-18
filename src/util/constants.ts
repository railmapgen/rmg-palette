import { CityEntry, PaletteEntry } from '@railmapgen/rmg-palette-resources';

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

export enum TranslationEntityInvalidReason {
    EN_UNDEFINED = 'English name is missing',
    ZH_UNDEFINED = 'Chinese is missing',
    ZH_HANS_UNDEFINED = 'Simplified Chinese is missing',
    ZH_HANT_UNDEFINED = 'Traditional Chinese is missing',
    ZH_HK_UNDEFINED = 'Traditional Chinese (Hong Kong variant) is missing',
    ZH_TW_UNDEFINED = 'Traditional Chinese (Taiwan variant) is missing',
    ZH_VARIANTS_REDEFINED = 'Chinese variants are redefined',
    LANGUAGE_DUPLICATED = 'Duplicated language found',
}
