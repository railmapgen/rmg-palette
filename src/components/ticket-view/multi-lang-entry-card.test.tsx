import { render } from '../../test-utils';
import { vi } from 'vitest';
import MultiLangEntryCard from './multi-lang-entry-card';
import { screen, within } from '@testing-library/react';
import { translationEntityAdapter } from '../../redux/ticket/util';

const mockEntries = translationEntityAdapter.upsertMany(translationEntityAdapter.getInitialState(), [
    { id: '001', lang: 'en', name: 'Hong Kong' },
    { id: '002', lang: 'zh', name: '香港' },
]);

const mockCallbacks = {
    onUpdate: vi.fn(),
    onAdd: vi.fn(),
    onRemove: vi.fn(),
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
        expect(
            within(stack1).queryByRole('button', { name: 'Add a name in another language' })
        ).not.toBeInTheDocument();
        expect(within(stack1).getByRole('button', { name: 'Remove this name' })).toBeInTheDocument();

        const stack2 = screen.getByTestId('entry-card-stack-002');
        expect(within(stack2).getByRole('button', { name: 'Add a name in another language' })).toBeInTheDocument();
        expect(within(stack2).getByRole('button', { name: 'Remove this name' })).toBeInTheDocument();
    });
});
