import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import PageHeader from './page-header';
import WindowHeader from './window-header';
import NewTicket from './new-ticket/new-ticket';
import PaletteGrid from './ag-grid/palette-grid';

export default function AppRoot() {
    return (
        <Flex direction="column" height="100%" overflow="hidden">
            <WindowHeader />
            <Flex direction="column" flex={1} overflow="hidden">
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
            </Flex>
        </Flex>
    );
}
