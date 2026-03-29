import ColourPicker from './colour-picker';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import { userEvent } from '@testing-library/user-event';

const mockCallbacks = {
    onChange: vi.fn(),
};

const setup = () => render(<ColourPicker city="guangzhou" {...mockCallbacks} />);

describe('ColourPicker', () => {
    const user = userEvent.setup();

    afterEach(() => {
        vi.clearAllMocks();
    });

    // FIXME: why is it not working??
    it.skip('Can render line badges inside menu item as expected', async () => {
        setup();

        await user.click(screen.getByRole('textbox'));
        expect(screen.getByText('Line 1').closest('.mantine-Badge-root')).toHaveStyle({
            background: '#F3D03E',
            color: '#000000',
        });
        expect(screen.getByText('Line 2').closest('.mantine-Badge-root')).toHaveStyle({
            background: '#00629B',
            color: '#FFFFFF',
        });
    });

    it('Can handle invalid city prop as expected', async () => {
        const { rerender } = setup();

        await user.click(screen.getByRole('textbox'));
        await screen.findByText('Line 1');

        rerender(<ColourPicker city={undefined} {...mockCallbacks} />);

        expect(screen.getByRole('textbox', { name: 'Line' })).toBeDisabled();
        expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('Can search item by other languages and select item as expected', async () => {
        setup();

        const inputField = screen.getByRole('textbox');
        await user.type(inputField, '广佛');
        await waitFor(() => expect(screen.queryByRole('option', { name: 'Line 1' })).not.toBeInTheDocument());
        expect(screen.getByText('Guangfo Line')).toBeInTheDocument();

        await user.clear(inputField);
        await user.type(inputField, '海珠');
        await waitFor(() => expect(screen.queryByText('Guangfo Line')).not.toBeInTheDocument());
        const thz1Option = screen.getByText('THZ1 (Haizhu Tram Line 1)');
        expect(thz1Option).toBeInTheDocument();

        // select THZ1
        await user.click(thz1Option);
        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('thz1', '#61c013', '#fff', undefined);
    });

    it('Can reload list of palette when city prop is changed', async () => {
        const { rerender } = setup();

        await user.click(screen.getByRole('textbox'));
        expect(screen.getByText('Line 1')).toBeInTheDocument();

        rerender(<ColourPicker city="hongkong" {...mockCallbacks} />);

        // await user.click(screen.getByRole('textbox'));
        await waitFor(() => expect(screen.getByText('Tsuen Wan Line')).toBeInTheDocument());
        expect(screen.getByText('Kwun Tong Line')).toBeInTheDocument();
    });
});
