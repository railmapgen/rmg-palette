import { ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './components/app-root';
import store from './redux';
import { rmgChakraTheme } from '@railmapgen/rmg-components';
import { createRoot, Root } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <ChakraProvider theme={rmgChakraTheme}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <AppRoot />
                    </BrowserRouter>
                </ChakraProvider>
            </Provider>
        </StrictMode>
    );
};

renderApp();
