import {
    CityCode,
    CityEntry,
    CountryCode,
    CountryEntry,
    LanguageCode,
    MonoColour,
    PaletteEntry,
} from '@railmapgen/rmg-palette-resources';
import { createSlice, EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { ColourHex, InvalidReasonType, TicketInvalidReasonType } from '../../util/constants';
import {
    convertEntityStateToTranslation,
    createTranslationEntityInitialState,
    getTranslationEntityInvalidReasons,
    PaletteEntryWithTranslationEntity,
    TranslationEntity,
    translationEntityAdapter,
} from './util';

const initialTranslation = translationEntityAdapter.upsertOne(translationEntityAdapter.getInitialState(), {
    id: nanoid(),
    lang: LanguageCode.English,
    name: '',
});

const initialPaletteEntry: PaletteEntryWithTranslationEntity = {
    id: '',
    nameEntity: initialTranslation,
    colour: '#aaaaaa',
    fg: MonoColour.white,
};

export interface TicketState {
    // country
    country?: CountryCode | 'new';
    newCountry: string;
    countryName: EntityState<TranslationEntity>;

    // city
    city: string;
    cityName: EntityState<TranslationEntity>;

    // lines
    lines: Record<string, PaletteEntryWithTranslationEntity>;
}

const initialState: TicketState = {
    country: undefined,
    newCountry: '',
    countryName: initialTranslation,

    city: '',
    cityName: initialTranslation,

    lines: { [nanoid()]: initialPaletteEntry },
};

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<CountryCode | 'new'>) => {
            state.country = action.payload;
        },

        setNewCountry: (state, action: PayloadAction<string>) => {
            state.newCountry = action.payload;
        },

        updateCountryName: (state, action: PayloadAction<{ id: EntityId; changes: Partial<TranslationEntity> }>) => {
            translationEntityAdapter.updateOne(state.countryName, action.payload);
        },

        addCountryName: (state, action: PayloadAction<LanguageCode>) => {
            translationEntityAdapter.addOne(state.countryName, { id: nanoid(), lang: action.payload, name: '' });
        },

        removeCountryName: (state, action: PayloadAction<EntityId>) => {
            translationEntityAdapter.removeOne(state.countryName, action.payload);
        },

        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },

        updateCityName: (state, action: PayloadAction<{ id: EntityId; changes: Partial<TranslationEntity> }>) => {
            translationEntityAdapter.updateOne(state.cityName, action.payload);
        },

        addCityName: (state, action: PayloadAction<LanguageCode>) => {
            translationEntityAdapter.addOne(state.cityName, { id: nanoid(), lang: action.payload, name: '' });
        },

        removeCityName: (state, action: PayloadAction<EntityId>) => {
            translationEntityAdapter.removeOne(state.cityName, action.payload);
        },

        updateLineId: (state, action: PayloadAction<{ entryId: string; lineId: string }>) => {
            state.lines[action.payload.entryId].id = action.payload.lineId;
        },

        updateLineBgColour: (state, action: PayloadAction<{ entryId: string; bgColour: ColourHex }>) => {
            state.lines[action.payload.entryId].colour = action.payload.bgColour;
        },

        updateLineFgColour: (state, action: PayloadAction<{ entryId: string; fgColour: MonoColour }>) => {
            state.lines[action.payload.entryId].fg = action.payload.fgColour;
        },

        updateLineName: (
            state,
            action: PayloadAction<{ entryId: string; id: EntityId; changes: Partial<TranslationEntity> }>
        ) => {
            const { entryId, ...entityUpdates } = action.payload;
            translationEntityAdapter.updateOne(state.lines[entryId].nameEntity, entityUpdates);
        },

        addLineName: (state, action: PayloadAction<{ entryId: string; lang: LanguageCode }>) => {
            translationEntityAdapter.addOne(state.lines[action.payload.entryId].nameEntity, {
                id: nanoid(),
                lang: action.payload.lang,
                name: '',
            });
        },

        removeLineName: (state, action: PayloadAction<{ entryId: string; id: EntityId }>) => {
            translationEntityAdapter.removeOne(state.lines[action.payload.entryId].nameEntity, action.payload.id);
        },

        addLine: state => {
            state.lines[nanoid()] = initialPaletteEntry;
        },

        copyLine: (state, action: PayloadAction<string>) => {
            state.lines[nanoid()] = JSON.parse(JSON.stringify(state.lines[action.payload]));
        },

        removeLine: (state, action: PayloadAction<string>) => {
            delete state.lines[action.payload];
        },

        resetTicket: () => initialState,

        populateTicket: (state, action: PayloadAction<{ city: CityEntry; palettes: PaletteEntry[] }>) => {
            const { city, palettes } = action.payload;
            state.country = city.country as CountryCode;

            state.city = city.id;
            translationEntityAdapter.setAll(
                state.cityName,
                Object.entries(city.name).map(([lang, name]) => ({
                    id: nanoid(),
                    lang: lang as LanguageCode,
                    name,
                }))
            );

            state.lines = palettes.reduce<Record<string, PaletteEntryWithTranslationEntity>>((acc, cur) => {
                const { id, colour, fg } = cur;
                const nameEntity = createTranslationEntityInitialState(
                    Object.entries(cur.name).map(([lang, name]) => ({
                        id: nanoid(),
                        lang: lang as LanguageCode,
                        name,
                    }))
                );
                return { ...acc, [nanoid()]: { id, nameEntity, colour, fg: fg ?? MonoColour.white } };
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
            id: state.newCountry as CountryCode,
            name: convertEntityStateToTranslation(state.countryName),
        };
    },

    getCityEntry: (state: TicketState): CityEntry => {
        return {
            id: state.city as CityCode,
            country: state.country === 'new' ? state.newCountry : state.country ?? '',
            name: convertEntityStateToTranslation(state.cityName),
        };
    },

    getPalettes: (state: TicketState): PaletteEntry[] => {
        return Object.values(state.lines).map(line => {
            const { nameEntity, ...others } = line;
            return { ...others, name: convertEntityStateToTranslation(nameEntity) };
        });
    },

    getCountryErrors: (state: TicketState): InvalidReasonType[] => {
        const result = [];
        const { country, newCountry, countryName } = state;

        if (!country || (country === 'new' && !newCountry)) {
            result.push(TicketInvalidReasonType.COUNTRY_CODE_UNDEFINED);
        }

        if (country === 'new') {
            result.push(...getTranslationEntityInvalidReasons(countryName));
        }

        return result;
    },

    getCityErrors: (state: TicketState): InvalidReasonType[] => {
        const result = [];
        const { city, cityName } = state;

        if (!city) {
            result.push(TicketInvalidReasonType.CITY_CODE_UNDEFINED);
        }

        result.push(...getTranslationEntityInvalidReasons(cityName));

        return result;
    },

    getLineErrors: (state: TicketState): Record<string, InvalidReasonType[]> => {
        const result: Record<string, InvalidReasonType[]> = { Overall: [] };
        const { lines } = state;

        if (Object.values(lines).some(line => line.id === '')) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_UNDEFINED);
        }

        if (new Set(Object.values(lines).map(line => line.id)).size !== Object.keys(lines).length) {
            result['Overall'].push(TicketInvalidReasonType.LINE_CODE_DUPLICATED);
        }

        Object.values(lines).forEach(line => {
            result['Line ' + line.id] = getTranslationEntityInvalidReasons(line.nameEntity);
        });

        return result;
    },
};

export const {
    setCountry,
    setNewCountry,
    updateCountryName,
    addCountryName,
    removeCountryName,
    setCity,
    updateCityName,
    addCityName,
    removeCityName,
    updateLineId,
    updateLineBgColour,
    updateLineFgColour,
    updateLineName,
    addLineName,
    removeLineName,
    addLine,
    copyLine,
    removeLine,
    resetTicket,
    populateTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
