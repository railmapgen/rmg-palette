import cityList from '../../public/resources/city-config.json';
import countryList from '../../public/resources/country-config.json';
import { LANGUAGE_NAMES } from '@railmapgen/rmg-translate';

const translationAssertion = (nameObj: any) => {
    expect(typeof nameObj).toBe('object');
    Object.entries(nameObj).forEach(([lang, name]) => {
        expect(LANGUAGE_NAMES).toHaveProperty(lang);
        expect(typeof name).toBe('string');
    });
};

const allCities = cityList.map(city => city.id);

describe('Sanity', () => {
    it('Check city-config.json follows type CityEntry[]', () => {
        cityList.forEach(city => {
            expect(typeof city.id).toBe('string');
            expect(typeof city.country).toBe('string');
            translationAssertion(city.name);
        });
    });

    it('Make sure every city in cityCode correspond to a JSON file in palettes', () => {
        const palettes = import.meta.glob(`../../public/resources/palettes/*.json`);
        Object.keys(palettes).forEach(path => {
            const cityId = path.match(/\/(\w+).json/)![1];
            expect(allCities).toContain(cityId);
        });
    });

    it.each(allCities)('Palette file of %s exists and follows type PaletteEntry[] and no duplicates', async cityId => {
        const { default: palette } = await import(`../../public/resources/palettes/${cityId}.json`);

        // type check
        palette.forEach((line: any) => {
            expect(typeof line.id).toBe('string');
            translationAssertion(line.name);
            expect(line.colour.match(/^#[0-9a-fA-F]{6}$/)).toBeTruthy();
            if (line.fg) {
                expect(line.fg.match(/^#fff|#000$/)).toBeTruthy();
            }
            if (line.pantone) {
                expect(typeof line.pantone).toBe('string');
            }
        });

        // duplication check
        expect(new Set(palette.map((line: any) => line.id)).size).toBe(palette.length);
    });

    it('Check country-config.json follows type CountryEntry[]', () => {
        countryList.forEach(country => {
            expect(typeof country.id).toBe('string');
            translationAssertion(country.name);

            expect(Array.isArray(country.languages)).toBeTruthy();
            country.languages.forEach(language => {
                expect(LANGUAGE_NAMES).toHaveProperty(language);
            });
        });
    });

    it('Check city-config countries are in country-config', () => {
        const allCountries = countryList.map(country => country.id);
        cityList.forEach(city => {
            expect(allCountries).toContain(city.country);
        });
    });

    it.each(countryList.map(country => country.id))('Check country code %s validity', countryId => {
        expect(countryId.match(/^[A-Z]{2}$|^GB[A-Z]{3}$/)).not.toBeNull();
    });
});
