import { render } from '../../test-utils';
import MultiLangEntryCard from './multi-lang-entry-card';
import { screen, within } from '@testing-library/react';
import { TranslationEntry } from '../../redux/ticket/util';

const mockEntries: TranslationEntry[] = [
    ['en', 'Hong Kong'],
    ['zh-Hant', '香港'],
];

const mockCallbacks = {
    onUpdate: vi.fn(),
    onLangSwitch: vi.fn(),
    onRemove: vi.fn(),
};

describe('MultiLangEntryCard', () => {
    it('Has accessible name of fields', () => {
        render(<MultiLangEntryCard entries={mockEntries} {...mockCallbacks} />);

        const stack1 = screen.getByTestId('entry-card-stack-en');
        expect(within(stack1).getByRole('textbox', { name: 'Language' })).toBeInTheDocument();
        expect(within(stack1).getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    });

    it('Can display add button at the last entry', () => {
        render(<MultiLangEntryCard entries={mockEntries} {...mockCallbacks} />);

        const stack1 = screen.getByTestId('entry-card-stack-en');
        expect(
            within(stack1).queryByRole('button', { name: 'Add a name in another language' })
        ).not.toBeInTheDocument();
        expect(within(stack1).getByRole('button', { name: 'Remove this name' })).toBeInTheDocument();

        const stack2 = screen.getByTestId('entry-card-stack-zh-Hant');
        expect(within(stack2).getByRole('button', { name: 'Add a name in another language' })).toBeInTheDocument();
        expect(within(stack2).getByRole('button', { name: 'Remove this name' })).toBeInTheDocument();
    });
});
