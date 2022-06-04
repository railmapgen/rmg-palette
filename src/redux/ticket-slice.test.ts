import rootReducer from './index';
import ticketReducer, { removeCountryName, updateCountryName } from './ticket-slice';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';

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
});
