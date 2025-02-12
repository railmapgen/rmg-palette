import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityEntry, CountryEntry, Theme } from '@railmapgen/rmg-palette-resources';

export interface PaletteUsage {
    theme: Theme;
    displayName?: string;
}

interface AppState {
    isDataLoading: boolean;
    cityList: CityEntry[];
    countryList: CountryEntry[];

    selectedCountry: string;
    sidePanelCity?: string;

    pantoneReady?: boolean;
    recentlyUsed: PaletteUsage[];
}

const initialState: AppState = {
    isDataLoading: true,
    cityList: [],
    countryList: [],

    selectedCountry: '',
    recentlyUsed: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsDataLoading: (state, action: PayloadAction<boolean>) => {
            state.isDataLoading = action.payload;
        },

        setCityList: (state, action: PayloadAction<CityEntry[]>) => {
            state.cityList = action.payload;
        },

        setCountryList: (state, action: PayloadAction<CountryEntry[]>) => {
            state.countryList = action.payload;
        },

        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },

        setSidePanelCity: (state, action: PayloadAction<string>) => {
            state.sidePanelCity = action.payload;
        },

        closeSidePanel: state => {
            state.sidePanelCity = undefined;
        },

        setPantoneReady: (state, action: PayloadAction<boolean>) => {
            state.pantoneReady = action.payload;
        },

        setRecentlyUsed: (state, action: PayloadAction<PaletteUsage[]>) => {
            state.recentlyUsed = action.payload;
        },

        addRecentlyUsed: (state, action: PayloadAction<PaletteUsage>) => {
            const newUsage = action.payload;
            const currentIndex = state.recentlyUsed.findIndex(({ theme }) => {
                if (newUsage.theme[0] === 'other') {
                    return theme.toString() === newUsage.theme.toString();
                } else {
                    return theme[0] === newUsage.theme[0] && theme[1] === newUsage.theme[1];
                }
            });
            if (currentIndex < 0) {
                state.recentlyUsed = [action.payload, ...state.recentlyUsed].slice(0, 10);
            } else {
                state.recentlyUsed = [
                    newUsage,
                    ...state.recentlyUsed.slice(0, currentIndex),
                    ...state.recentlyUsed.slice(currentIndex + 1),
                ];
            }
        },

        removeRecentlyUsedItem: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index < state.recentlyUsed.length) {
                state.recentlyUsed = state.recentlyUsed.toSpliced(index, 1);
            }
        },

        clearRecentlyUsed: state => {
            state.recentlyUsed = [];
        },
    },
});

export const {
    setIsDataLoading,
    setCityList,
    setCountryList,
    setSelectedCountry,
    setSidePanelCity,
    closeSidePanel,
    setPantoneReady,
    setRecentlyUsed,
    addRecentlyUsed,
    removeRecentlyUsedItem,
    clearRecentlyUsed,
} = appSlice.actions;
export default appSlice.reducer;
