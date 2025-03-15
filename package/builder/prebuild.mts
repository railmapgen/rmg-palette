// node --loader ts-node/esm .\builder\prebuild.ts

import path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';
import { CityEntry } from '../src';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourcePath = path.join(__dirname, '../../public/resources');

const generateUpdateHistory = async () => {
    // read source file
    const cityConfigStr = await readFile(path.join(sourcePath, 'city-config.json'), 'utf-8');
    const cityConfig: CityEntry[] = JSON.parse(cityConfigStr);

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

generateUpdateHistory().then();
