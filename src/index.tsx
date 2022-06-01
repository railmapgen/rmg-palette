import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import AppRoot from './components/app-root';
import store from './redux';
import { rmgChakraTheme } from '@railmapgen/rmg-components';
import { createRoot, Root } from 'react-dom/client';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(
        <Provider store={store}>
            <ChakraProvider theme={rmgChakraTheme}>
                <React.StrictMode>
                    <AppRoot />
                </React.StrictMode>
            </ChakraProvider>
        </Provider>
    );
};

renderApp();
