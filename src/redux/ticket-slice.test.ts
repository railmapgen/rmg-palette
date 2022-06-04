import rootReducer from './index';
import ticketReducer, { removeCountryName, updateCountryName, updateCountryNameLanguage } from './ticket-slice';
import { LanguageCode } from '@railmapgen/rmg-palette-resources';

const realStore = rootReducer.getState();

describe('TicketSlice', () => {
    describe('TicketSlice - multi-language name mutation', () => {
        const initialState = {
            ...realStore.ticket,
            countryName: {
                en: 'Country',
                zh: '國家',
            },
        };

        it('Can update name in specific language as expected', () => {
            const nextState = ticketReducer(
                initialState,
                updateCountryName({
                    lang: LanguageCode.Chinese,
                    name: '国家',
                })
            );

            expect(Object.keys(nextState.countryName)).toHaveLength(2);
            expect(nextState.countryName).toHaveProperty('zh', '国家');
        });

        it('Can change language of a name input as expected', () => {
            const nextState = ticketReducer(
                initialState,
                updateCountryNameLanguage({
                    prevLang: LanguageCode.Chinese,
                    nextLang: LanguageCode.ChineseTrad,
                })
            );

            expect(Object.keys(nextState.countryName)).toHaveLength(2);
            expect(nextState.countryName).not.toHaveProperty('zh');
            expect(nextState.countryName).toHaveProperty('zh-Hant', '國家');
        });

        it('Can remove name in specific language as expected', () => {
            const nextState = ticketReducer(initialState, removeCountryName(LanguageCode.Chinese));

            expect(Object.keys(nextState.countryName)).toHaveLength(1);
            expect(nextState.countryName).not.toHaveProperty('zh');
        });
    });
});
