// Set the system environment and run the checker
//
// $Env:TS_NODE_COMPILER="ttypescript"
// node --loader ts-node/esm .\checker\check.ts

import { readFileSync, readdirSync } from 'fs';
import { equals, assertEquals } from "typescript-json";

import { PaletteEntry, CityEntry, CountryEntry } from './constants';

console.log('Hi, this is the RMG bot who will validate json resources.');

// check city-config.json follows the CityEntry[]
const checkCityConfig = (): string[] => {
    const rawCityConfig = JSON.parse(readFileSync('../public/resources/city-config.json', 'utf-8'));
    assertEquals<CityEntry[]>(rawCityConfig);
    // record all the cities shown in the city-config
    const cityConfig = rawCityConfig as unknown as CityEntry[];
    const cityCode = cityConfig.map(city => city.id);
    console.log('Cities that are identified: ', cityCode);
    return cityCode;
};

// make sure every city in cityCode correspond to a JSON file in palettes
const checkCorrespondence = (cityCode: string[]) => {
    const cityNames = readdirSync('../public/resources/palettes/', 'utf-8').map(filename =>
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
const checkCity = () =>
    readdirSync('../public/resources/palettes/', 'utf-8')
        .map(cityFilename => `../public/resources/palettes/${cityFilename}`)
        .map(cityFilename => JSON.parse(readFileSync(cityFilename, 'utf-8')))
        .forEach(cityFileContent => {
            assertEquals<PaletteEntry[]>(cityFileContent);
        });

// check country-config.json follows the CountryEntry[]
const checkCountryConfig = (): string[] => {
    const rawCountryConfig = JSON.parse(readFileSync('../public/resources/country-config.json', 'utf-8'));
    assertEquals<CountryEntry[]>(rawCountryConfig);
    // record all the countries shown in the country-config
    const countryConfig = rawCountryConfig as unknown as CountryEntry[];
    const countryCode = countryConfig.map(country => country.id);
    console.log('Countries that are identified: ', countryCode);
    return countryCode;
};

//check city-config countries are in country-config
const checkCityInCountry = (countryCode: string[]) => {
    const rawCityConfig: CityEntry[] = JSON.parse(readFileSync('../public/resources/city-config.json', 'utf-8'));
    const cityCountrySet = new Set(rawCityConfig.map(city => city.country));
    const countryWithUnkownNames = [...cityCountrySet].filter(country => !countryCode.includes(country));
    if (countryWithUnkownNames.length > 0) {
        throw new TypeError(`These country names are unkown: ${countryWithUnkownNames}`);
    }
};

try {
    const cityCode = checkCityConfig();
    checkCorrespondence(cityCode);
    checkCity();

    const countryCode = checkCountryConfig();
    checkCityInCountry(countryCode);
    console.log('All tests pass.');
} catch (error) {
    console.error(error);
    process.exit(1);
}
