import { describe, it } from 'node:test';
import assert from 'node:assert';
import cityList from '../../public/resources/city-config.json' with { type: 'json' };
import countryList from '../../public/resources/country-config.json' with { type: 'json' };
import {
    compressCityConfig,
    compressCountryConfig,
    decompressCityConfig,
    decompressCountryConfig,
} from './compressor.ts';
import type { CountryEntry } from './types.ts';

describe('Compressor', () => {
    it('Compress city config', () => {
        assert.deepEqual(decompressCityConfig(JSON.parse(JSON.stringify(compressCityConfig(cityList)))), cityList);
    });

    it('Compress country config', () => {
        assert.deepEqual(
            decompressCountryConfig(JSON.parse(JSON.stringify(compressCountryConfig(countryList as CountryEntry[])))),
            countryList
        );
    });
});
