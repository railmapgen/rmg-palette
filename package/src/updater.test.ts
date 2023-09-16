import { vi } from 'vitest';
import { isUpdateRequired, updateTheme } from './updater';
import { MonoColour } from './types';
import { _clearCache } from './cached-fetch';

const originalFetch = global.fetch;
const mockFetch = vi.fn();

describe('Updater', () => {
    afterEach(() => {
        global.fetch = originalFetch;
        vi.clearAllMocks();
        vi.resetAllMocks();
        _clearCache();
    });

    it('Can determine whether update is required based on last check time', async () => {
        const now = new Date().getTime();
        global.fetch = mockFetch.mockResolvedValue({ json: () => Promise.resolve({ hongkong: now }) });

        expect(await isUpdateRequired('hongkong', now)).toBeTruthy();
        expect(await isUpdateRequired('hongkong', now + 11 * 60 * 60_000)).toBeTruthy(); // half day buffer
        expect(await isUpdateRequired('hongkong', now + 13 * 60 * 60_000)).toBeFalsy();
        expect(await isUpdateRequired('guangzhou', now)).toBeTruthy();
        expect(await isUpdateRequired('guangzhou', now + 24 * 60 * 60_000)).toBeTruthy(); // update history not maintained

        // cached call
        expect(mockFetch).toBeCalledTimes(1);
    });

    it('Can update theme or throw error as expected', async () => {
        const now = new Date().getTime();
        global.fetch = mockFetch.mockImplementation(url => {
            if (url.includes('history')) {
                return Promise.resolve({ json: () => Promise.resolve({ hongkong: now }) });
            } else if (url.includes('hongkong')) {
                return Promise.resolve({ json: () => Promise.resolve([{ id: 'twl', colour: '#bbbbbb' }]) });
            } else {
                return Promise.resolve({ status: 404, json: () => Promise.reject('404 Not Found') });
            }
        });

        // happy flow
        expect(await updateTheme(['hongkong', 'twl', '#aaaaaa', MonoColour.white])).toEqual([
            'hongkong',
            'twl',
            '#bbbbbb',
            '#fff',
        ]);
        expect(await updateTheme(['hongkong', 'twl', '#aaaaaa', MonoColour.white], now + 13 * 60 * 60_000)).toEqual([
            'hongkong',
            'twl',
            '#aaaaaa',
            '#fff',
        ]);
        expect(mockFetch).toBeCalledTimes(2); // hongkong.json and history.json

        // no update for customised theme
        expect(await updateTheme(['other', 'other', '#cccccc', MonoColour.white])).toEqual([
            'other',
            'other',
            '#cccccc',
            '#fff',
        ]);
        expect(mockFetch).toBeCalledTimes(2); // no call to other.json

        // throw error or not if failed to update
        expect(await updateTheme(['guangzhou', 'gz1', '#aaaaaa', MonoColour.white])).toEqual([
            'guangzhou',
            'gz1',
            '#aaaaaa',
            '#fff',
        ]);
        try {
            await updateTheme(['guangzhou', 'gz1', '#aaaaaa', MonoColour.white], now, true);
        } catch (e) {
            expect(e).toContain('404 Not Found');
        }
        expect(mockFetch).toBeCalledTimes(4); // attempted twice as no cache
    });
});
