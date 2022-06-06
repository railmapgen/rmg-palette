import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    selectedCountry: string;
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
    },
});

export const { setSelectedCountry } = appSlice.actions;
export default appSlice.reducer;
