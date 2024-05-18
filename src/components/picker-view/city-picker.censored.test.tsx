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
    it('Can censor Taiwan flag emojis as expected', async () => {
        const user = userEvent.setup();
        render(<CityPicker />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));

        const menuItems = await screen.findAllByRole('menuitem');
        expect(menuItems.find(el => el.textContent?.includes('🇨🇳Taipei'))).toBeDefined();
        expect(menuItems.find(el => el.textContent?.includes('🇹🇼Taipei'))).toBeUndefined();
    });
});
