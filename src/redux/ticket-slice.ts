import { CountryCode, LanguageCode, Translation } from '@railmapgen/rmg-palette-resources';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const mutateNameLanguage = (prevState: Translation, prevLang: LanguageCode, nextLang: LanguageCode): Translation => {
    return Object.entries(prevState).reduce<Translation>((acc, cur) => {
        if (cur[0] === prevLang) {
            return { ...acc, [nextLang]: cur[1] };
        } else {
            return { ...acc, [cur[0]]: cur[1] };
        }
    }, {});
};

const mutateName = (prevState: Translation, lang: LanguageCode, name: string): Translation => {
    return { ...prevState, [lang]: name };
};

const removeName = (prevState: Translation, lang: LanguageCode): Translation => {
    const { [lang]: _, ...nextState } = prevState;
    return nextState;
};

interface TicketState {
    // country
    country?: CountryCode | 'new';
    newCountry: string;
    countryName: Translation;

    // city
    city: string;
    cityName: Translation;
}

const initialState: TicketState = {
    country: undefined,
    newCountry: '',
    countryName: { en: '' },

    city: '',
    cityName: { en: '' },
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

        updateCountryNameLanguage: (
            state,
            action: PayloadAction<{ prevLang: LanguageCode; nextLang: LanguageCode }>
        ) => {
            state.countryName = mutateNameLanguage(state.countryName, action.payload.prevLang, action.payload.nextLang);
        },

        updateCountryName: (state, action: PayloadAction<{ lang: LanguageCode; name: string }>) => {
            state.countryName = mutateName(state.countryName, action.payload.lang, action.payload.name);
        },

        removeCountryName: (state, action: PayloadAction<LanguageCode>) => {
            state.countryName = removeName(state.countryName, action.payload);
        },

        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },

        updateCityNameLanguage: (state, action: PayloadAction<{ prevLang: LanguageCode; nextLang: LanguageCode }>) => {
            state.cityName = mutateNameLanguage(state.cityName, action.payload.prevLang, action.payload.nextLang);
        },

        updateCityName: (state, action: PayloadAction<{ lang: LanguageCode; name: string }>) => {
            state.cityName = mutateName(state.cityName, action.payload.lang, action.payload.name);
        },

        removeCityName: (state, action: PayloadAction<LanguageCode>) => {
            state.cityName = removeName(state.cityName, action.payload);
        },
    },
});

export const {
    setCountry,
    setNewCountry,
    updateCountryNameLanguage,
    updateCountryName,
    removeCountryName,
    setCity,
    updateCityNameLanguage,
    updateCityName,
    removeCityName,
} = ticketSlice.actions;
export default ticketSlice.reducer;
