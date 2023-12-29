import ColourPicker from './colour-picker';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import { userEvent } from '@testing-library/user-event';

const mockCallbacks = {
    onChange: vi.fn(),
};

const setup = () => render(<ColourPicker city="guangzhou" {...mockCallbacks} />);

describe('ColourPicker', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Can render line badges inside menu item as expected', async () => {
        setup();

        const line1Option = await screen.findByText('Line 1');
        expect(line1Option).toHaveStyle({ background: '#e7c148', color: '#000000' });
        expect(screen.getByText('Line 2')).toHaveStyle({ background: '#385f87', color: '#FFFFFF' });
    });

    it('Can handle invalid city prop as expected', async () => {
        const user = userEvent.setup();
        const { rerender } = setup();

        await user.click(screen.getByRole('combobox'));
        await screen.findByRole('menuitem', { name: 'Line 1' });

        rerender(<ColourPicker city={undefined} {...mockCallbacks} />);

        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    it('Can search item by other languages and select item as expected', async () => {
        const user = userEvent.setup();
        setup();

        const inputField = screen.getByRole('combobox');
        await user.type(inputField, '广佛');
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Line 1' })).not.toBeInTheDocument());
        expect(screen.getByRole('menuitem', { name: 'Guangfo Line' })).toBeInTheDocument();

        await user.clear(inputField);
        await user.type(inputField, '海珠');
        await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Guangfo Line' })).not.toBeInTheDocument());
        const thz1Option = screen.getByRole('menuitem', { name: 'THZ1' });
        expect(thz1Option).toBeInTheDocument();

        // select THZ1
        await user.click(thz1Option);
        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('thz1', '#6cb23d', '#fff', undefined);
    });

    it('Can reload list of palette when city prop is changed', async () => {
        const { rerender } = setup();

        await screen.findByText('Line 1');

        rerender(<ColourPicker city="hongkong" {...mockCallbacks} />);

        await screen.findByText('Tsuen Wan Line');
        await screen.findByText('Kwun Tong Line');
    });
});
