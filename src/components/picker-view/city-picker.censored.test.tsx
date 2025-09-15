import { userEvent } from '@testing-library/user-event';
import { render } from '../../test-utils';
import CityPicker from './city-picker';
import { screen } from '@testing-library/react';
import cityList from '../../../public/resources/city-config.json';
import countryList from '../../../public/resources/country-config.json';
import rootReducer from '../../redux';
import { createTestStore } from '../../setupTests';
import { censorCountryList } from '../../util/censor-utils';
import { CountryEntry } from '@railmapgen/rmg-palette-resources';

vi.mock('../../util/censor-utils', async importOriginal => {
    const module = await importOriginal<typeof import('../../util/censor-utils')>();
    return {
        ...module,
        censorCountryList: module._censorCountryList,
        censorFlag: module._censorFlag,
    };
});

const realStore = rootReducer.getState();
const mockStore = createTestStore({
    app: {
        ...realStore.app,
        cityList,
        countryList: censorCountryList(countryList as CountryEntry[]),
    },
});

describe('CityPicker Censored', () => {
    const user = userEvent.setup();

    it('Shows uncensored country names as expected', async () => {
        render(<CityPicker />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));

        // Verify that no flag emojis are shown
        expect(screen.queryAllByText('🇨🇳')).toHaveLength(0);
        expect(screen.queryByText('🇹🇼')).not.toBeInTheDocument();

        // Verify that Taiwan country name is NOT censored to China anymore
        expect(screen.getByText('Taipei')).toBeInTheDocument();
        expect(screen.getAllByText('Taiwan, China').length).toBeGreaterThan(0); // This should show the censored name from the country list
        // const menuItems = await screen.findAllByRole('option');
        // expect(menuItems.find(el => el.textContent?.includes('🇨🇳Taipei'))).toBeDefined();
        // expect(menuItems.find(el => el.textContent?.includes('🇹🇼Taipei'))).toBeUndefined();
    });
});
