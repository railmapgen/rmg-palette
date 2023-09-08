import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedCountry: string;
    pantoneReady?: boolean;
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

        setPantoneReady: (state, action: PayloadAction<boolean>) => {
            state.pantoneReady = action.payload;
        },
    },
});

export const { setSelectedCountry, setPantoneReady } = appSlice.actions;
export default appSlice.reducer;
