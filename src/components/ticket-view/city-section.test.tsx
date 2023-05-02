import { render } from '../../test-utils';
import CitySection from './city-section';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';
import { CountryCode } from '@railmapgen/rmg-palette-resources';

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({ ...realStore, ticket: { ...realStore.ticket, country: CountryCode.CN } });

describe('CitySection', () => {
    afterEach(() => {
        mockStore.clearActions();
    });

    it('Can populate ticket when selecting an existing city', async () => {
        render(<CitySection />, { store: mockStore });

        // select guangzhou
        fireEvent.change(screen.getByRole('combobox', { name: 'City' }), { target: { value: 'guangzhou' } });
        await waitFor(() => expect(mockStore.getActions()).toHaveLength(1));

        const actions = mockStore.getActions();
        expect(actions).toContainEqual(
            expect.objectContaining({
                type: 'ticket/populateTicket',
                payload: expect.objectContaining({
                    city: expect.objectContaining({
                        id: 'guangzhou',
                        country: 'CN',
                    }),
                }),
            })
        );
    });

    it('Can clear lines when adding a new city', () => {
        render(<CitySection />, { store: mockStore });

        // select new
        fireEvent.change(screen.getByRole('combobox', { name: 'City' }), { target: { value: 'new' } });

        const actions = mockStore.getActions();
        expect(actions).toHaveLength(1);
        expect(actions).toContainEqual({ type: 'ticket/clearLines' });
    });
});
