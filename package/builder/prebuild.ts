// node --loader ts-node/esm .\builder\prebuild.ts

import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { CityEntry, CountryEntry } from '../src';
import { execSync } from 'child_process';
import { getFlagEmoji } from './emoji-util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourcePath = path.join(__dirname, '../../public/resources');
const targetPath = path.join(__dirname, '../src/palettes');
const distTargetPath = path.join(__dirname, '../dist/palettes');

const copyCityConfig = async () => {
    console.log('Copying city list...');

    // read source file
    const cityConfigStr = await readFile(path.join(sourcePath, 'city-config.json'), 'utf-8');
    const cityConfig: CityEntry[] = JSON.parse(cityConfigStr);

    // generate update history
    await generateUpdateHistory(cityConfig);

    // copy to target dir
    await mkdir(targetPath, { recursive: true });
    await writeFile(path.join(targetPath, 'city-config.json'), JSON.stringify(cityConfig));
};

const generateUpdateHistory = async (config: CityEntry[]) => {
    const history = config.reduce<Record<string, number>>((acc, cur) => {
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
    await writeFile(`../public/resources/history.json`, JSON.stringify(history));
};

const copyCountryConfig = async () => {
    console.log('Copying country list...');

    // read source file
    const countryConfigStr = await readFile(path.join(sourcePath, 'country-config.json'), 'utf-8');
    const countryConfig: CountryEntry[] = JSON.parse(countryConfigStr);

    // update country config
    const updatedCountryConfig = await Promise.all(
        countryConfig.map(async country => {
            console.log(`copyCountryConfig(), updating config of ${country.id}`);
            return {
                ...country,
                flagEmoji: getFlagEmoji(country.id),
            };
        })
    );

    // copy to target dir
    await mkdir(targetPath, { recursive: true });
    await writeFile(path.join(targetPath, 'country-config.json'), JSON.stringify(updatedCountryConfig));
};

const writePackageJson = async () => {
    console.log('Writing package.json for dist...');

    // read source file
    const packageJsonStr = await readFile(path.join(__dirname, '..', 'package.json'), 'utf-8');
    const { type: _, ...others } = JSON.parse(packageJsonStr);

    await mkdir(path.join(distTargetPath), { recursive: true });
    await writeFile(path.join(distTargetPath, '..', 'package.json'), JSON.stringify(others));
};

const prebuild = async () => {
    await copyCityConfig();
    await copyCountryConfig();
    await writePackageJson();
};

prebuild().then();
