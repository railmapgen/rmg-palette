import CityPicker from './city-picker';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import i18n from '../../i18n/config';
import { render } from '../../test-utils';
import rootReducer from '../../redux';
import { createTestStore } from '../../setupTests';

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

    it('Can render flag emojis (for non-Windows users) and translations as expected', async () => {
        render(<CityPicker />, { store: mockStore });

        fireEvent.focus(screen.getByRole('combobox'));
        await screen.findByRole('dialog');

        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems).toHaveLength(3);

        expect(menuItems[0]).toHaveTextContent('🏴󠁧󠁢󠁳󠁣󠁴󠁿'); // GBSCT
        expect(menuItems[1]).toHaveTextContent('🏴'); // TW to be censored
        expect(menuItems[2]).toHaveTextContent('🇭🇰'); // HK

        // sorted by Pinyin (under zh-Hans locale)
        expect(menuItems[0]).toHaveTextContent('爱丁堡'); // read zh-Hans field
        expect(menuItems[1]).toHaveTextContent('台北'); // read zh field
        expect(menuItems[2]).toHaveTextContent('香港'); // read zh field
    });

    it('Can mount component with default city code as expected', () => {
        render(<CityPicker defaultValueId={'hongkong' as any} />, { store: mockStore });

        expect(screen.getByDisplayValue('香港')).toBeInTheDocument();
    });

    it('Can handle city selection as expected', async () => {
        render(<CityPicker {...mockCallbacks} />, { store: mockStore });

        fireEvent.focus(screen.getByRole('combobox'));
        await screen.findByRole('dialog');

        fireEvent.click(screen.getByRole('menuitem', { name: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 爱丁堡' }));

        expect(mockCallbacks.onChange).toBeCalledTimes(1);
        expect(mockCallbacks.onChange).toBeCalledWith('edinburgh');

        expect(screen.getByDisplayValue('爱丁堡')).toBeInTheDocument();
    });

    // TODO: isSettled
});
