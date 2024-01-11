import { createTestStore } from '../../setupTests';
import { PaletteEntryWithTranslationEntry, TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import ColourEntryCard from './colour-entry-card';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { setPantoneReady } from '../../redux/app/app-slice';
import { userEvent } from '@testing-library/user-event';
import rootReducer from '../../redux';

const realStore = rootReducer.getState();

const initialTranslation: TranslationEntry[] = [['en', '']];

const mockLineDetail: PaletteEntryWithTranslationEntry = {
    id: '002',
    nameEntity: initialTranslation,
    colour: '#F2A900',
    fg: MonoColour.black,
    pantone: '130 C',
};

const mockCallbacks = {
    onUpdate: vi.fn(),
};

describe('ColourEntryCard', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Can hide pantone input if pantone service is not ready', async () => {
        const mockStore = createTestStore();
        render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

        // only rgb is available
        expect(screen.queryByRole('group', { name: 'Use Pantone®' })).not.toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Background colour' })).not.toBeDisabled();
        expect(screen.queryByRole('group', { name: 'Pantone® code' })).not.toBeInTheDocument();

        await act(async () => {
            mockStore.dispatch(setPantoneReady(true));
        });

        // colour mode switch is available
        expect(screen.getByRole('group', { name: 'Use Pantone®' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Background colour' })).toBeDisabled();
        expect(screen.getByRole('group', { name: 'Pantone® code' })).toBeInTheDocument();
    });

    it('Can clear pantone field when manually selecting colour', async () => {
        const user = userEvent.setup();

        const mockStore = createTestStore({
            app: {
                ...realStore.app,
                pantoneReady: true,
            },
        });
        render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

        await user.click(screen.getByRole('checkbox', { name: 'No' }));
        fireEvent.input(screen.getByLabelText('Background colour', { selector: 'input' }), {
            target: { value: '#aaaaaa' },
        });
        await waitFor(() => expect(mockCallbacks.onUpdate).toBeCalledTimes(1));
        expect(mockCallbacks.onUpdate).toBeCalledWith({ pantone: undefined, colour: '#aaaaaa' });
    });
});
