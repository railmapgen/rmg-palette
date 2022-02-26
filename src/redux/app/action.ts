export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';

export interface setSelectedCountryAction {
    type: typeof SET_SELECTED_COUNTRY;
    selectedCountry?: string;
}

export const setSelectedCountry = (selectedCountry?: string): setSelectedCountryAction => {
    return { type: SET_SELECTED_COUNTRY, selectedCountry };
};
