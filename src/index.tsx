import React from 'react';
import * as ReactDOM from 'react-dom';
import AppRoot from './components/app-root';

const renderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <AppRoot />
        </React.StrictMode>,
        document.getElementById('root')
    );
};

renderApp();
