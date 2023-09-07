import cityConfigJson from './palettes/city-config.json';
import countryConfigJson from './palettes/country-config.json';
import { CityEntry, CountryEntry, PaletteEntry } from './types';
import { cachedFetch } from './cached-fetch';

export const getPalette = async (cityId: string, signal?: AbortSignal): Promise<PaletteEntry[]> => {
    return await cachedFetch(`/rmg-palette/resources/palettes/${cityId}.json`, { signal });
};

export * from './types';
export * from './updater';

export const cityList = cityConfigJson as CityEntry[];
export const countryList = countryConfigJson as CountryEntry[];
