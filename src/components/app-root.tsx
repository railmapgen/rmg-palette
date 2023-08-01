import { lazy } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import WindowHeader from './window-header';
import { RmgErrorBoundary, RmgLoader, RmgThemeProvider, RmgWindow } from '@railmapgen/rmg-components';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));
const PickerView = lazy(() => import('./picker-view/picker-view'));

export default function AppRoot() {
    return (
        <HashRouter>
            <RmgThemeProvider>
                <RmgWindow>
                    <WindowHeader />
                    <Routes>
                        <Route
                            path="/new"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <TicketView />
                                </RmgErrorBoundary>
                            }
                        />
                        <Route
                            path="/picker"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                    <PickerView />
                                </RmgErrorBoundary>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
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
