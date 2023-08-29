import { Translation } from '@railmapgen/rmg-translate';
import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';

/**
 * @property {string} 0 - Chinese characters
 * @property {string} 1 - Latin characters
 */
export type Name = [string, string];

/**
 * Colour theme of line, derived from `LineEntry`.
 * @property 0 - city id
 * @property 1 - line id
 * @property 2 - background colour
 * @property 3 - foreground colour
 */
export type Theme = [string, string, ColourHex, MonoColour];

export const GITHUB_ISSUE_PREAMBLE = '**Do not edit lines below, they are meant for bots only!!!**';
export const getGitHubIssueDetailsBlock = (type: 'country' | 'city' | 'lines', data: any): string => {
    if (data !== null) {
        const details = document.createElement('details');
        details.setAttribute('repo', 'rmg-palette');
        details.setAttribute('type', type);
        details.textContent = JSON.stringify(data, null, 4);
        return details.outerHTML;
    } else {
        return '';
    }
};

export enum TicketInvalidReasonType {
    COUNTRY_CODE_UNDEFINED = 'COUNTRY_CODE_UNDEFINED',
    CITY_CODE_UNDEFINED = 'CITY_CODE_UNDEFINED',
    LINE_CODE_UNDEFINED = 'LINE_CODE_UNDEFINED',
    LINE_CODE_DUPLICATED = 'LINE_CODE_DUPLICATED',
}

export enum TranslationInvalidReasonType {
    EN_UNDEFINED = 'EN_UNDEFINED',
    ZH_HANS_UNDEFINED = 'ZH_HANS_UNDEFINED',
    ZH_HANT_UNDEFINED = 'ZH_HANT_UNDEFINED',
    LANGUAGE_DUPLICATED = 'LANGUAGE_DUPLICATED',
    OFFICIAL_LANGUAGE_UNDEFINED = 'OFFICIAL_LANGUAGE_UNDEFINED',
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
    LANGUAGE_DUPLICATED: {
        en: 'Duplicated language found',
        'zh-Hans': '包含重复的语言',
        'zh-Hant': '包含重複的語言',
    },
    OFFICIAL_LANGUAGE_UNDEFINED: {
        en: 'Name in official language is missing',
        'zh-Hans': '缺少官方语言名称',
        'zh-Hant': '缺少官方語言名稱',
    },
};

export enum Events {
    APP_LOAD = 'APP_LOAD',

    ADD_CITY = 'ADD_CITY',
    EDIT_CITY = 'EDIT_CITY',
    RESET_TICKET = 'RESET_TICKET',

    APP_CLIP_VIEW_OPENED = 'APP_CLIP_VIEW_OPENED',
    APP_CLIP_VIEW_CLOSED = 'APP_CLIP_VIEW_CLOSED',
    APP_CLIP_VIEW_SELECT = 'APP_CLIP_VIEW_SELECT',
}

export const DRAFT_TICKET_KEY = 'rmg-palette__draftTicket';
