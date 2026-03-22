import type { CityEntry, CountryEntry, PaletteEntry } from './types';
import { decompressCityConfig, decompressCountryConfig } from './compressor';

let RESPONSE_CACHE: Record<string, any> = {};

export const cachedFetch = async (url: string, init?: RequestInit): Promise<any> => {
    if (url in RESPONSE_CACHE) {
        return RESPONSE_CACHE[url];
    }

    const res = await fetch(url, init);
    const data = await res.json();
    RESPONSE_CACHE[url] = data;
    return data;
};

export const _clearCache = () => {
    RESPONSE_CACHE = {};
};

export const getPalette = async (cityId: string, signal?: AbortSignal): Promise<PaletteEntry[]> => {
    return await cachedFetch(`/rmg-palette/resources/palettes/${cityId}.json`, { signal });
};

export const getCityList = async (signal?: AbortSignal): Promise<CityEntry[]> => {
    const data = await cachedFetch(`/rmg-palette/resources/city-config.compressed.json`, { signal });
    return decompressCityConfig(data);
};

export const getCountryList = async (signal?: AbortSignal): Promise<CountryEntry[]> => {
    const data = await cachedFetch(`/rmg-palette/resources/country-config.compressed.json`, { signal });
    return decompressCountryConfig(data);
};
