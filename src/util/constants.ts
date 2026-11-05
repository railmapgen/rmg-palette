import { Translation } from '@railmapgen/rmg-translate';

/**
 * @property {string} 0 - Chinese characters
 * @property {string} 1 - Latin characters
 */
export type Name = [string, string];

export const GITHUB_ISSUE_PREAMBLE = '**Do not edit lines below, they are meant for bots only!!!**';
export const getGitHubIssueDetailsBlock = (type: 'country' | 'city' | 'lines', data: any): string => {
    if (data !== null) {
        const details = document.createElement('details');
        details.setAttribute('repo', 'rmg-palette');
        details.setAttribute('type', type);
        details.textContent = JSON.stringify(data);
        return details.outerHTML;
    } else {
        return '';
    }
};

export enum TicketInvalidReasonType {
    COUNTRY_CODE_UNDEFINED = 'COUNTRY_CODE_UNDEFINED',
    OFFICIAL_LANGUAGES_EMPTY = 'OFFICIAL_LANGUAGES_EMPTY',
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
        ja: '国・地域コードが入力されていません',
        ko: '국가/지역 코드가 누락되었습니다',
    },
    OFFICIAL_LANGUAGES_EMPTY: {
        en: 'Official languages are missing',
        'zh-Hans': '缺少官方语言',
        'zh-Hant': '缺少官方語言',
        ja: '公用語が指定されていません',
        ko: '공용어가 지정되지 않았습니다',
    },
    CITY_CODE_UNDEFINED: {
        en: 'City code is missing',
        'zh-Hans': '缺少城市代码',
        'zh-Hant': '缺少城市代碼',
        ja: '都市コードが入力されていません',
        ko: '도시 코드가 누락되었습니다',
    },
    LINE_CODE_UNDEFINED: {
        en: 'At least one line code is missing',
        'zh-Hans': '至少1条线路的代码缺失',
        'zh-Hant': '至少1條路綫的代碼缺失',
        ja: '路線コードが未入力の路線があります',
        ko: '코드가 누락된 노선이 있습니다',
    },
    LINE_CODE_DUPLICATED: {
        en: 'Duplicated line code found',
        'zh-Hans': '包含重复的线路代码',
        'zh-Hant': '包含重複的路綫代碼',
        ja: '路線コードが重複しています',
        ko: '중복된 노선 코드가 있습니다',
    },

    EN_UNDEFINED: {
        en: 'English name is missing',
        'zh-Hans': '缺少英文名称',
        'zh-Hant': '缺少英文名稱',
        ja: '英語の名称が入力されていません',
        ko: '영어 명칭이 누락되었습니다',
    },
    ZH_HANS_UNDEFINED: {
        en: 'Simplified Chinese name is missing',
        'zh-Hans': '缺少简体中文名称',
        'zh-Hant': '缺少簡體中文名稱',
        ja: '簡体字中国語の名称が入力されていません',
        ko: '중국어 간체 명칭이 누락되었습니다',
    },
    ZH_HANT_UNDEFINED: {
        en: 'Traditional Chinese name is missing',
        'zh-Hans': '缺少繁体中文名称',
        'zh-Hant': '缺少繁體中文名稱',
        ja: '繁体字中国語の名称が入力されていません',
        ko: '중국어 번체 명칭이 누락되었습니다',
    },
    LANGUAGE_DUPLICATED: {
        en: 'Duplicated language found',
        'zh-Hans': '包含重复的语言',
        'zh-Hant': '包含重複的語言',
        ja: '言語が重複しています',
        ko: '중복된 언어가 있습니다',
    },
    OFFICIAL_LANGUAGE_UNDEFINED: {
        en: 'Name in official languages is missing',
        'zh-Hans': '缺少官方语言名称',
        'zh-Hant': '缺少官方語言名稱',
        ja: '公用語の名称が入力されていません',
        ko: '공용어 명칭이 누락되었습니다',
    },
};

export type DataSource =
    | 'OFFICIAL_WEBSITE'
    | 'SOCIAL_MEDIA'
    | 'GOVERNMENT'
    | 'INTERNAL'
    | 'WEBSITE_SOURCE_CODE'
    | 'PDF'
    | 'LOSSY'
    | 'WIKIPEDIA'
    | 'OTHER';

export const DATA_SOURCE_DISPLAY_TEXT: Record<DataSource, Translation> = {
    OFFICIAL_WEBSITE: {
        en: '1. Design standard published in the official website',
        'zh-Hans': '1. 官方网站发布的设计标准',
        'zh-Hant': '1. 官方網站發佈的設計標準',
        ja: '1. 公式サイトで公開されたデザイン規格',
        ko: '1. 공식 웹사이트에 게시된 디자인 표준',
    },
    SOCIAL_MEDIA: {
        en: '2. Design standard published by the official social media',
        'zh-Hans': '2. 官方社交媒体发布的设计标准',
        'zh-Hant': '2. 官方社交媒體發佈的設計標準',
        ja: '2. 公式 SNS で公開されたデザイン規格',
        ko: '2. 공식 소셜 미디어에 게시된 디자인 표준',
    },
    GOVERNMENT: {
        en: '3. Code of design standard published by the government or legislature',
        'zh-Hans': '3. 政府或立法机关公布的设计守则',
        'zh-Hant': '3. 政府或立法機關公佈的設計守則',
        ja: '3. 政府または立法機関が定めたデザイン規程',
        ko: '3. 정부 또는 입법 기관이 공표한 디자인 규정',
    },
    INTERNAL: {
        en: '4. Internal leaked source',
        'zh-Hans': '4. 内部流出的来源',
        'zh-Hant': '4. 內部流出的來源',
        ja: '4. 内部から流出した資料',
        ko: '4. 내부에서 유출된 자료',
    },
    WEBSITE_SOURCE_CODE: {
        en: '5. Source code of the official website',
        'zh-Hans': '5. 官方网站的源代码',
        'zh-Hant': '5. 官方網站的源程式碼',
        ja: '5. 公式サイトのソースコード',
        ko: '5. 공식 웹사이트의 소스 코드',
    },
    PDF: {
        en: '6. Colours extracted from a PDF file',
        'zh-Hans': '6. 从 PDF 文件提取的颜色',
        'zh-Hant': '6. 从 PDF 檔案擷取的顏色',
        ja: '6. PDF ファイルから抽出した色',
        ko: '6. PDF 파일에서 추출한 색상',
    },
    LOSSY: {
        en: '7. Colours extracted from a lossy image (e.g. JPG)',
        'zh-Hans': '7. 从有损压缩的图片（如 JPG）提取的颜色',
        'zh-Hant': '7. 从有損壓縮的圖像（如 JPG）擷取的顏色',
        ja: '7. 非可逆圧縮画像（JPG など）から抽出した色',
        ko: '7. 손실 압축 이미지(예: JPG)에서 추출한 색상',
    },
    WIKIPEDIA: {
        en: '8. Wikipedia',
        'zh-Hans': '8. 维基百科',
        'zh-Hant': '8. 維基百科',
        ja: '8. ウィキペディア',
        ko: '8. 위키백과',
    },
    OTHER: {
        en: '9. Others (Please indicate below)',
        'zh-Hans': '9. 其他（请于下方注明）',
        'zh-Hant': '9. 其他（請於下方註明）',
        ja: '9. その他（以下に記入してください）',
        ko: '9. 기타(아래에 명시해 주세요)',
    },
};

export enum Events {
    APP_LOAD = 'APP_LOAD',

    ADD_CITY = 'ADD_CITY',
    EDIT_CITY = 'EDIT_CITY',
    RESET_TICKET = 'RESET_TICKET',

    REMOVE_HISTORY_ITEM = 'REMOVE_HISTORY_ITEM',
    CLEAR_HISTORY = 'CLEAR_HISTORY',

    APP_CLIP_VIEW_OPENED = 'APP_CLIP_VIEW_OPENED',
    APP_CLIP_VIEW_CLOSED = 'APP_CLIP_VIEW_CLOSED',
    APP_CLIP_VIEW_SELECT = 'APP_CLIP_VIEW_SELECT',
}

export const DRAFT_TICKET_KEY = 'draftTicket';
export const RECENTLY_USED_KEY = 'recentlyUsed';
