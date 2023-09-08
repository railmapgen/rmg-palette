import cityConfigJson from './palettes/city-config.json';
import countryConfigJson from './palettes/country-config.json';
import { CityEntry, CountryEntry } from './types';

export * from './types';
export * from './cached-fetch';
export * from './updater';

export const cityList = cityConfigJson as CityEntry[];
export const countryList = countryConfigJson as CountryEntry[];
