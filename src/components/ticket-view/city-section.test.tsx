import { render } from '../../test-utils';
import CitySection from './city-section';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';
import { vi } from 'vitest';

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({ ...realStore, ticket: { ...realStore.ticket, country: 'CN' } });

const originalFetch = global.fetch;
const mockFetch = vi.fn();

describe('CitySection', () => {
    afterEach(() => {
        mockStore.clearActions();
        vi.clearAllMocks();
        global.fetch = originalFetch;
    });

    beforeEach(() => {
        mockFetch.mockImplementation(url => {
            if (url.includes('guangzhou')) {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve([
                            {
                                id: 'gz1',
                                name: {
                                    en: 'Line 1',
                                    zh: '1号线',
                                },
                                colour: '#F3D03E',
                                fg: '#000',
                            },
                            {
                                id: 'gz2',
                                name: {
                                    en: 'Line 2',
                                    zh: '2号线',
                                },
                                colour: '#00629B',
                            },
                        ]),
                });
            } else {
                console.warn('Unhandled fetch:', url);
                return originalFetch(url);
            }
        });
        global.fetch = mockFetch;
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

    it('Can clear lines when adding a new city', async () => {
        render(<CitySection />, { store: mockStore });

        // select new
        fireEvent.change(screen.getByRole('combobox', { name: 'City' }), { target: { value: 'new' } });
        await waitFor(() => expect(mockStore.getActions()).toHaveLength(1));

        const actions = mockStore.getActions();
        expect(actions).toContainEqual({ type: 'ticket/setCity', payload: 'new' });
    });
});
