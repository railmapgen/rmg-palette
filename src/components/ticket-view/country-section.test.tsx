import React from 'react';
import { TestingProvider } from '../../test-utils';
import CountrySection from './country-section';
import { render, screen } from '@testing-library/react';
import rootReducer from '../../redux';
import { createMockRootStore } from '../../setupTests';

const realStore = rootReducer.getState();
const mockStore = createMockRootStore({ ...realStore });

describe('CountrySection', () => {
    it('Can show custom country code and name fields if add a country option is selected', () => {
        const { rerender } = render(
            <TestingProvider store={mockStore}>
                <CountrySection />
            </TestingProvider>
        );

        expect(screen.queryByDisplayValue(/Add a new country/)).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', { name: 'Country code' })).not.toBeInTheDocument();

        const mockStoreWithNewCountry = createMockRootStore({
            ...realStore,
            ticket: {
                ...realStore.ticket,
                country: 'new',
            },
        });

        rerender(
            <TestingProvider store={mockStoreWithNewCountry}>
                <CountrySection />
            </TestingProvider>
        );

        // 'add a country' selected
        expect(screen.getByDisplayValue(/Add a country/)).toBeInTheDocument();

        // custom country code and multi-language name input exists
        expect(screen.getByRole('combobox', { name: 'Country/region code' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Language' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Name' })).toBeInTheDocument();
    });
});
