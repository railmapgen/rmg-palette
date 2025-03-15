import { render } from '../../test-utils';
import CountrySection from './country-section';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('CountrySection', () => {
    const user = userEvent.setup();

    it('Can show custom country code and name fields if add a country option is selected', async () => {
        render(<CountrySection />);

        const countrySelect = screen.getByRole('combobox', { name: 'Country/Region' });
        expect(countrySelect).toHaveDisplayValue('Please select...');
        expect(screen.getAllByRole('textbox')).toHaveLength(2);

        await user.selectOptions(countrySelect, 'Add a country/region...');

        // custom country code and multi-language name input exists
        expect(screen.getByRole('textbox', { name: 'Country/region code' })).toBeInTheDocument();
        expect(screen.getAllByRole('textbox', { name: 'Language' }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole('textbox', { name: 'Name' }).length).toBeGreaterThan(0);
    });
});
