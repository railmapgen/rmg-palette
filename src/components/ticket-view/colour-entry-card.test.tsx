import { createTestStore } from '../../setupTests';
import { PaletteEntryWithTranslationEntry, TranslationEntry } from '../../redux/ticket/util';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { render } from '../../test-utils';
import ColourEntryCard from './colour-entry-card';
import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { setPantoneReady } from '../../redux/app/app-slice';

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
});
