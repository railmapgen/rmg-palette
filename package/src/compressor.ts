import type { CityEntry, CountryEntry } from './types';

type CompressedCityEntry = [CityEntry['id'], CityEntry['country'], (string | null)[], CityEntry['name']];

export const compressCityConfig = (cityConfig: CityEntry[]): CompressedCityEntry[] =>
    cityConfig.map(({ id, country, name: { en, 'zh-Hans': chs, 'zh-Hant': cht, ...otherNames } }) => [
        id,
        country,
        [en ?? null, chs ?? null, cht ?? null],
        otherNames,
    ]);

export const decompressCityConfig = (compressedCityConfig: CompressedCityEntry[]): CityEntry[] =>
    compressedCityConfig.map(([id, country, [en, chs, cht], otherNames]) => {
        const name = { ...otherNames };
        if (en) {
            name.en = en;
        }
        if (chs) {
            name['zh-Hans'] = chs;
        }
        if (cht) {
            name['zh-Hant'] = cht;
        }
        return { id, country, name };
    });

type CompressedCountryEntry = [CountryEntry['id'], CountryEntry['languages'], (string | null)[], CountryEntry['name']];

export const compressCountryConfig = (countryConfig: CountryEntry[]): CompressedCountryEntry[] =>
    countryConfig.map(({ id, languages, name: { en, 'zh-Hans': chs, 'zh-Hant': cht, ...otherNames } }) => [
        id,
        languages,
        [en ?? null, chs ?? null, cht ?? null],
        otherNames,
    ]);

export const decompressCountryConfig = (compressedCountryConfig: CompressedCountryEntry[]): CountryEntry[] =>
    compressedCountryConfig.map(([id, languages, [en, chs, cht], otherNames]) => {
        const name = { ...otherNames };
        if (en) {
            name.en = en;
        }
        if (chs) {
            name['zh-Hans'] = chs;
        }
        if (cht) {
            name['zh-Hant'] = cht;
        }
        return { id, languages, name };
    });
