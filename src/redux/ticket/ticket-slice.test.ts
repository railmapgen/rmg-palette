import rootReducer from '../index';
import ticketReducer, {
    populateTicket,
    removeCountryName,
    ticketSelectors,
    TicketState,
    updateCountryName,
} from './ticket-slice';
import {
    CityCode,
    CityEntry,
    CountryCode,
    LanguageCode,
    MonoColour,
    PaletteEntry,
} from '@railmapgen/rmg-palette-resources';
import { TicketInvalidReasonType } from '../../util/constants';

const realStore = rootReducer.getState();

describe('TicketSlice', () => {
    describe('TicketSlice - multi-language name mutation', () => {
        const initialState = {
            ...realStore.ticket,
            countryName: {
                entities: {
                    '001': { id: '001', lang: LanguageCode.English, name: 'Country' },
                    '002': { id: '002', lang: LanguageCode.Chinese, name: '國家' },
                },
                ids: ['001', '002'],
            },
        };

        it('Can update name in specific language as expected', () => {
            const nextState = ticketReducer(
                initialState,
                updateCountryName({
                    id: '002',
                    changes: { name: '国家' },
                })
            );

            expect(nextState.countryName.ids).toHaveLength(2);
            expect(nextState.countryName.entities).toHaveProperty(
                '002',
                expect.objectContaining({
                    lang: 'zh',
                    name: '国家',
                })
            );
        });

        it('Can change language of a name input as expected', () => {
            const nextState = ticketReducer(
                initialState,
                updateCountryName({
                    id: '002',
                    changes: { lang: LanguageCode.ChineseTrad },
                })
            );

            expect(nextState.countryName.ids).toHaveLength(2);
            expect(nextState.countryName.entities['002']).not.toHaveProperty('lang', 'zh');
            expect(nextState.countryName.entities['002']).toHaveProperty('lang', 'zh-Hant');
        });

        it('Can remove name in specific language as expected', () => {
            const nextState = ticketReducer(initialState, removeCountryName('002'));

            expect(nextState.countryName.ids).toHaveLength(1);
            expect(nextState.countryName).not.toHaveProperty('zh');
        });
    });

    describe('TicketSlice - validation', () => {
        it('Can validate country code as expected', () => {
            const initialState: TicketState = { ...realStore.ticket };
            expect(ticketSelectors.getCountryErrors(initialState)).toContain(
                TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED
            );

            initialState.country = 'new';
            expect(ticketSelectors.getCountryErrors(initialState)).toContain(
                TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED
            );

            initialState.newCountry = 'HK';
            expect(ticketSelectors.getCountryErrors(initialState)).not.toContain(
                TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED
            );
        });

        it('Can validate city code as expected', () => {
            const initialState: TicketState = { ...realStore.ticket, country: CountryCode.HK };
            expect(ticketSelectors.getCityErrors(initialState)).toContain(TicketInvalidReasonType.CITY_CODE_UNDEFINED);

            initialState.city = 'hongkong';
            expect(ticketSelectors.getCityErrors(initialState)).not.toContain(TicketInvalidReasonType.CITY_CODE_UNDEFINED);
        });

        it('Can validate line code as expected', () => {
            const initialState: TicketState = {
                ...realStore.ticket,
                country: CountryCode.HK,
                city: 'hongkong',
                lines: {
                    'id-001': {
                        id: '',
                        nameEntity: { ids: [], entities: {} },
                        colour: '#aaaaaa',
                        fg: MonoColour.white,
                    },
                },
            };
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).toContain(
                TicketInvalidReasonType.LINE_CODE_UNDEFINED
            );

            initialState.lines['id-001'].id = 'twl';
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).not.toContain(
                TicketInvalidReasonType.LINE_CODE_UNDEFINED
            );

            initialState.lines['id-002'] = { ...initialState.lines['id-001'] };
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).toContain(
                TicketInvalidReasonType.LINE_CODE_DUPLICATED
            );

            initialState.lines['id-002'].id = 'ktl';
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).not.toContain(
                TicketInvalidReasonType.LINE_CODE_DUPLICATED
            );
        });
    });

    describe('TicketSlice - populate city and palettes', () => {
        const mockCityEntry: CityEntry = {
            id: CityCode.Hongkong,
            country: 'HK',
            name: {
                en: 'Hong Kong',
                zh: '香港',
            },
        };
        const mockPaletteEntries: PaletteEntry[] = [
            {
                id: 'twl',
                name: {
                    en: 'Tsuen Wan Line',
                    'zh-Hans': '荃湾线',
                    'zh-Hant': '荃灣綫',
                },
                colour: '#E2231A',
            },
            {
                id: 'ktl',
                name: {
                    en: 'Kwun Tong Line',
                    'zh-Hans': '观塘线',
                    'zh-Hant': '觀塘綫',
                },
                colour: '#00AF41',
            },
        ];

        it('Can populate ticket with existing city and palettes as expected', () => {
            const initialState = { ...realStore.ticket };
            const nextState = ticketReducer(
                initialState,
                populateTicket({
                    city: mockCityEntry,
                    palettes: mockPaletteEntries,
                })
            );

            expect(nextState.country).toBe('HK');

            expect(nextState.city).toBe('hongkong');
            expect(nextState.cityName.ids).toHaveLength(2);
            expect(Object.values(nextState.cityName.entities)).toContainEqual(
                expect.objectContaining({
                    lang: 'en',
                    name: 'Hong Kong',
                })
            );

            expect(Object.keys(nextState.lines)).toHaveLength(2);
            expect(Object.values(nextState.lines)).toContainEqual(
                expect.objectContaining({
                    id: 'twl',
                    colour: '#E2231A',
                })
            );
            expect(Object.values(nextState.lines)).toContainEqual(
                expect.objectContaining({
                    id: 'ktl',
                    colour: '#00AF41',
                })
            );
        });
    });
});
