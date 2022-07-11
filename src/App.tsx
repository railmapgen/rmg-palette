import React, { StrictMode } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux';
import { ChakraProvider } from '@chakra-ui/react';
import { rmgChakraTheme } from '@railmapgen/rmg-components';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from './components/app-root';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

export default function App() {
    return (
        <StrictMode>
            <Provider store={store}>
                <ChakraProvider theme={rmgChakraTheme}>
                    <I18nextProvider i18n={i18n}>
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <AppRoot />
                        </BrowserRouter>
                    </I18nextProvider>
                </ChakraProvider>
            </Provider>
        </StrictMode>
    );
}
