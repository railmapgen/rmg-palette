import cityList from '../../public/resources/city-config.json';
import countryList from '../../public/resources/country-config.json';
import { LANGUAGE_NAMES } from '@railmapgen/rmg-translate';

const translationAssertion = (nameObj: any) => {
    expect(typeof nameObj).toBe('object');
    Object.entries(nameObj).forEach(([lang, name]) => {
        expect(lang in LANGUAGE_NAMES).toBeTruthy();
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

    it.each(allCities)('Palette file of %s exists and follows type PaletteEntry[]', async cityId => {
        const { default: palette } = await import(`../../public/resources/palettes/${cityId}.json`);
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
    });

    it('Check country-config.json follows type CountryEntry[]', () => {
        countryList.forEach(country => {
            expect(typeof country.id).toBe('string');
            translationAssertion(country.name);
            if (country.language) {
                expect(country.language in LANGUAGE_NAMES).toBeTruthy();
            }
        });
    });

    it('Check city-config countries are in country-config', () => {
        const allCountries = countryList.map(country => country.id);
        cityList.forEach(city => {
            expect(allCountries).toContain(city.country);
        });
    });
});