// node --loader ts-node/esm .\builder\build.ts

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import { inspect } from 'util';

import { CityEntry } from '../checker/constants';
import { getCountryCodeEnum, getCountryConfigText } from './country-config';
import { copyFlagSvgFromResources } from './emoji-util';

console.log('Hi, this is the RMG bot who will build packages.');

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
const removeExtension = (s: string) => s.split('.').slice(0, -1).join('.');

const distPath = './lib';

// generate `enum CityCode` from city-config.json
const cityConfig = JSON.parse(readFileSync('../public/resources/city-config.json', 'utf-8')) as unknown as CityEntry[];
const cityCode = cityConfig.map(city => city.id);
const cityCodeEnum = `export enum CityCode {\r\n${cityCode
    .map(city => `    ${capitalize(city)} = '${city}',`)
    .join('\r\n')}\r\n}\r\n`;

// write complete constants.ts as index.ts
if (!existsSync(distPath)) mkdirSync(distPath);
const rawConstants = readFileSync('./checker/constants.ts', 'utf-8')
    .replace('id: string; // replace me to CityCode, builder!', 'id: CityCode;')
    .replace('id: string; // replace me to CountryCode, builder!', 'id: CountryCode;');
const constantsFileContent = rawConstants + '\r\n' + cityCodeEnum + getCountryCodeEnum();
writeFileSync(`${distPath}/index.ts`, constantsFileContent);

if (!existsSync('./dist/flags')) mkdirSync('./dist/flags', { recursive: true });

// append city-config with cities in CityCode format to index.ts
const updatedConfig = cityConfig.map(city => {
    return {
        ...city,
        id: `CityCode.${capitalize(city.id)}`,
        country: `CountryCode.${city.country}`,
    };
});

const cityConfigFileContent = `export const cityList: CityEntry[] = ${inspect(updatedConfig)};\r\n`
    .replace(/'(CityCode.\w+)'/g, '$1')
    .replace(/'(CountryCode.\w+)'/g, '$1');
appendFileSync(`${distPath}/index.ts`, cityConfigFileContent);
appendFileSync(`${distPath}/index.ts`, getCountryConfigText());

if (!existsSync(`${distPath}/palettes`)) mkdirSync(`${distPath}/palettes`);
readdirSync('../public/resources/palettes/', 'utf-8')
    .map(cityFilename => {
        return {
            filename: cityFilename,
            content: JSON.parse(readFileSync(`../public/resources/palettes/${cityFilename}`, 'utf-8')),
        };
    })
    .map(cityFile => {
        const city = capitalize(removeExtension(cityFile.filename));
        return {
            city: removeExtension(cityFile.filename),
            content: `
import { PaletteEntry, MonoColour } from '../index';
const ${city}: PaletteEntry[] = ${JSON.stringify(cityFile.content)
                .replaceAll('"#000"', 'MonoColour.black')
                .replaceAll('"#fff"', 'MonoColour.white')};
export default ${city};
`,
        };
    })
    .map(cityFile => writeFileSync(`${distPath}/palettes/${cityFile.city}.ts`, cityFile.content));

console.log('.ts files are written to ./package/lib.');

// create package.json for npm publish
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
writeFileSync('./dist/package.json', JSON.stringify({ ...packageJson, type: undefined }));
