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
                <RMWindow>
                    <Routes>
                        <Route
                            path="/new"
                            element={
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <TicketWindowHeader />
                                    <TicketView />
                                </RMErrorBoundary>
                            }
                        />
                        <Route
                            path="/picker"
                            element={
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <PickerWindowHeader />
                                    <PickerView />
                                </RMErrorBoundary>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <RMErrorBoundary suspenseFallback={<LoadingOverlay visible />}>
                                    <WindowHeader />
                                    <PaletteView />
                                </RMErrorBoundary>
                            }
                        />
                    </Routes>
                </RMWindow>
            </RMMantineProvider>
        </HashRouter>
    );
}
