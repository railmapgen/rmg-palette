import { render } from '../../test-utils';
import CitySection from './city-section';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import rootReducer, { RootStore } from '../../redux';
import { createTestStore } from '../../setupTests';
import { vi } from 'vitest';

const realStore = rootReducer.getState();
let mockStore: RootStore;

const originalFetch = global.fetch;
const mockFetch = vi.fn();

describe('CitySection', () => {
    beforeEach(() => {
        mockStore = createTestStore({
            app: {
                ...realStore.app,
                cityList: [
                    {
                        id: 'guangzhou',
                        country: 'CN',
                        name: {
                            en: 'Guangzhou',
                        },
                    },
                ],
            },
            ticket: { ...realStore.ticket, country: 'CN' },
        });
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
        await waitFor(() => expect(mockStore.getState().ticket.city).toBe('guangzhou'));
    });

    it('Can clear lines when adding a new city', async () => {
        render(<CitySection />, { store: mockStore });

        // select new
        fireEvent.change(screen.getByRole('combobox', { name: 'City' }), { target: { value: 'new' } });
        await waitFor(() => expect(mockStore.getState().ticket.city).toBe('new'));
    });
});
