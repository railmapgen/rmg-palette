import { CityEntry, PaletteEntry } from '@railmapgen/rmg-palette-resources';

export type ColourHex = `#${string}`;

export enum MonoColour {
    black = '#000',
    white = '#fff',
}

/**
 * @property {string} 0 - Chinese characters
 * @property {string} 1 - Latin characters
 */
export type Name = [string, string];

export const GITHUB_ISSUE_PREAMBLE = '**Do not edit lines below, they are meant for bots only!!!**';
export const getGitHubIssueCityBlock = (cityEntry: CityEntry | null) => {
    return `<details repo='rmg-palette' type='city'>
${JSON.stringify(cityEntry, null, 4)}
</details>`;
};
export const getGitHubIssueLinesBlock = (lines: PaletteEntry[]) => {
    return `<details repo='rmg-palette' type='lines'>
${JSON.stringify(lines, null, 4)}
</details>`;
};
