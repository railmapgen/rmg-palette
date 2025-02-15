import rootReducer from '../../redux';
import { createTestStore } from '../../setupTests';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import RecentlyUsed from './recently-used';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const realStore = rootReducer.getState();
const testStore = createTestStore({
    app: {
        ...realStore.app,
        recentlyUsed: [
            { theme: ['guangzhou', 'gz1', '#F3D03E', MonoColour.black], displayName: 'Line 1' },
            { theme: ['guangzhou', 'gz2', '#385f87', MonoColour.white], displayName: 'Line 2' },
            { theme: ['guangzhou', 'gz2', '#e4904c', MonoColour.white], displayName: 'Line 3' },
        ],
    },
});

const mockCallbacks = {
    onApply: vi.fn(),
};

describe('RecentlyUsed', () => {
    const user = userEvent.setup();

    it('#1113 Support removing single item', async () => {
        render(<RecentlyUsed {...mockCallbacks} />, { store: testStore });
        expect(screen.getAllByRole('button', { name: /^Apply/ })).toHaveLength(3);

        // enter clearing mode
        await user.click(screen.getByRole('button', { name: 'Clear' }));

        // remove single
        await user.click(screen.getByRole('button', { name: 'Remove Line 2' }));
        expect(screen.getAllByRole('button', { name: /^Remove/ })).toHaveLength(2);
        {
            const nextRecentlyUsed = testStore.getState().app.recentlyUsed;
            expect(nextRecentlyUsed).toHaveLength(2);
            expect(nextRecentlyUsed[0].displayName).toBe('Line 1');
            expect(nextRecentlyUsed[1].displayName).toBe('Line 3');
        }

        // clear all
        await user.click(screen.getByRole('button', { name: 'Clear all' }));
        expect(screen.queryAllByRole('button', { name: /^Apply/ })).toHaveLength(0);
        {
            const nextRecentlyUsed = testStore.getState().app.recentlyUsed;
            expect(nextRecentlyUsed).toHaveLength(0);
        }
    });
});
