import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PickerWindowHeader, TicketWindowHeader, WindowHeader } from './window-header';
import { LoadingOverlay } from '@mantine/core';
import { RMErrorBoundary, RMMantineProvider, RMWindow } from '@railmapgen/mantine-components';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));
const PickerView = lazy(() => import('./picker-view/picker-view'));

export default function AppRoot() {
    return (
        <HashRouter>
            <RMMantineProvider>
                <Routes>
                    <Route
                        path="/new"
                        element={
                            <RMWindow>
                                <TicketWindowHeader />
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <TicketView />
                                </RMErrorBoundary>
                            </RMWindow>
                        }
                    />
                    <Route
                        path="/picker"
                        element={
                            <RMWindow isAppClip>
                                <PickerWindowHeader />
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <PickerView />
                                </RMErrorBoundary>
                            </RMWindow>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <RMWindow>
                                <WindowHeader />
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <PaletteView />
                                </RMErrorBoundary>
                            </RMWindow>
                        }
                    />
                </Routes>
            </RMMantineProvider>
        </HashRouter>
    );
}
