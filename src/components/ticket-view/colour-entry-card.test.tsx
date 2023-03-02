import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';
import { translationEntityAdapter } from '../../redux/ticket/util';
import { nanoid } from 'nanoid';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import ColourEntryCard from './colour-entry-card';
import { act, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

const initialTranslation = translationEntityAdapter.upsertOne(translationEntityAdapter.getInitialState(), {
    id: nanoid(),
    lang: 'en',
    name: '',
});

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({
    ...realStore,
    ticket: {
        ...realStore.ticket,
        lines: {
            '001': { id: '001', nameEntity: initialTranslation, colour: '#AAAAAA', fg: MonoColour.white },
            '002': {
                id: '002',
                nameEntity: initialTranslation,
                colour: '#F2A900',
                fg: MonoColour.black,
                pantone: '130 C',
            },
        },
    },
});

const mockFetch = vi.fn();
const originalFetch = global.fetch;

describe('ColourEntryCard', () => {
    describe('ColourEntryCard - rerender', () => {
        it('Can hide pantone input if pantone service is not ready', () => {
            const { rerender } = render(<ColourEntryCard entryId="002" pantoneReady={false} />, { store: mockStore });

            // only rgb is available
            expect(screen.queryByRole('group', { name: 'Colour mode' })).not.toBeInTheDocument();
            expect(screen.getByRole('group', { name: 'Background colour' })).toBeInTheDocument();
            expect(screen.queryByRole('group', { name: 'Pantone code' })).not.toBeInTheDocument();

            rerender(<ColourEntryCard entryId="002" pantoneReady={true} />);

            // colour mode switch is available
            expect(screen.getByRole('group', { name: 'Colour mode' })).toBeInTheDocument();
            expect(screen.queryByRole('group', { name: 'Background colour' })).not.toBeInTheDocument();
            expect(screen.getByRole('group', { name: 'Pantone code' })).toBeInTheDocument();
        });

        it('Can reset colour mode when selected line is changed', () => {
            const { rerender } = render(<ColourEntryCard entryId="002" pantoneReady={true} />, { store: mockStore });

            expect(screen.getByRole('checkbox', { name: 'Pantone' })).toBeChecked();
            expect(screen.getByRole('combobox', { name: 'Pantone code' })).toHaveValue('130 C');

            rerender(<ColourEntryCard entryId="001" pantoneReady={true} />);

            expect(screen.getByRole('checkbox', { name: 'RGB' })).toBeChecked();
        });
    });

    describe('ColourEntryCard - Pantone input', () => {
        afterEach(() => {
            global.fetch = originalFetch;
            vi.resetAllMocks();
            vi.clearAllTimers();
            mockStore.clearActions();
        });

        it('Can fetch pantone colour and save to store', async () => {
            global.fetch = mockFetch.mockResolvedValue({
                json: () => Promise.resolve({ data: { getColor: { hex: '00629B' } } }),
            });
            render(<ColourEntryCard entryId="002" pantoneReady={true} />, { store: mockStore });

            vi.useFakeTimers();
            fireEvent.change(screen.getByRole('combobox', { name: 'Pantone code' }), { target: { value: '3015 C' } });
            await act(async () => {
                vi.advanceTimersByTime(1501);
            });

            expect(mockFetch).toBeCalledTimes(1);

            const actions = mockStore.getActions();
            expect(actions).toContainEqual({
                type: 'ticket/updateLinePantone',
                payload: { entryId: '002', pantone: '3015 C', hex: '#00629B' },
            });
        });

        it('Do not update store if pantone colour is failed to fetch', async () => {
            global.fetch = mockFetch.mockRejectedValue('Failed to fetch');
            render(<ColourEntryCard entryId="002" pantoneReady={true} />, { store: mockStore });

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
