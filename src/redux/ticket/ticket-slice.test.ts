import rootReducer from '../index';
import ticketReducer, { removeCountryName, ticketSelectors, TicketState, updateCountryName } from './ticket-slice';
import { CountryCode, LanguageCode, MonoColour } from '@railmapgen/rmg-palette-resources';
import { TicketInvalidReason } from '../../util/constants';

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
                TicketInvalidReason.COUNTRY_CODE_UNDEFINED
            );

            initialState.country = 'new';
            expect(ticketSelectors.getCountryErrors(initialState)).toContain(
                TicketInvalidReason.COUNTRY_CODE_UNDEFINED
            );

            initialState.newCountry = 'HK';
            expect(ticketSelectors.getCountryErrors(initialState)).not.toContain(
                TicketInvalidReason.COUNTRY_CODE_UNDEFINED
            );
        });

        it('Can validate city code as expected', () => {
            const initialState: TicketState = { ...realStore.ticket, country: CountryCode.HK };
            expect(ticketSelectors.getCityErrors(initialState)).toContain(TicketInvalidReason.CITY_CODE_UNDEFINED);

            initialState.city = 'hongkong';
            expect(ticketSelectors.getCityErrors(initialState)).not.toContain(TicketInvalidReason.CITY_CODE_UNDEFINED);
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
                TicketInvalidReason.LINE_CODE_UNDEFINED
            );

            initialState.lines['id-001'].id = 'twl';
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).not.toContain(
                TicketInvalidReason.LINE_CODE_UNDEFINED
            );

            initialState.lines['id-002'] = { ...initialState.lines['id-001'] };
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).toContain(
                TicketInvalidReason.LINE_CODE_DUPLICATED
            );

            initialState.lines['id-002'].id = 'ktl';
            expect(ticketSelectors.getLineErrors(initialState)['Overall']).not.toContain(
                TicketInvalidReason.LINE_CODE_DUPLICATED
            );
        });
    });
});
