import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(<App />);
};

renderApp();
