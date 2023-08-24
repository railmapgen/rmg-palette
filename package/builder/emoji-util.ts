import fetch from 'node-fetch';
import { readFile, writeFile } from 'fs/promises';

const getFlagEmojiCodePoints = (countryCode: string): string[] => {
    const chars = countryCode.toUpperCase().split('');
    if (chars.length === 2) {
        // normal country
        return chars.map(char => ((char.codePointAt(0) || 0) + 0x1f1a5).toString(16).toUpperCase());
    } else if (chars.length === 5) {
        // GBENG, GBSCT
        return [
            '1F3F4',
            ...chars.map(char => ((char.codePointAt(0) || 0) + 0xe0020).toString(16).toUpperCase()),
            'E007F',
        ];
    } else {
        return [];
    }
};

export const getFlagEmoji = (countryCode: string): string => {
    const codePoints = getFlagEmojiCodePoints(countryCode);

    return String.fromCodePoint(...codePoints.map(cp => parseInt(cp, 16)));
};

export const getFlagSvg = async (countryCode: string): Promise<string> => {
    const codePoints = getFlagEmojiCodePoints(countryCode);
    const filename = codePoints.join('-') + '.svg';

    await ensureSvgIsCached(filename);

    return filename;
};

const ensureSvgIsCached = async (filename: string) => {
    try {
        await readSvgFromResources(filename);
    } catch (err) {
        console.warn(`ensureSvgIsCached(${filename}), failed to find SVG file from resources`, err);
        try {
            await fetchAndSaveSvgFromOpenMoji(filename);
        } catch (e) {
            console.error(`ensureSvgIsCached(${filename}), failed to find SVG file from OpenMoji.org`, e);
        }
    }
};

export const copyFlagSvgFromResources = async (filename: string) => {
    let flagSvgString = '';
    try {
        flagSvgString = await readSvgFromResources(filename);
    } catch (err) {
        console.info(
            `copyFlagSvgFromResources():: Failed to find ${filename} from resources, falling back to OpenMoji.org`
        );
        try {
            flagSvgString = await fetchAndSaveSvgFromOpenMoji(filename);
        } catch (e) {
            console.warn(
                `copyFlagSvgFromResources():: Failed to find ${filename} from OpenMoji.org, countryCode=${filename}`
            );
        }
    }

    try {
        await writeFile(`./dist/flags/${filename}`, flagSvgString);
    } catch (err) {
        console.log(`copyFlagSvgFromResources():: Failed to copy ${filename} to dist folder`);
    }
};

const readSvgFromResources = async (filename: string) => {
    return await readFile(`../public/resources/flags/${filename}`, 'utf-8');
};

const fetchAndSaveSvgFromOpenMoji = async (filename: string) => {
    const response = await fetch(`https://openmoji.org/data/color/svg/${filename}`);
    const svgString = await response.text();
    try {
        await writeFile(`../public/resources/flags/${filename}`, svgString);
    } catch (err) {
        console.warn(`fetchAndSaveSvgFromOpenMoji():: Failed to save ${filename} to resources`);
    }
    return svgString;
};
