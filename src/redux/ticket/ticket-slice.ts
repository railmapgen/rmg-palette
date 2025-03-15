import { CityEntry, CountryEntry, MonoColour, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { LanguageCode, SUPPORTED_LANGUAGES } from '@railmapgen/rmg-translate';
import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { InvalidReasonType, TicketInvalidReasonType } from '../../util/constants';
import { getTranslationEntityInvalidReasons, PaletteEntryWithTranslationEntry, TranslationEntry } from './util';

export type LineDetailUpdates = Partial<Omit<PaletteEntryWithTranslationEntry, 'nameEntity'>>;

const initialTranslation: TranslationEntry[] = SUPPORTED_LANGUAGES.map(lang => [lang, '']);

const initialPaletteEntry: PaletteEntryWithTranslationEntry = {
    id: '',
    nameEntity: initialTranslation,
    colour: '#aaaaaa',
    fg: MonoColour.white,
    pantone: undefined,
};

export interface TicketState {
    // country
    country?: string;
    newCountry: string;
    countryName: TranslationEntry[];
    newCountryLangs: LanguageCode[];

    // city
    city: string;
    newCity: string;
    cityName: TranslationEntry[];

    // lines
    lines: Record<string, PaletteEntryWithTranslationEntry>;
}

const getInitialState = (): TicketState => ({
    country: '',
    newCountry: '',
    newCountryLangs: [],
    countryName: initialTranslation,

    city: '',
    newCity: '',
    cityName: initialTranslation,

    lines: { [crypto.randomUUID()]: initialPaletteEntry },
});

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: getInitialState(),
    reducers: {
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
            state.city = '';
            if (action.payload === 'new') {
                state.city = 'new';
                state.lines = getInitialState().lines;
            }
        },

        setNewCountry: (state, action: PayloadAction<string>) => {
            state.newCountry = action.payload;
        },

        setNewCountryLangs: (state, action: PayloadAction<LanguageCode[]>) => {
            state.newCountryLangs = action.payload;
        },

        updateCountryName: (state, action: PayloadAction<{ lang: LanguageCode; name: string }>) => {
            const { lang, name } = action.payload;
            const idx = state.countryName.findIndex(entry => entry[0] === lang);
            if (idx >= 0) {
                state.countryName[idx] = [lang, name];
            } else {
                state.countryName.push([lang, name]);
            }
        },

        switchCountryNameLang: (state, action: PayloadAction<{ prevLang: LanguageCode; nextLang: LanguageCode }>) => {
            const { prevLang, nextLang } = action.payload;
            state.countryName = state.countryName.map(entry => (entry[0] === prevLang ? [nextLang, entry[1]] : entry));
        },

        removeCountryName: (state, action: PayloadAction<LanguageCode>) => {
            state.countryName = state.countryName.filter(entry => entry[0] !== action.payload);
        },

        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
            if (action.payload === 'new') {
                state.lines = getInitialState().lines;
            }
        },

        setNewCity: (state, action: PayloadAction<string>) => {
            state.newCity = action.payload;
        },

        updateCityName: (state, action: PayloadAction<{ lang: LanguageCode; name: string }>) => {
            const { lang, name } = action.payload;
            const idx = state.cityName.findIndex(entry => entry[0] === lang);
            if (idx >= 0) {
                state.cityName[idx] = [lang, name];
            } else {
                state.cityName.push([lang, name]);
            }
        },

        switchCityNameLang: (state, action: PayloadAction<{ prevLang: LanguageCode; nextLang: LanguageCode }>) => {
            const { prevLang, nextLang } = action.payload;
            state.cityName = state.cityName.map(entry => (entry[0] === prevLang ? [nextLang, entry[1]] : entry));
        },

        removeCityName: (state, action: PayloadAction<EntityId>) => {
            state.cityName = state.cityName.filter(entry => entry[0] !== action.payload);
        },

        updateLineDetail: (state, action: PayloadAction<{ entryId: string; updates: LineDetailUpdates }>) => {
            const { entryId, updates } = action.payload;
            state.lines[entryId] = {
                ...state.lines[entryId],
                ...updates,
            };
        },

        moveLineUp: (state, action: PayloadAction<string>) => {
            const keys = Object.keys(state.lines);
            const entryId = action.payload;
            const currentIndex = keys.findIndex(key => key === entryId);
            if (currentIndex <= 0) {
                return;
            }

            const chunk1 = keys.slice(0, currentIndex - 1);
            const chunk2 = [entryId, keys[currentIndex - 1]];
            const chunk3 = keys.slice(currentIndex);

            state.lines = Object.fromEntries(
                [chunk1, chunk2, chunk3].map(chunk => chunk.map(key => [key, state.lines[key]])).flat(1)
            );
        },

        moveLineDown: (state, action: PayloadAction<string>) => {
            const keys = Object.keys(state.lines);
            const entryId = action.payload;
            const currentIndex = keys.findIndex(key => key === entryId);
            if (currentIndex < 0 || currentIndex >= keys.length - 1) {
                return;
            }

            const chunk1 = keys.slice(0, currentIndex);
            const chunk2 = [keys[currentIndex + 1], entryId];
            const chunk3 = keys.slice(currentIndex + 1);

            state.lines = Object.fromEntries(
                [chunk1, chunk2, chunk3].map(chunk => chunk.map(key => [key, state.lines[key]])).flat(1)
            );
        },

        updateLineName: (state, action: PayloadAction<{ entryId: string; lang: LanguageCode; name: string }>) => {
            const { entryId, lang, name } = action.payload;
            const idx = state.lines[entryId].nameEntity.findIndex(entry => entry[0] === lang);
            if (idx >= 0) {
                state.lines[entryId].nameEntity[idx] = [lang, name];
            } else {
                state.lines[entryId].nameEntity.push([lang, name]);
            }
        },

        switchLineNameLang: (
            state,
            action: PayloadAction<{ entryId: string; prevLang: LanguageCode; nextLang: LanguageCode }>
        ) => {
            const { entryId, prevLang, nextLang } = action.payload;
            state.lines[entryId].nameEntity = state.lines[entryId].nameEntity.map(entry =>
                entry[0] === prevLang ? [nextLang, entry[1]] : entry
            );
        },

        removeLineName: (state, action: PayloadAction<{ entryId: string; lang: LanguageCode }>) => {
            const { entryId, lang } = action.payload;
            state.lines[entryId].nameEntity = state.lines[entryId].nameEntity.filter(entry => entry[0] !== lang);
        },

        addLine: state => {
            state.lines[crypto.randomUUID()] = initialPaletteEntry;
        },

        copyLine: (state, action: PayloadAction<string>) => {
            state.lines[crypto.randomUUID()] = JSON.parse(JSON.stringify(state.lines[action.payload]));
        },

        removeLine: (state, action: PayloadAction<string>) => {
            delete state.lines[action.payload];
        },

        clearLines: state => {
            state.lines = getInitialState().lines;
        },

        resetTicket: (state, action: PayloadAction<TicketState | undefined>) => action.payload ?? getInitialState(),

        populateTicket: (state, action: PayloadAction<{ city: CityEntry; palettes: PaletteEntry[] }>) => {
            const { city, palettes } = action.payload;
            state.country = city.country;

            state.city = city.id;
            state.cityName = Object.entries(city.name).map(([lang, name]) => [lang as LanguageCode, name]);

            state.lines = palettes.reduce<Record<string, PaletteEntryWithTranslationEntry>>((acc, cur) => {
                const { id, colour, fg, pantone } = cur;
                const nameEntity: TranslationEntry[] = Object.entries(cur.name).map(([lang, name]) => [
                    lang as LanguageCode,
                    name,
                ]);
                return {
                    ...acc,
                    [crypto.randomUUID()]: { id, nameEntity, colour, fg: fg ?? MonoColour.white, pantone },
                };
            }, {});
        },
    },
});

export const ticketSelectors = {
    getCountryEntry: (state: TicketState): CountryEntry | null => {
        if (state.country !== 'new') {
            return null;
        }
        return {
            id: state.newCountry,
            name: Object.fromEntries(state.countryName),
            languages: state.newCountryLangs,
        };
    },

    getCityEntry: (state: TicketState): CityEntry => {
        return {
            id: state.city === 'new' ? state.newCity : state.city,
            country: state.country === 'new' ? state.newCountry : (state.country ?? ''),
            name: Object.fromEntries(state.cityName),
        };
    },

    getPalettes: (state: TicketState): PaletteEntry[] => {
        return Object.values(state.lines).map(line => {
            const { nameEntity, ...others } = line;
            return { ...others, name: Object.fromEntries(nameEntity) };
        });
    },

    getCountryErrors: (state: TicketState): InvalidReasonType[] => {
        const result = [];
        const { country, newCountry, newCountryLangs, countryName } = state;

        if (!country || (country === 'new' && !newCountry)) {
            result.push(TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED);
        }

        if (country === 'new') {
            if (!newCountryLangs.length) {
                result.push(TicketInvalidReasonType.OFFICIAL_LANGUAGES_EMPTY);
            }
            result.push(...getTranslationEntityInvalidReasons(countryName, newCountryLangs));
        }

        return result;
    },

    getCityErrors: (state: TicketState, countryList: CountryEntry[]): InvalidReasonType[] => {
        const result: InvalidReasonType[] = [];
        const { country, newCountryLangs, city, newCity, cityName } = state;
        const countryConfig = countryList.find(config => config.id === country);

        if (city && city !== 'new') {
            // It's not the submitters' fault if they're using an existing city
            return result;
        }

        if (!city || (city === 'new' && !newCity)) {
            result.push(TicketInvalidReasonType.CITY_CODE_UNDEFINED);
        }
        //if the case is a new country has officalLanguage then get it, otherwise find the exisiting country officalLanguage - see if it is filled
        if (countryConfig) {
            const officialLanguages = country === 'new' ? newCountryLangs : countryConfig.languages;
            result.push(...getTranslationEntityInvalidReasons(cityName, officialLanguages));
        }
        return result;
    },

    getLineErrors: (state: TicketState, countryList: CountryEntry[]): Record<string, InvalidReasonType[]> => {
        const result: Record<string, InvalidReasonType[]> = { Overall: [] };
        const { country, newCountryLangs, lines } = state;
        const countryConfig = countryList.find(config => config.id === country);

        if (Object.values(lines).some(line => line.id === '')) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_UNDEFINED);
        }

        if (new Set(Object.values(lines).map(line => line.id)).size !== Object.keys(lines).length) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_DUPLICATED);
        }

        if (countryConfig) {
            const officialLanguages = country === 'new' ? newCountryLangs : countryConfig.languages;
            Object.values(lines).forEach(line => {
                result['Line ' + line.id] = getTranslationEntityInvalidReasons(line.nameEntity, officialLanguages);
            });
        }

        return result;
    },
};

export const {
    setCountry,
    setNewCountry,
    setNewCountryLangs,
    updateCountryName,
    switchCountryNameLang,
    removeCountryName,
    setCity,
    setNewCity,
    updateCityName,
    switchCityNameLang,
    removeCityName,
    updateLineDetail,
    moveLineUp,
    moveLineDown,
    updateLineName,
    switchLineNameLang,
    removeLineName,
    addLine,
    copyLine,
    removeLine,
    clearLines,
    resetTicket,
    populateTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
