import {
    CityEntry,
    ColourHex,
    CountryEntry,
    countryList,
    MonoColour,
    PaletteEntry,
} from '@railmapgen/rmg-palette-resources';
import { LanguageCode, SUPPORTED_LANGUAGES } from '@railmapgen/rmg-translate';
import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { InvalidReasonType, TicketInvalidReasonType } from '../../util/constants';
import { getTranslationEntityInvalidReasons, PaletteEntryWithTranslationEntry, TranslationEntry } from './util';

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
    newCountryLang?: LanguageCode;

    // city
    city: string;
    newCity: string;
    cityName: TranslationEntry[];

    // lines
    lines: Record<string, PaletteEntryWithTranslationEntry>;
}

const getInitialState = (): TicketState => ({
    country: undefined,
    newCountry: '',
    newCountryLang: undefined,
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
            if (action.payload === 'new') {
                state.city = 'new';
                state.lines = getInitialState().lines;
            }
        },

        setNewCountry: (state, action: PayloadAction<string>) => {
            state.newCountry = action.payload;
        },

        setNewCountryLang: (state, action: PayloadAction<LanguageCode | undefined>) => {
            state.newCountryLang = action.payload;
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

        updateLineId: (state, action: PayloadAction<{ entryId: string; lineId: string }>) => {
            state.lines[action.payload.entryId].id = action.payload.lineId;
        },

        updateLineBgColour: (state, action: PayloadAction<{ entryId: string; bgColour: ColourHex }>) => {
            const { entryId, bgColour } = action.payload;
            state.lines[entryId].colour = bgColour;
            state.lines[entryId].pantone = undefined;
        },

        updateLinePantone: (state, action: PayloadAction<{ entryId: string; pantone: string; hex: ColourHex }>) => {
            const { entryId, pantone, hex } = action.payload;
            state.lines[entryId].colour = hex;
            state.lines[entryId].pantone = pantone;
        },

        updateLineFgColour: (state, action: PayloadAction<{ entryId: string; fgColour: MonoColour }>) => {
            state.lines[action.payload.entryId].fg = action.payload.fgColour;
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
            language: state.newCountryLang,
        };
    },

    getCityEntry: (state: TicketState): CityEntry => {
        return {
            id: state.city === 'new' ? state.newCity : state.city,
            country: state.country === 'new' ? state.newCountry : state.country ?? '',
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
        const { country, newCountry, newCountryLang, countryName } = state;

        if (!country || (country === 'new' && !newCountry)) {
            result.push(TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED);
        }

        if (country === 'new') {
            result.push(...getTranslationEntityInvalidReasons(countryName, newCountryLang));
        }

        return result;
    },

    getCityErrors: (state: TicketState): InvalidReasonType[] => {
        const result = [];
        const { country, newCountryLang, city, newCity, cityName } = state;

        if (!city || (city === 'new' && !newCity)) {
            result.push(TicketInvalidReasonType.CITY_CODE_UNDEFINED);
        }
        //if the case is a new country has officalLanguage then get it, otherwise find the exisiting country officalLanguage - see if it is filled
        const officialLanguage =
            country === 'new' ? newCountryLang : countryList.find(config => config.id === country)?.language;
        result.push(...getTranslationEntityInvalidReasons(cityName, officialLanguage));

        return result;
    },

    getLineErrors: (state: TicketState): Record<string, InvalidReasonType[]> => {
        const result: Record<string, InvalidReasonType[]> = { Overall: [] };
        const { country, newCountryLang, lines } = state;

        if (Object.values(lines).some(line => line.id === '')) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_UNDEFINED);
        }

        if (new Set(Object.values(lines).map(line => line.id)).size !== Object.keys(lines).length) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_DUPLICATED);
        }

        const officialLanguage =
            country === 'new' ? newCountryLang : countryList.find(config => config.id === country)?.language;
        Object.values(lines).forEach(line => {
            result['Line ' + line.id] = getTranslationEntityInvalidReasons(line.nameEntity, officialLanguage);
        });

        return result;
    },
};

export const {
    setCountry,
    setNewCountry,
    setNewCountryLang,
    updateCountryName,
    switchCountryNameLang,
    removeCountryName,
    setCity,
    setNewCity,
    updateCityName,
    switchCityNameLang,
    removeCityName,
    updateLineId,
    updateLineBgColour,
    updateLinePantone,
    updateLineFgColour,
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
