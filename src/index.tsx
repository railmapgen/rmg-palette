import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom';
import AppRoot from './components/app-root';
import chakraTheme from './theme/theme';

const renderApp = () => {
    ReactDOM.render(
        <ChakraProvider theme={chakraTheme}>
            <React.StrictMode>
                <AppRoot />
            </React.StrictMode>
        </ChakraProvider>,
        document.getElementById('root')
    );
};

renderApp();
