import { createStore } from './redux';
import { TextEncoder } from 'util';
import crypto from 'node:crypto';
import { setupTest } from '@railmapgen/mantine-components/utils';

setupTest();
export const createTestStore = createStore;

const originalFetch = global.fetch;
global.fetch = vi.fn().mockImplementation((...args: any[]) => {
    if (args[0].includes('/info.json')) {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => import('../info.json').then(module => module.default),
        }) as any;
    } else if (args[0].includes('amazonaws.com')) {
        return Promise.resolve({
            json: () => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            data: { getColor: { hex: 'aaaaaa' } },
                        });
                    }, 200);
                });
            },
        });
    } else if (args[0].includes('resources/palettes')) {
        const file = args[0].split('/').at(-1);
        return Promise.resolve({
            json: () => import('../public/resources/palettes/' + file).then(module => module.default),
        });
    } else {
        return originalFetch(args[0], args[1]);
    }
});

global.window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
});

global.TextEncoder = TextEncoder;
vi.stubGlobal('crypto', crypto);
// vi.stubGlobal('ResizeObserver', ResizeObserverPolyfill);
Element.prototype.scrollIntoView = vi.fn();
