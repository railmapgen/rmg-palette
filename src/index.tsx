import rmgRuntime, { logger } from '@railmapgen/rmg-runtime';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import AppRoot from './components/app-root';
import './index.css';
import { Events } from './util/constants';
import { initPickerState, initStore } from './redux/init';
import { getCityList, getCountryList } from '@railmapgen/rmg-palette-resources';
import { setCityList, setCountryList, setIsDataLoading } from './redux/app/app-slice';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <AppRoot />
                </I18nextProvider>
            </Provider>
        </StrictMode>
    );
};

rmgRuntime
    .ready()
    .then(() => initStore(store))
    .then(() => {
        renderApp();
        rmgRuntime.injectUITools();
        rmgRuntime.event(Events.APP_LOAD, { isStandaloneWindow: rmgRuntime.isStandaloneWindow() });
    })
    .then(async () => {
        // load cityList and countryList
        try {
            store.dispatch(setCityList(await getCityList()));
        } catch (e) {
            logger.error('Unable to load city list', e);
        }
        try {
            store.dispatch(setCountryList(await getCountryList()));
        } catch (e) {
            logger.error('Unable to load country list', e);
        }
        store.dispatch(setIsDataLoading(false));

        await initPickerState(store);
    });

declare global {
    interface Window {
        EyeDropper: any;
    }
}
