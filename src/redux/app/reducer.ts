import { setSelectedCountryAction, SET_SELECTED_COUNTRY } from './action';

interface AppState {
    selectedCountry?: string;
}

const initialState: AppState = {
    selectedCountry: undefined,
};
export default function AppReducer(state = initialState, action: setSelectedCountryAction): AppState {
    switch (action.type) {
        case SET_SELECTED_COUNTRY:
            state.selectedCountry = action.selectedCountry;
            break;
        default:
            break;
    }
    return { ...state };
}
