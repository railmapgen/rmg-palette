import { lazy, PropsWithChildren, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PickerWindowHeader, TicketWindowHeader, WindowHeader } from './window-header';
import { RmgErrorBoundary, RmgLoader, RmgThemeProvider, RmgWindow } from '@railmapgen/rmg-components';
import { createTheme, LoadingOverlay, MantineProvider, useMantineColorScheme } from '@mantine/core';
import RMWindow from './common/rm-window';
import rmgRuntime from '@railmapgen/rmg-runtime';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));
const PickerView = lazy(() => import('./picker-view/picker-view'));

const theme = createTheme({
    primaryColor: 'cyan',
});

const colourMode = rmgRuntime.getColourMode();
const MantineProviderInner = ({ children }: PropsWithChildren) => {
    const { setColorScheme } = useMantineColorScheme();

    useEffect(() => {
        rmgRuntime.onColourModeChange(mode => {
            setColorScheme(mode === 'system' ? 'auto' : mode);
        });
    }, [setColorScheme]);

    return children;
};

export default function AppRoot() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/new"
                    element={
                        <RmgThemeProvider>
                            <RmgWindow>
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <TicketWindowHeader />
                                    <TicketView />
                                </RmgErrorBoundary>
                            </RmgWindow>
                        </RmgThemeProvider>
                    }
                />
                <Route
                    path="/picker"
                    element={
                        <RmgThemeProvider>
                            <RmgWindow>
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <PickerWindowHeader />
                                    <PickerView />
                                </RmgErrorBoundary>
                            </RmgWindow>
                        </RmgThemeProvider>
                    }
                />
                <Route
                    path="/"
                    element={
                        <MantineProvider
                            theme={theme}
                            defaultColorScheme={colourMode === 'system' ? 'auto' : colourMode}
                        >
                            <MantineProviderInner>
                                <RMWindow>
                                    <RmgErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                        <WindowHeader />
                                        <PaletteView />
                                    </RmgErrorBoundary>
                                </RMWindow>
                            </MantineProviderInner>
                        </MantineProvider>
                    }
                />
            </Routes>
        </HashRouter>
    );
}
