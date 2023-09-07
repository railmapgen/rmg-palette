import { MonoColour, Theme } from './types';
import { getPalette } from './index';
import { cachedFetch } from './cached-fetch';

const getHistory = async (): Promise<Record<string, number>> => {
    return await cachedFetch(`/rmg-palette/resources/history.json`);
};

const isUpdateRequired = async (cityId: string, since: number): Promise<boolean> => {
    try {
        const history = await getHistory();
        const lastCommitted = history[cityId];

        if (!lastCommitted) {
            return true;
        } else {
            // add half day buffer
            return lastCommitted + 12 * 60 * 60_000 > since;
        }
    } catch (e) {
        console.warn(
            `[rmg-palette] isUpdateRequired(${cityId}, ${since}), unable to get palette update history, update all data anyway...`,
            e
        );
        return true;
    }
};

/**
 * @param oldTheme
 * @param since - Timestamp in milliseconds
 */
export const updateTheme = async (oldTheme: Theme, since?: number): Promise<Theme> => {
    const [cityId, lineId] = oldTheme;
    if (cityId === 'other') {
        return oldTheme;
    }

    if (since && !(await isUpdateRequired(cityId, since))) {
        return oldTheme;
    }

    try {
        const palette = await getPalette(cityId);
        const serverEntry = palette.find(p => p.id === lineId);
        if (serverEntry) {
            return [cityId, lineId, serverEntry.colour, serverEntry.fg || MonoColour.white];
        } else {
            console.warn(`[rmg-palette] updateTheme(${cityId}, ${lineId}), line does not exist, returning old theme`);
            return oldTheme;
        }
    } catch (e) {
        console.warn(
            `[rmg-palette] updateTheme(${cityId}, ${lineId}), unexpected error occurs, returning old theme`,
            e
        );
        return oldTheme;
    }
};
