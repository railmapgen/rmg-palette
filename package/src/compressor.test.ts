import cityList from '../../public/resources/city-config.json';
import countryList from '../../public/resources/country-config.json';
import {
    compressCityConfig,
    compressCountryConfig,
    decompressCityConfig,
    decompressCountryConfig,
} from './compressor.ts';
import { CountryEntry } from './types.ts';

describe('Compressor', () => {
    it('Compress city config', () => {
        expect(decompressCityConfig(JSON.parse(JSON.stringify(compressCityConfig(cityList))))).toStrictEqual(cityList);
    });

    it('Compress country config', () => {
        expect(
            decompressCountryConfig(JSON.parse(JSON.stringify(compressCountryConfig(countryList as CountryEntry[]))))
        ).toStrictEqual(countryList);
    });
});
