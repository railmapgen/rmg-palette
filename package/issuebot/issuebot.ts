import { readFileSync, writeFileSync } from 'fs';
import { CityEntry } from '../checker/constants';

const body = JSON.parse(readFileSync('./issuebot/issue.txt', 'utf-8'))['event']['issue']['body'];
const HEADER = 'Do not edit lines below, they are meant for bots only!!!';
const data = body.slice(body.indexOf(HEADER) + HEADER.length);
const TYPE_PATTERN = /<details repo="rmg-palette" type="(\w+)">((.|\n|\r\n)*?)<\/details>/g;

let cityID: string | undefined = undefined;
for (const [, type, value] of data.matchAll(TYPE_PATTERN)) {
    if (type === 'city') {
        const cityConfigFilepath = '../public/resources/city-config.json';
        let cityConfig = JSON.parse(readFileSync(cityConfigFilepath, 'utf-8')) as unknown as CityEntry[];
        const city = JSON.parse(value.trim()) as unknown as CityEntry;
        cityID = city.id; // save for lines op
        cityConfig = cityConfig
            .concat(city) // push the city
            .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i) // remove duplicate
            .sort((a, b) => a.id.localeCompare(b.id)); // sort by id
        writeFileSync(cityConfigFilepath, `${JSON.stringify(cityConfig, null, 4)}\n`);
    } else if (type === 'lines') {
        const cityFilepath = `../public/resources/palettes/${cityID}.json`;
        writeFileSync(cityFilepath, `${value.trim()}\n`);
    }
}
