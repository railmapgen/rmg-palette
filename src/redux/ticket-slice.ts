import {
    CityCode,
    CityEntry,
    CountryCode,
    LanguageCode,
    MonoColour,
    PaletteEntry,
    Translation,
} from '@railmapgen/rmg-palette-resources';
import { createEntityAdapter, createSlice, EntityId, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { ColourHex } from '../util/constants';

export interface TranslationEntity {
    id: string;
    lang: LanguageCode;
    name: string;
}

export interface PaletteEntryWithTranslationEntity {
    id: string;
    nameEntity: EntityState<TranslationEntity>;
    colour: ColourHex;
    fg: MonoColour;
}

export const translationEntityAdapter = createEntityAdapter<TranslationEntity>();

export const translationEntitySelector = translationEntityAdapter.getSelectors();
const convertEntityStateToTranslation = (entityState: EntityState<TranslationEntity>): Translation => {
    return translationEntitySelector.selectAll(entityState).reduce<Translation>(
        (acc, cur) => ({
            ...acc,
            [cur.lang]: cur.name,
        }),
        {}
    );
};

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

interface TicketState {
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

        resetTicket: () => initialState,
    },
});

export const ticketSelectors = {
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
    resetTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
