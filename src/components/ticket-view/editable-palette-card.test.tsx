import { createTestStore } from '../../setupTests';
import { PaletteEntryWithTranslationEntry, TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { setPantoneReady } from '../../redux/app/app-slice';
import { userEvent } from '@testing-library/user-event';
import rootReducer from '../../redux';
import EditablePaletteCard from './editable-palette-card';

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

describe('EditablePaletteCard', () => {
    const user = userEvent.setup();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Can hide pantone input if pantone service is not ready', async () => {
        const mockStore = createTestStore();
        render(<EditablePaletteCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });
        await user.click(screen.getByRole('button', { name: 'Edit' }));

        // only rgb is available
        expect(screen.queryByRole('switch', { name: 'Use Pantone®' })).not.toBeInTheDocument();
        expect(screen.getByLabelText('Background colour')).not.toBeDisabled();
        expect(screen.queryByRole('textbox', { name: 'Pantone® code' })).not.toBeInTheDocument();

        await act(async () => {
            mockStore.dispatch(setPantoneReady(true));
        });

        // colour mode switch is available
        expect(screen.getByRole('switch', { name: 'Use Pantone®' })).toBeInTheDocument();
        expect(screen.getByLabelText('Background colour')).toBeDisabled();
        expect(screen.getByRole('textbox', { name: 'Pantone® code' })).toBeInTheDocument();
    });

    it('Can clear pantone field when manually selecting colour', async () => {
        const mockStore = createTestStore({
            app: {
                ...realStore.app,
                pantoneReady: true,
            },
        });
        render(<EditablePaletteCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });
        await user.click(screen.getByRole('button', { name: 'Edit' }));

        await user.click(screen.getByRole('switch', { name: 'Use Pantone®' }));
        fireEvent.input(screen.getByLabelText('Background colour'), {
            target: { value: '#aaaaaa' },
        });
        await waitFor(() => expect(mockCallbacks.onUpdate).toBeCalledTimes(1));
        expect(mockCallbacks.onUpdate).toBeCalledWith({ pantone: undefined, colour: '#aaaaaa' });
    });
});
