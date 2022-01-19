// node --loader ts-node/esm .\builder\build.ts

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import { inspect } from 'util';

import { CityEntry } from '../checker/constants';

console.log('Hi, this is the RMG bot who will build packages');

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
const removeExtension = (s: string) => s.split('.').slice(0, -1).join('.');

// generate `enum CityCode` from city-config.json
const cityConfig = JSON.parse(readFileSync('../public/resources/city-config.json', 'utf-8')) as unknown as CityEntry[];
const cityCode = cityConfig.map(city => city.id);
const cityCodeEnum = `export enum CityCode {\r\n${cityCode
    .map(city => `    ${capitalize(city)} = '${city}',`)
    .join('\r\n')}\r\n}\r\n`;

// create /lib folder
if (!existsSync('./lib')) {
    mkdirSync('./lib');
}

// write complete constants.ts as index.ts
const rawConstants = readFileSync('./checker/constants.ts', 'utf-8').replace(
    'id: string; // replace me, builder!',
    'id: CityCode;'
);
const constantsFileContent = rawConstants + '\r\n' + cityCodeEnum;
writeFileSync('./lib/index.ts', constantsFileContent);

// append city-config with cities in CityCode format to index.ts
cityConfig.forEach(city => (city.id = `CityCode.${capitalize(city.id)}`));
const cityConfigFileContent = `\r\nexport const cityList: CityEntry[] = ${inspect(cityConfig)};\r\n`.replace(
    /'(CityCode.\w+)'/g,
    '$1'
);
appendFileSync('./lib/index.ts', cityConfigFileContent);

if (!existsSync('./lib/palettes')) mkdirSync('./lib/palettes');
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
            content:
                "import { PaletteEntry, MonoColour } from '../index';\r\n\r\n" +
                `const ${city}: PaletteEntry[] = ${JSON.stringify(cityFile.content)
                    .replaceAll('"#000"', 'MonoColour.black')
                    .replaceAll('"#fff"', 'MonoColour.white')};\r\n\r\nexport default ${city};\r\n`,
        };
    })
    .map(cityFile => writeFileSync(`./lib/palettes/${cityFile.city}.ts`, cityFile.content));
