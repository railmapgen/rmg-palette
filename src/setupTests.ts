import { createStore } from './redux';
import { TextEncoder } from 'util';
import { vi } from 'vitest';
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
global.fetch = (...args) => {
    if (args[0].toString().includes('/info.json')) {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () =>
                Promise.resolve({
                    component: 'rmg-palette',
                    version: '9.9.9',
                    environment: 'DEV',
                    instance: 'localhost',
                }),
        }) as any;
    } else if (args[0].toString().includes('amazonaws.com')) {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    data: { getColor: { hex: 'aaaaaa' } },
                }),
        });
    } else {
        return originalFetch(...args);
    }
};

global.TextEncoder = TextEncoder;
vi.stubGlobal('crypto', crypto);
