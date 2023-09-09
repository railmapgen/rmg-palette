import { MonoColour, Theme } from './types';
import { cachedFetch, getPalette } from './cached-fetch';

const getHistory = async (): Promise<Record<string, number>> => {
    return await cachedFetch(`/rmg-palette/resources/history.json`);
};

export const isUpdateRequired = async (cityId: string, since: number): Promise<boolean> => {
    const history = await getHistory();
    const lastCommitted = history[cityId];

    if (!lastCommitted) {
        return true;
    } else {
        // add half day buffer
        return lastCommitted + 12 * 60 * 60_000 > since;
    }
};

/**
 * @param oldTheme
 * @param since - Timestamp in milliseconds
 * @param throwError - If undefined or false, error will not be thrown and old theme is returned
 */
export const updateTheme = async (oldTheme: Theme, since?: number, throwError?: boolean): Promise<Theme> => {
    const [cityId, lineId] = oldTheme;
    if (cityId === 'other') {
        return oldTheme;
    }

    if (since) {
        try {
            const required = await isUpdateRequired(cityId, since);
            if (!required) {
                return oldTheme;
            }
        } catch (e) {
            if (throwError) {
                console.error(
                    `[rmg-palette] updateTheme(${cityId}, ${since}), unable to get palette update history, update aborted`,
                    e
                );
                throw e;
            } else {
                console.warn(
                    `[rmg-palette] updateTheme(${cityId}, ${since}), unable to get palette update history, proceed anyway`,
                    e
                );
            }
        }
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
        if (throwError) {
            console.error(`[rmg-palette] updateTheme(${cityId}, ${lineId}), unexpected error occurs`, e);
            throw e;
        } else {
            console.warn(
                `[rmg-palette] updateTheme(${cityId}, ${lineId}), unexpected error occurs, returning old theme`,
                e
            );
            return oldTheme;
        }
    }
};
