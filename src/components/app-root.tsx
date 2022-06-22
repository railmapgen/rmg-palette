import { Route, Routes } from 'react-router-dom';
import PageHeader from './page-header';
import WindowHeader from './window-header';
import NewTicket from './new-ticket/new-ticket';
import PaletteGrid from './ag-grid/palette-grid';
import { RmgPage, RmgWindow } from '@railmapgen/rmg-components';

export default function AppRoot() {
    return (
        <RmgWindow>
            <WindowHeader />
            <RmgPage>
                <Routes>
                    <Route path="/new" element={<NewTicket />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <PageHeader />
                                <PaletteGrid />
                            </>
                        }
                    />
                </Routes>
            </RmgPage>
        </RmgWindow>
    );
}
