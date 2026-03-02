import { render } from '../../test-utils';
import ColourModal from './colour-modal';
import { createTestStore } from '../../setupTests';
import rootReducer from '../../redux';
import { userEvent } from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { expect } from 'vitest';

const mockCallbacks = {
    onClose: vi.fn(),
    onSubmit: vi.fn(),
};

const realStore = rootReducer.getState();
const mockStore = createTestStore({
    app: {
        ...realStore.app,
        cityList: [
            { id: 'guangzhou', country: 'CN', name: { en: 'Guangzhou' } },
            {
                id: 'other',
                country: 'UN',
                name: { en: 'Customise' },
            },
        ],
        pantoneReady: true,
        recentlyUsed: [
            {
                theme: ['guangzhou', 'gz2', '#385f87', MonoColour.white],
            },
        ],
    },
});

describe('ColourModal', () => {
    const user = userEvent.setup();

    it('Pantone input end-to-end', async () => {
        render(<ColourModal {...mockCallbacks} />, { store: mockStore });

        // by default pantone input is hidden
        expect(screen.getByRole('radio', { name: 'RGB' })).toBeChecked();
        expect(screen.queryByRole('textbox', { name: 'Pantone® code' })).not.toBeInTheDocument();

        // pantone input field is shown after selected as input mode
        await user.click(screen.getByRole('radio', { name: 'Pantone®' }));
        const pantoneInput = screen.getByRole('textbox', { name: 'Pantone® code' });
        expect(pantoneInput).toBeInTheDocument();

        // input pantone code and fields changed to customised
        await user.clear(pantoneInput);
        await user.type(pantoneInput, '129 C');
        await waitFor(() => expect(pantoneInput).toBeDisabled(), { timeout: 1501 });
        await waitFor(() => expect(pantoneInput).toBeEnabled());
        await waitFor(() => expect(screen.getByRole('textbox', { name: 'Line' })).toHaveDisplayValue('Customise'));

        // apply history will reset colour mode
        await user.click(screen.getByRole('button', { name: /^Apply/ }));
        expect(screen.getByRole('radio', { name: 'RGB' })).toBeChecked();
        expect(pantoneInput).not.toBeInTheDocument();
    });

    it('Keyboard users selecting from palette end-to-end', async () => {
        render(<ColourModal {...mockCallbacks} />, { store: mockStore });

        await user.tab(); // focus
        const cityInput = screen.getByRole('textbox', { name: 'City' });
        expect(cityInput).toHaveFocus();

        await user.keyboard('o'); // type to search
        await user.keyboard('[ArrowDown][ArrowDown]'); // navigate
        await user.keyboard('[Enter]'); // select
        expect(cityInput).toHaveDisplayValue('Customise');

        await user.tab(); // focus
        const lineInput = screen.getByRole('textbox', { name: 'Line' });
        expect(lineInput).toHaveFocus();

        await user.keyboard('[ArrowDown]'); // navigate
        await user.keyboard('[Enter]'); // select
        expect(lineInput).toHaveDisplayValue('Customise');

        await user.keyboard('[Enter]'); // submit
        expect(mockCallbacks.onSubmit).toBeCalledTimes(1);
    });
});
