import { CountryEntry } from '../checker/constants';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { copyFlagSvgFromResources, getFlagEmoji, getFlagSvg } from './emoji-util';
import { inspect } from 'util';

// append country-config format to index.
const countryConfig = JSON.parse(
    readFileSync('../public/resources/country-config.json', 'utf-8')
) as unknown as CountryEntry[];
// generate `enum CountryCode` from country-config.json
const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
const countryCode = countryConfig.map(country => country.id);
export const getCountryCodeEnum = () => {
    return `export enum CountryCode {\r\n${countryCode
        .map(country => `    ${capitalize(country)} = '${country}',`)
        .join('\r\n')}\r\n}\r\n`;
};
// write complete constants.ts as index.ts
const distPath = './lib';
if (!existsSync(distPath)) mkdirSync(distPath);

if (!existsSync('./dist/flags')) mkdirSync('./dist/flags', { recursive: true });

const updatedConfig = countryConfig.map(country => {
    return {
        ...country,
        id: `CountryCode.${capitalize(country.id)}`,
        flagEmoji: getFlagEmoji(country.id),
        flagSvg: getFlagSvg(country.id),
        language: country.language,
    };
});

// copy flags to dist
Promise.all(
    Object.values(updatedConfig)
        .map(country => country.flagSvg)
        .map(copyFlagSvgFromResources)
).then();

export const getCountryConfigText = () => {
    return `export const countryList: CountryEntry[] = ${inspect(updatedConfig)};\r\n`
        .replace(/'(CountryCode.\w+)'/g, '$1')
        .replace(/'(LanguageCode.\w+)'/g, '$1');
};
