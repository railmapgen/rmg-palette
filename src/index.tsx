import rmgRuntime from '@railmapgen/rmg-runtime';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';

let root: Root;

const renderApp = () => {
    root = createRoot(document.getElementById('root') as HTMLDivElement);
    root.render(<App />);
};

renderApp();

const dryRun = async () => {
    try {
        const appVersion = await rmgRuntime.getAppVersion();
        const env = await rmgRuntime.getEnv();
        const instance = await rmgRuntime.getInstance();
        console.log(appVersion, env, instance);
        console.log('ms since rmg-runtime loaded:', rmgRuntime.getMsSinceStartUp());
    } catch (e) {
        console.error('Unexpected error during dry run rmg-runtime', e);
    }
};

dryRun().then();
