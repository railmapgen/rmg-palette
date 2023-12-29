import { createStore } from './redux';
import { TextEncoder } from 'util';
import crypto from 'node:crypto';

export const createTestStore = createStore;

class BroadcastChannel {
    postMessage() {
        // mocked
    }

    onmessage() {
        // mocked
    }
}

global.BroadcastChannel = BroadcastChannel as any;

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
            json: () =>
                Promise.resolve({
                    data: { getColor: { hex: 'aaaaaa' } },
                }),
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

global.TextEncoder = TextEncoder;
vi.stubGlobal('crypto', crypto);
