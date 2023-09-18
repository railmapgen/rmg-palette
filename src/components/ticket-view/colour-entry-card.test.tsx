import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';
import { PaletteEntryWithTranslationEntry, TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render, TestingProvider } from '../../test-utils';
import ColourEntryCard from './colour-entry-card';
import { act, fireEvent, render as originalRender, screen } from '@testing-library/react';
import { vi } from 'vitest';

const initialTranslation: TranslationEntry[] = [['en', '']];

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({
    ...realStore,
    app: {
        ...realStore.app,
        pantoneReady: true,
    },
});

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
        it('Can hide pantone input if pantone service is not ready', () => {
            const notReadyStore = createMockRootStore({
                ...realStore,
            });
            const { rerender } = originalRender(
                <TestingProvider store={notReadyStore}>
                    <ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />
                </TestingProvider>
            );

            // only rgb is available
            expect(screen.queryByRole('group', { name: 'Use Pantone' })).not.toBeInTheDocument();
            expect(screen.getByRole('combobox', { name: 'Background colour' })).not.toBeDisabled();
            expect(screen.queryByRole('group', { name: 'Pantone code' })).not.toBeInTheDocument();

            rerender(
                <TestingProvider store={mockStore}>
                    <ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />
                </TestingProvider>
            );

            // colour mode switch is available
            expect(screen.getByRole('group', { name: 'Use Pantone' })).toBeInTheDocument();
            expect(screen.getByRole('combobox', { name: 'Background colour' })).toBeDisabled();
            expect(screen.getByRole('group', { name: 'Pantone code' })).toBeInTheDocument();
        });
    });

    describe('ColourEntryCard - Pantone input', () => {
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
            render(<ColourEntryCard lineDetail={mockLineDetail} {...mockCallbacks} />, { store: mockStore });

            vi.useFakeTimers();
            fireEvent.change(screen.getByRole('combobox', { name: 'Pantone code' }), { target: { value: '3015 C' } });
            await act(async () => {
                vi.advanceTimersByTime(1501);
            });

            expect(mockFetch).toBeCalledTimes(1);
            const actions = mockStore.getActions();
            expect(actions).toHaveLength(0);

            expect(screen.getByRole('combobox', { name: 'Pantone code' })).toHaveValue('130 C');
        });
    });
});
