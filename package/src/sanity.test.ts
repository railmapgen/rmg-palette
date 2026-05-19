import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import cityList from '../../public/resources/city-config.json' with { type: 'json' };
import countryList from '../../public/resources/country-config.json' with { type: 'json' };
import { LANGUAGE_NAMES } from '@railmapgen/rmg-translate';

const translationAssertion = (nameObj: any) => {
    assert.equal(typeof nameObj, 'object');
    Object.entries(nameObj).forEach(([lang, name]) => {
        assert.ok(lang in LANGUAGE_NAMES);
        assert.equal(typeof name, 'string');
    });
};

const allCities = cityList.map(city => city.id);

describe('Sanity', () => {
    it('Check city-config.json follows type CityEntry[]', () => {
        cityList.forEach(city => {
            assert.equal(typeof city.id, 'string');
            assert.equal(typeof city.country, 'string');
            translationAssertion(city.name);
        });
    });

    it('Make sure every city in cityCode correspond to a JSON file in palettes', () => {
        allCities.forEach(cityId => {
            assert.ok(fs.existsSync(`../public/resources/palettes/${cityId}.json`), `${cityId}.json is missing`);
        });
    });

    allCities.forEach(cityId =>
        it(`Palette file of ${cityId} exists and follows type PaletteEntry[] and no duplicates`, async () => {
            const { default: palette } = await import(`../../public/resources/palettes/${cityId}.json`, {
                with: { type: 'json' },
            });

            // type check
            palette.forEach((line: any) => {
                assert.equal(typeof line.id, 'string');
                translationAssertion(line.name);
                assert.ok(line.colour.match(/^#[0-9a-fA-F]{6}$/));
                if (line.fg) {
                    assert.ok(line.fg.match(/^#fff|#000$/));
                }
                if (line.pantone) {
                    assert.equal(typeof line.pantone, 'string');
                }
            });

            // duplication check
            assert.equal(new Set(palette.map((line: any) => line.id)).size, palette.length);
        })
    );

    it('Check country-config.json follows type CountryEntry[]', () => {
        countryList.forEach(country => {
            assert.equal(typeof country.id, 'string');
            translationAssertion(country.name);

            assert.ok(Array.isArray(country.languages));
            country.languages.forEach(language => {
                assert.ok(language in LANGUAGE_NAMES);
            });
        });
    });

    it('Check city-config countries are in country-config', () => {
        const allCountries = countryList.map(country => country.id);
        cityList.forEach(city => {
            assert.ok(allCountries.includes(city.country));
        });
    });

    countryList.forEach(country => {
        const countryId = country.id;
        it(`Check country code ${countryId} validity`, () => {
            assert.notEqual(countryId.match(/^[A-Z]{2}$|^GB[A-Z]{3}$/), null);
        });
    });
});
