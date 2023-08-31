import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedCountry: string;
    sidePanelCity?: string;
}

const initialState: AppState = {
    selectedCountry: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
        setSidePanelCity: (state, action: PayloadAction<string>) => {
            state.sidePanelCity = action.payload;
        },
        closeSidePanel: state => {
            state.sidePanelCity = undefined;
        },
    },
});

export const { setSelectedCountry, setSidePanelCity, closeSidePanel } = appSlice.actions;
export default appSlice.reducer;
