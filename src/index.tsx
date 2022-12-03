import rmgRuntime from '@railmapgen/rmg-runtime';
import React, { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux';
import { ChakraProvider } from '@chakra-ui/react';
import { rmgChakraTheme } from '@railmapgen/rmg-components';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import AppRoot from './components/app-root';
import './index.css';
import { Events } from './util/constants';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <ChakraProvider theme={rmgChakraTheme}>
                    <I18nextProvider i18n={i18n}>
                        <AppRoot />
                    </I18nextProvider>
                </ChakraProvider>
            </Provider>
        </StrictMode>
    );
};

rmgRuntime.ready().then(() => {
    renderApp();
    rmgRuntime.injectCss();
    rmgRuntime.event(Events.APP_LOAD, { isStandaloneWindow: rmgRuntime.isStandaloneWindow() });
});