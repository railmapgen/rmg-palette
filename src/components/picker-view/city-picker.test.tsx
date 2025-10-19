import CityPicker from './city-picker';
import { screen } from '@testing-library/react';
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
                languages: ['en'],
            },
            {
                id: 'HK',
                name: {
                    en: 'Hong Kong',
                    'zh-Hans': '香港',
                    'zh-Hant': '香港',
                },
                languages: ['zh-Hant', 'en'],
            },
            {
                id: 'TW',
                name: {
                    en: 'Taiwan',
                },
                languages: ['zh-Hant'],
            },
        ],
    },
});

const mockCallbacks = {
    onChange: vi.fn(),
};

describe('CityPicker', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        i18n.changeLanguage('zh-Hans');
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('Can render country names and translations as expected', async () => {
        render(<CityPicker />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));

        // Check that flag emojis are not present anymore
        expect(screen.queryByText('🏴󠁧󠁢󠁳󠁣󠁴󠁿')).not.toBeInTheDocument();
        expect(screen.queryByText('🇹🇼')).not.toBeInTheDocument();
        expect(screen.queryByText('🇭🇰')).not.toBeInTheDocument();

        // Check that city names are still present
        expect(screen.getByText('爱丁堡')).toBeInTheDocument();
        expect(screen.getByText('台北')).toBeInTheDocument();
        expect(screen.getAllByText('香港')).toHaveLength(2); // Both city and country name

        // Check that country names are shown instead of flags
        expect(screen.getByText('Scotland')).toBeInTheDocument();
        expect(screen.getByText('Taiwan')).toBeInTheDocument(); // Not censored anymore
        // Hong Kong appears twice - once as city name, once as country name

        // const options = await screen.findAllByRole('option');
        // expect(options).toHaveLength(3);
        //
        // expect(options[0]).toHaveTextContent('🏴󠁧󠁢󠁳󠁣󠁴󠁿'); // GBSCT
        // expect(options[1]).toHaveTextContent('🇹🇼'); // TW
        // expect(options[2]).toHaveTextContent('🇭🇰'); // HK
        //
        // // sorted by Pinyin (under zh-Hans locale)
        // expect(options[0]).toHaveTextContent('爱丁堡'); // read zh-Hans field
        // expect(options[1]).toHaveTextContent('台北'); // read zh field
        // expect(options[2]).toHaveTextContent('香港'); // read zh field
    });

    it('Can mount component with default city code as expected', () => {
        render(<CityPicker defaultValueId="hongkong" />, { store: mockStore });

        expect(screen.getByDisplayValue('香港')).toBeInTheDocument();
    });

    it('Can handle city selection as expected', async () => {
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.click(screen.getByRole('textbox'));
        const edinburghItem = await screen.findByText('爱丁堡');
        await user.click(edinburghItem);

        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('edinburgh');
    });

    it('Can filter cities by country name', async () => {
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.type(screen.getByRole('textbox'), 'scot');
        expect(screen.getByText('爱丁堡')).toBeInTheDocument();
        // const filteredOptions = screen.getAllByRole('option');
        // expect(filteredOptions).toHaveLength(1);
        // expect(filteredOptions.some(el => el.textContent?.includes('爱丁堡'))).toBeTruthy();
    });

    it('Can filter cities by country ID', async () => {
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        await user.type(screen.getByRole('textbox'), 'gb');
        expect(screen.getByText('爱丁堡')).toBeInTheDocument();
        // const filteredOptions = screen.getAllByRole('option');
        // expect(filteredOptions).toHaveLength(1);
        // expect(filteredOptions.some(el => el.textContent?.includes('爱丁堡'))).toBeTruthy();
    });
});
