import CityPicker from './city-picker';
import { screen, within } from '@testing-library/react';
import i18n from '../../i18n/config';
import { render } from '../../test-utils';
import rootReducer from '../../redux';
import { createTestStore } from '../../setupTests';
import { userEvent } from '@testing-library/user-event';
import { CountryEntry } from '@railmapgen/rmg-palette-resources';

vi.mock('../../util/censor-utils', async importOriginal => {
    const module = await importOriginal<typeof import('../../util/censor-utils')>();
    return {
        ...module,
        censorCountryList: (countryList: CountryEntry[]) => countryList,
        censorFlag: (countryCode: string) => countryCode,
    };
});

const realStore = rootReducer.getState();
const mockStore = createTestStore({
    app: {
        ...realStore.app,
        cityList: [
            {
                id: 'edinburgh',
                country: 'GBSCT',
                name: {
                    en: 'Edinburgh',
                    'zh-Hans': '爱丁堡',
                    'zh-Hant': '愛丁堡',
                },
            },
            {
                id: 'hongkong',
                country: 'HK',
                name: {
                    en: 'Hong Kong',
                    'zh-Hans': '香港',
                    'zh-Hant': '香港',
                },
            },
            {
                id: 'taipei',
                country: 'TW',
                name: {
                    en: 'Taipei',
                    'zh-Hans': '台北',
                    'zh-Hant': '台北',
                },
            },
        ],
        countryList: [
            {
                id: 'GBSCT',
                name: {
                    en: 'Scotland',
                },
            },
            {
                id: 'HK',
                name: {
                    en: 'Hong Kong',
                    'zh-Hans': '香港',
                    'zh-Hant': '香港',
                },
            },
            {
                id: 'TW',
                name: {
                    en: 'Taiwan',
                },
            },
        ],
    },
});

const mockCallbacks = {
    onChange: vi.fn(),
};

describe('CityPicker', () => {
    beforeEach(() => {
        i18n.changeLanguage('zh-Hans');
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('Can render flag emojis and translations as expected', async () => {
        const user = userEvent.setup();
        render(<CityPicker />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));

        const menuItems = await screen.findAllByRole('menuitem');
        expect(menuItems).toHaveLength(3);

        expect(menuItems[0]).toHaveTextContent('🏴󠁧󠁢󠁳󠁣󠁴󠁿'); // GBSCT
        expect(menuItems[1]).toHaveTextContent('🇹🇼'); // TW
        expect(menuItems[2]).toHaveTextContent('🇭🇰'); // HK

        // sorted by Pinyin (under zh-Hans locale)
        expect(menuItems[0]).toHaveTextContent('爱丁堡'); // read zh-Hans field
        expect(menuItems[1]).toHaveTextContent('台北'); // read zh field
        expect(menuItems[2]).toHaveTextContent('香港'); // read zh field
    });

    it('Can mount component with default city code as expected', () => {
        render(<CityPicker defaultValueId="hongkong" />, { store: mockStore });

        expect(screen.getByDisplayValue('香港')).toBeInTheDocument();
    });

    it('Can handle city selection as expected', async () => {
        const user = userEvent.setup();
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));
        const edinburghItem = await screen.findByRole('menuitem', { name: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 爱丁堡' });
        await user.click(edinburghItem);

        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('edinburgh');

        expect(screen.getByDisplayValue('爱丁堡')).toBeInTheDocument();
    });

    it('Can filter cities by country name', async () => {
        const user = userEvent.setup();
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.type(screen.getByRole('textbox'), 'scot');
        const filteredOptions = screen.getAllByRole('menuitem');
        expect(filteredOptions).toHaveLength(1);
        expect(filteredOptions.some(el => el.textContent?.includes('爱丁堡'))).toBeTruthy();
    });

    it('Can filter cities by country ID', async () => {
        const user = userEvent.setup();
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.type(screen.getByRole('textbox'), 'gb');
        const filteredOptions = screen.getAllByRole('menuitem');
        expect(filteredOptions).toHaveLength(1);
        expect(filteredOptions.some(el => el.textContent?.includes('爱丁堡'))).toBeTruthy();
    });
});
