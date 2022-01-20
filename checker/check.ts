// Set the system environment and run the checker
//
// $Env:TS_NODE_COMPILER="ttypescript"
// node --loader ts-node/esm .\checker\check.ts

import { readFileSync, readdirSync } from 'fs';
import { is } from 'typescript-is';

import { PaletteEntry, CityEntry } from './constants';

console.log('Hi, this is the RMG bot who will validate json resources.');

// check city-config.json follows the CityEntry[]
const checkCityConfig = (): string[] => {
    const rawCityConfig = JSON.parse(readFileSync('./public/resources/city-config.json', 'utf-8'));
    if (!is<CityEntry[]>(rawCityConfig)) {
        throw new TypeError("city-config.json doesn't follow the CityEntry[]");
    }
    // record all the cities shown in the city-config
    const cityConfig = rawCityConfig as unknown as CityEntry[];
    const cityCode = cityConfig.map(city => city.id);
    console.log('Cities that are identified: ', cityCode);
    return cityCode;
};

// make sure every city in cityCode correspond to a JSON file in palettes
const checkCorrespondence = (cityCode: string[]) => {
    const cityNames = readdirSync('./public/resources/palettes/', 'utf-8').map(filename =>
        filename.replace(/(.*)\.(.*?)$/, '$1')
    );
    const cityFileWithUnkownNames = cityCode
        .filter(city => !(cityNames.indexOf(city) > -1))
        .concat(cityNames.filter(city => !(cityCode.indexOf(city) > -1)));
    if (cityFileWithUnkownNames.length > 0) {
        throw new TypeError(`These cities have unkown ${cityFileWithUnkownNames}`);
    }
};

// check each city json follows the PaletteEntry[]
const checkCity = () => {
    const invalidCityFilenames = readdirSync('./public/resources/palettes/', 'utf-8')
        .map(cityFilename => `./public/resources/palettes/${cityFilename}`)
        .map(cityFilename => {
            return { filename: cityFilename, content: JSON.parse(readFileSync(cityFilename, 'utf-8')) };
        })
        .filter(cityFile => !is<PaletteEntry[]>(cityFile.content))
        .map(cityFile => cityFile.filename);
    if (invalidCityFilenames.length > 0) {
        throw new TypeError(`${invalidCityFilenames} doesn't follow the CityEntry[]`);
    }
};

try {
    const cityCode = checkCityConfig();
    checkCorrespondence(cityCode);
    checkCity();
    console.log('All tests pass.');
} catch (error) {
    console.error(error);
    process.exit(1);
}
