import { render } from '../../test-utils';
import CountrySection from './country-section';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('CountrySection', () => {
    it('Can show custom country code and name fields if add a country option is selected', async () => {
        const user = userEvent.setup();
        render(<CountrySection />);

        expect(screen.queryByDisplayValue(/Add a new country/)).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox', { name: 'Country code' })).not.toBeInTheDocument();

        await user.selectOptions(screen.getByRole('combobox', { name: 'Country/Region' }), 'new');

        // 'add a country' selected
        expect(screen.getByDisplayValue(/Add a country/)).toBeInTheDocument();

        // custom country code and multi-language name input exists
        expect(screen.getByRole('combobox', { name: 'Country/region code' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Language' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Name' })).toBeInTheDocument();
    });
});
