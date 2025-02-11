import { render } from '../../test-utils';
import { screen, waitFor } from '@testing-library/react';
import PantoneInput from './pantone-input';
import { userEvent } from '@testing-library/user-event';

const mockFetch = vi.fn();
const originalFetch = global.fetch;

const mockCallbacks = {
    onChange: vi.fn(),
};

describe('PantoneInput', () => {
    const user = userEvent.setup();

    afterEach(() => {
        global.fetch = originalFetch;
        vi.resetAllMocks();
        vi.clearAllTimers();
    });

    it('Can fetch pantone colour and fire onChange event', async () => {
        global.fetch = mockFetch.mockResolvedValue({
            json: () => Promise.resolve({ data: { getColor: { hex: '00629B' } } }),
        });

        render(<PantoneInput value="130 C" {...mockCallbacks} />);

        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, '3015 C');
        await waitFor(() => expect(mockFetch).toBeCalledTimes(1), { timeout: 2000 });

        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('3015 C', '#00629B');
    });

    it('Reset input field if pantone colour is failed to fetch', async () => {
        global.fetch = mockFetch.mockRejectedValue('Failed to fetch');

        render(<PantoneInput value="130 C" {...mockCallbacks} />);

        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, '3015 C');
        await waitFor(() => expect(mockFetch).toBeCalledTimes(1), { timeout: 1501 });

        expect(mockCallbacks.onChange).toBeCalledTimes(0);
        expect(input).toHaveValue('130 C');
    });
});
