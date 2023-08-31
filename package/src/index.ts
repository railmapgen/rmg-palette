import cityConfigJson from './palettes/city-config.json';
import countryConfigJson from './palettes/country-config.json';
import { CityEntry, CountryEntry, MonoColour, PaletteEntry, Theme } from './types';
import { cachedFetch } from './cached-fetch';

export const getPalette = async (cityId: string, signal?: AbortSignal): Promise<PaletteEntry[]> => {
    return await cachedFetch(`/rmg-palette/resources/palettes/${cityId}.json`, { signal });
};

export const updateTheme = async (oldTheme: Theme): Promise<Theme> => {
    const [cityId, lineId] = oldTheme;

    try {
        const palette = await getPalette(cityId);
        const serverEntry = palette.find(p => p.id === lineId);
        if (serverEntry) {
            return [cityId, lineId, serverEntry.colour, serverEntry.fg || MonoColour.white];
        } else {
            console.warn(`[rmg-palette] updateTheme(${cityId}, ${lineId}), line does not exist, returning old theme`);
            return oldTheme;
        }
    } catch (e) {
        console.warn(
            `[rmg-palette] updateTheme(${cityId}, ${lineId}), unexpected error occurs, returning old theme`,
            e
        );
        return oldTheme;
    }
};

export * from './types';

export const cityList = cityConfigJson as CityEntry[];
export const countryList = countryConfigJson as CountryEntry[];
