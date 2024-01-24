import { CountryEntry } from '@railmapgen/rmg-palette-resources';

const chineseTimesZones = [
    'Asia/Shanghai',
    'Asia/Urumqi',
    'Asia/Chongqing',
    'Asia/Chungking',
    'Asia/Harbin',
    'Asia/Kashgar',
    'PRC',
];
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const isChineseUser = () => chineseTimesZones.includes(userTimeZone);

export const _censorCountryList = (countryList: CountryEntry[]): CountryEntry[] => {
    return countryList.map(country => {
        if (country.id === 'HK') {
            return {
                ...country,
                name: {
                    ...country.name,
                    en: 'Hong Kong SAR, China',
                    'zh-Hans': '中国香港',
                    'zh-Hant': '中國香港',
                },
            };
        } else if (country.id === 'MO') {
            return {
                ...country,
                name: {
                    ...country.name,
                    en: 'Macao SAR, China',
                    pt: 'RAE de Macau, China',
                    'zh-Hans': '中国澳门',
                    'zh-Hant': '中國澳門',
                },
            };
        } else if (country.id === 'TW') {
            return {
                ...country,
                name: {
                    ...country.name,
                    en: 'Taiwan, China',
                    'zh-Hans': '中国台湾',
                    'zh-Hant': '中國台灣',
                },
            };
        } else {
            return country;
        }
    });
};

export const censorCountryList = (countryList: CountryEntry[]): CountryEntry[] => {
    if (!isChineseUser()) return countryList;
    return _censorCountryList(countryList);
};

export const _censorFlag = (countryCode: string): string => {
    if (countryCode === 'TW') {
        return 'CN';
    } else {
        return countryCode;
    }
};

export const censorFlag = (countryCode: string): string => {
    if (!isChineseUser()) return countryCode;
    return _censorFlag(countryCode);
};
