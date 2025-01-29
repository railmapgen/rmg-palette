import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PickerWindowHeader, TicketWindowHeader, WindowHeader } from './window-header';
import { RmgErrorBoundary, RmgLoader, RmgThemeProvider, RmgWindow } from '@railmapgen/rmg-components';
import { createTheme, Flex, MantineProvider } from '@mantine/core';
import RMWindow from './common/rm-window';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));
const PickerView = lazy(() => import('./picker-view/picker-view'));

const theme = createTheme({
    primaryColor: 'cyan',
});

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
                        <MantineProvider theme={theme}>
                            <RMWindow>
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <WindowHeader />
                                    <PaletteView />
                                </RmgErrorBoundary>
                            </RMWindow>
                        </MantineProvider>
                    }
                />
            </Routes>
        </HashRouter>
    );
}
