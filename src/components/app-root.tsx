import { lazy, PropsWithChildren, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PickerWindowHeader, TicketWindowHeader, WindowHeader } from './window-header';
import { createTheme, LoadingOverlay, MantineProvider, useMantineColorScheme } from '@mantine/core';
import RMWindow from './common/rm-window';
import rmgRuntime from '@railmapgen/rmg-runtime';
import RMErrorBoundary from './common/rm-error-boundary';

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
            <MantineProvider theme={theme} defaultColorScheme={colourMode === 'system' ? 'auto' : colourMode}>
                <MantineProviderInner>
                    <RMWindow>
                        <Routes>
                            <Route
                                path="/new"
                                element={
                                    <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                        <TicketWindowHeader />
                                        <TicketView />
                                    </RMErrorBoundary>
                                }
                            />
                            <Route
                                path="/picker"
                                element={
                                    <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                        <PickerWindowHeader />
                                        <PickerView />
                                    </RMErrorBoundary>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                        <WindowHeader />
                                        <PaletteView />
                                    </RMErrorBoundary>
                                }
                            />
                        </Routes>
                    </RMWindow>
                </MantineProviderInner>
            </MantineProvider>
        </HashRouter>
    );
}
