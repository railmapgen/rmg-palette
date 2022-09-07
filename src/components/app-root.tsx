import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WindowHeader from './window-header';
import { RmgWindow } from '@railmapgen/rmg-components';
import FallbackLoader from './fallback-loader';
import ErrorBoundary from '../error-boundary';

const PaletteView = lazy(() => import(/* webpackChunkName: "PaletteView" */ './palette-view/palette-view'));
const TicketView = lazy(() => import(/* webpackChunkName: "TicketView" */ './ticket-view/ticket-view'));

export default function AppRoot() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <RmgWindow>
                <WindowHeader />
                <Routes>
                    <Route
                        path="/new"
                        element={
                            <Suspense fallback={<FallbackLoader />}>
                                <ErrorBoundary>
                                    <TicketView />
                                </ErrorBoundary>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<FallbackLoader />}>
                                <ErrorBoundary>
                                    <PaletteView />
                                </ErrorBoundary>
                            </Suspense>
                        }
                    />
                </Routes>
            </RmgWindow>
        </BrowserRouter>
    );
}
