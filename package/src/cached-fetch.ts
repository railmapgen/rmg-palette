import type { CityEntry, CountryEntry, PaletteEntry } from './types';
import { decode } from '@msgpack/msgpack';

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

export const cachedFetchBinary = async (url: string, init?: RequestInit): Promise<any> => {
    if (url in RESPONSE_CACHE) {
        return RESPONSE_CACHE[url];
    }

    const res = await fetch(url, init);
    const buffer = new Uint8Array(await res.arrayBuffer());
    const data = decode(buffer);
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
    return await cachedFetchBinary(`/rmg-palette/resources/city-config.msgpack`, { signal });
};

export const getCountryList = async (signal?: AbortSignal): Promise<CountryEntry[]> => {
    return await cachedFetchBinary(`/rmg-palette/resources/country-config.msgpack`, { signal });
};
