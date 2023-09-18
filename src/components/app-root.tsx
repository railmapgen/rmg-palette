import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PickerWindowHeader, TicketWindowHeader, WindowHeader } from './window-header';
import { RmgErrorBoundary, RmgLoader, RmgThemeProvider, RmgWindow } from '@railmapgen/rmg-components';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));
const PickerView = lazy(() => import('./picker-view/picker-view'));

export default function AppRoot() {
    return (
        <HashRouter>
            <RmgThemeProvider>
                <RmgWindow>
                    <Routes>
                        <Route
                            path="/new"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <TicketWindowHeader />
                                    <TicketView />
                                </RmgErrorBoundary>
                            }
                        />
                        <Route
                            path="/picker"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <PickerWindowHeader />
                                    <PickerView />
                                </RmgErrorBoundary>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <WindowHeader />
                                    <PaletteView />
                                </RmgErrorBoundary>
                            }
                        />
                    </Routes>
                </RmgWindow>
            </RmgThemeProvider>
        </HashRouter>
    );
}
