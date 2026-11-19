import { describe, afterEach, it } from 'node:test';
import assert from 'node:assert';
import { isUpdateRequired, updateTheme } from './updater.ts';
import { MonoColour } from './types.ts';
import { _clearCache } from './cached-fetch.ts';

describe('Updater', () => {
    afterEach(() => {
        _clearCache();
    });

    it('Can determine whether update is required based on last check time', async t => {
        const now = new Date().getTime();
        const mockFetch = t.mock.method(global, 'fetch', async () => ({
            json: () => Promise.resolve({ hongkong: now }),
        }));

        assert.ok(await isUpdateRequired('hongkong', now));
        assert.ok(await isUpdateRequired('hongkong', now + 11 * 60 * 60_000)); // half day buffer
        assert.equal(await isUpdateRequired('hongkong', now + 13 * 60 * 60_000), false);
        assert.ok(await isUpdateRequired('guangzhou', now));
        assert.ok(await isUpdateRequired('guangzhou', now + 24 * 60 * 60_000)); // update history not maintained

        // cached call
        assert.equal(mockFetch.mock.callCount(), 1);
    });

    it('Can update theme or throw error as expected', async t => {
        const now = new Date().getTime();
        const mockFetch = t.mock.method(global, 'fetch', async (url: string) => {
            if (url.includes('history')) {
                return { json: () => Promise.resolve({ hongkong: now }) };
            } else if (url.includes('hongkong')) {
                return { json: () => Promise.resolve([{ id: 'twl', colour: '#bbbbbb' }]) };
            } else {
                return { status: 404, json: () => Promise.reject('404 Not Found') };
            }
        });

        // happy flow
        assert.deepEqual(await updateTheme(['hongkong', 'twl', '#aaaaaa', MonoColour.white]), [
            'hongkong',
            'twl',
            '#bbbbbb',
            '#fff',
        ]);
        assert.deepEqual(await updateTheme(['hongkong', 'twl', '#aaaaaa', MonoColour.white], now + 13 * 60 * 60_000), [
            'hongkong',
            'twl',
            '#aaaaaa',
            '#fff',
        ]);
        assert.equal(mockFetch.mock.callCount(), 2); // hongkong.json and history.json

        // no update for customised theme
        assert.deepEqual(await updateTheme(['other', 'other', '#cccccc', MonoColour.white]), [
            'other',
            'other',
            '#cccccc',
            '#fff',
        ]);
        assert.equal(mockFetch.mock.callCount(), 2); // no call to other.json

        // throw error or not if failed to update
        assert.deepEqual(await updateTheme(['guangzhou', 'gz1', '#aaaaaa', MonoColour.white]), [
            'guangzhou',
            'gz1',
            '#aaaaaa',
            '#fff',
        ]);
        await assert.rejects(
            async () => updateTheme(['guangzhou', 'gz1', '#aaaaaa', MonoColour.white], now, true),
            /404 Not Found/
        );
        assert.equal(mockFetch.mock.callCount(), 4); // attempted twice as no cache
    });
});
