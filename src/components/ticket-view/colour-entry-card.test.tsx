import rootReducer, { RootStore } from '../../redux';
import { createTestStore } from '../../setupTests';
import { PaletteEntryWithTranslationEntry, TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import ColourEntryCard from './colour-entry-card';
import { act, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { setPantoneReady } from '../../redux/app/app-slice';

const initialTranslation: TranslationEntry[] = [['en', '']];

const realStore = rootReducer.getState();
let mockStore: RootStore;

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
const mockFetch = vi.fn();
const originalFetch = global.fetch;

describe('ColourEntryCard', () => {
    describe('ColourEntryCard - rerender', () => {
        it('Can hide pantone input if pantone service is not ready', async () => {
            const mockStore = createTestStore();
            render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

            // only rgb is available
            expect(screen.queryByRole('group', { name: 'Use Pantone' })).not.toBeInTheDocument();
            expect(screen.getByRole('combobox', { name: 'Background colour' })).not.toBeDisabled();
            expect(screen.queryByRole('group', { name: 'Pantone code' })).not.toBeInTheDocument();

            await act(async () => {
                mockStore.dispatch(setPantoneReady(true));
            });

            // colour mode switch is available
            expect(screen.getByRole('group', { name: 'Use Pantone' })).toBeInTheDocument();
            expect(screen.getByRole('combobox', { name: 'Background colour' })).toBeDisabled();
            expect(screen.getByRole('group', { name: 'Pantone code' })).toBeInTheDocument();
        });
    });

    describe('ColourEntryCard - Pantone input', () => {
        beforeEach(() => {
            mockStore = createTestStore({
                app: {
                    ...realStore.app,
                    pantoneReady: true,
                },
            });
        });

        afterEach(() => {
            global.fetch = originalFetch;
            vi.resetAllMocks();
            vi.clearAllTimers();
        });

        it('Can fetch pantone colour and save to store', async () => {
            global.fetch = mockFetch.mockResolvedValue({
                json: () => Promise.resolve({ data: { getColor: { hex: '00629B' } } }),
            });
            render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

            vi.useFakeTimers();
            fireEvent.change(screen.getByRole('combobox', { name: 'Pantone code' }), { target: { value: '3015 C' } });
            await act(async () => {
                vi.advanceTimersByTime(1501);
            });

            expect(mockFetch).toBeCalledTimes(1);

            expect(mockCallbacks.onUpdate).toBeCalledTimes(1);
            expect(mockCallbacks.onUpdate).toBeCalledWith({ pantone: '3015 C', colour: '#00629B' });
        });

        it('Do not update store if pantone colour is failed to fetch', async () => {
            global.fetch = mockFetch.mockRejectedValue('Failed to fetch');
            const prevState = mockStore.getState().ticket;
            render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

            vi.useFakeTimers();
            fireEvent.change(screen.getByRole('combobox', { name: 'Pantone code' }), { target: { value: '3015 C' } });
            await act(async () => {
                vi.advanceTimersByTime(1501);
            });

            expect(mockFetch).toBeCalledTimes(1);

            expect(mockStore.getState().ticket).toEqual(prevState);
            expect(screen.getByRole('combobox', { name: 'Pantone code' })).toHaveValue('130 C');
        });
    });
});
