import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WindowHeader from './window-header';
import { RmgErrorBoundary, RmgLoader, RmgWindow } from '@railmapgen/rmg-components';

const PaletteView = lazy(() => import('./palette-view/palette-view'));
const TicketView = lazy(() => import('./ticket-view/ticket-view'));

export default function AppRoot() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
                        path="/"
                        element={
                            <RmgErrorBoundary suspenseFallback={<RmgLoader isIndeterminate />}>
                                <PaletteView />
                            </RmgErrorBoundary>
                        }
                    />
                </Routes>
            </RmgWindow>
        </BrowserRouter>
    );
}
