import { readFileSync, writeFileSync } from 'fs';
import type { CityEntry, CountryEntry, PaletteEntry } from '../src';
import { JSDOM } from 'jsdom';

const readIssueBody = (): HTMLDetailsElement[] => {
    const issueBody = process.env.ISSUE_BODY;
    const dom = new JSDOM(issueBody);
    return Array.from(dom.window.document.querySelectorAll('details[repo="rmg-palette"]'));
};

const parseDetailsEl = (details: HTMLDetailsElement) => {
    const type = details.getAttribute('type');
    if (!type) {
        throw new Error('Missing required attributes and/or data.');
    }
    const value = details.textContent || '';
    return { type, value };
};

let cityID: string | undefined = undefined;
const detailEls = readIssueBody();
const items = detailEls.map(parseDetailsEl);
for (const { type, value } of items) {
    if (type === 'country') {
        const countryConfigFilepath = '../public/resources/country-config.json';
        let countryConfig = JSON.parse(readFileSync(countryConfigFilepath, 'utf-8')) as unknown as CountryEntry[];
        const country = JSON.parse(value.trim()) as unknown as CountryEntry;
        countryConfig = countryConfig
            .concat(country) // push the country
            .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i) // remove duplicate
            .sort((a, b) => a.id.localeCompare(b.id)); // sort by id
        writeFileSync(countryConfigFilepath, `${JSON.stringify(countryConfig, null, 4)}\n`);
    } else if (type === 'city') {
        const cityConfigFilepath = '../public/resources/city-config.json';
        let cityConfig = JSON.parse(readFileSync(cityConfigFilepath, 'utf-8')) as unknown as CityEntry[];
        const city = JSON.parse(value.trim()) as unknown as CityEntry;
        cityID = city.id.toLowerCase(); // save for lines op
        city.id = cityID; // in case if someone capitalize the city id
        cityConfig = cityConfig
            .concat(city) // push the city
            .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i) // remove duplicate
            .sort((a, b) => a.id.localeCompare(b.id)); // sort by id
        writeFileSync(cityConfigFilepath, `${JSON.stringify(cityConfig, null, 4)}\n`);
    } else if (type === 'lines') {
        const cityFilepath = `../public/resources/palettes/${cityID}.json`;
        const lines = JSON.parse(value.trim()) as PaletteEntry[];
        console.log('Printing all colours...\n');
        lines.forEach(line => {
            console.log(`${line.name.en}: bg=\`${line.colour}\`, fg=\`${line.fg ?? '#fff'}\``);
        });
        writeFileSync(cityFilepath, `${JSON.stringify(lines, null, 4)}\n`);
    }
}
