// node --experimental-transform-types builder/prebuild.mts

import path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';
import type { CityEntry, CountryEntry } from '../src';
import { execSync } from 'child_process';
import { compressCityConfig, compressCountryConfig } from '../src/compressor.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourcePath = path.join(__dirname, '../../public/resources');

const run = async () => {
    // read and encode city config
    const cityConfigStr = await readFile(path.join(sourcePath, 'city-config.json'), 'utf-8');
    const cityConfig: CityEntry[] = JSON.parse(cityConfigStr);
    await writeFile(
        path.join(sourcePath, 'city-config.compressed.json'),
        JSON.stringify(compressCityConfig(cityConfig))
    );

    // read and encode country config
    const countryConfigStr = await readFile(path.join(sourcePath, 'country-config.json'), 'utf-8');
    const countryConfig: CountryEntry[] = JSON.parse(countryConfigStr);
    await writeFile(
        path.join(sourcePath, 'country-config.compressed.json'),
        JSON.stringify(compressCountryConfig(countryConfig))
    );

    // generate history
    const history = cityConfig.reduce<Record<string, number>>((acc, cur) => {
        console.log(`generateUpdateHistory(), getting last update time of ${cur.id}`);
        const lastCommitted = Number(
            execSync(`git log -1 --pretty="format:%ct" ../public/resources/palettes/${cur.id}.json`).toString() + '000'
        );
        if (isNaN(lastCommitted)) {
            return acc;
        } else {
            return { ...acc, [cur.id]: lastCommitted };
        }
    }, {});
    await writeFile(path.join(sourcePath, 'history.json'), JSON.stringify(history));
};

run().then();
