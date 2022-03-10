import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoot from './components/app-root';
import store from './redux';
import { rmgChakraTheme } from '@railmapgen/rmg-components';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ChakraProvider theme={rmgChakraTheme}>
                <React.StrictMode>
                    <AppRoot />
                </React.StrictMode>
            </ChakraProvider>
        </Provider>,
        document.getElementById('root')
    );
};

renderApp();
