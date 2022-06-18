import React from 'react';
import { render } from '../../test-utils';
import MultiLangEntryCard from './multi-lang-entry-card';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';
import { screen, within } from '@testing-library/react';
import { translationEntityAdapter } from '../../redux/ticket/util';

const mockEntries = translationEntityAdapter.upsertMany(translationEntityAdapter.getInitialState(), [
    { id: '001', lang: LanguageCode.English, name: 'Hong Kong' },
    { id: '002', lang: LanguageCode.Chinese, name: '香港' },
]);

const mockCallbacks = {
    onUpdate: jest.fn(),
    onAdd: jest.fn(),
    onRemove: jest.fn(),
};

describe('MultiLangEntryCard', () => {
    it('Can hide label name of fields that does not belong to entry 1', () => {
        render(<MultiLangEntryCard entries={mockEntries} {...mockCallbacks} />);

        const stack1 = screen.getByTestId('entry-card-stack-001');
        const stack1Fields = within(stack1).getAllByRole('combobox');
        expect(stack1Fields).toHaveLength(2);
        expect(stack1Fields[0]).toHaveAccessibleName('Language');
        expect(stack1Fields[1]).toHaveAccessibleName('Name');

        const stack2 = screen.getByTestId('entry-card-stack-002');
        const stack2Fields = within(stack2).getAllByRole('combobox');
        expect(stack2Fields).toHaveLength(2);
        expect(stack2Fields[0]).toHaveAccessibleName('');
        expect(stack2Fields[1]).toHaveAccessibleName('');
    });

    it('Can display add button at the last entry', () => {
        render(<MultiLangEntryCard entries={mockEntries} {...mockCallbacks} />);

        const stack1 = screen.getByTestId('entry-card-stack-001');
        expect(within(stack1).queryByRole('button', { name: 'Add name in another language' })).not.toBeInTheDocument();
        expect(within(stack1).getByRole('button', { name: 'Remove name' })).toBeInTheDocument();

        const stack2 = screen.getByTestId('entry-card-stack-002');
        expect(within(stack2).getByRole('button', { name: 'Add name in another language' })).toBeInTheDocument();
        expect(within(stack2).getByRole('button', { name: 'Remove name' })).toBeInTheDocument();
    });
});
