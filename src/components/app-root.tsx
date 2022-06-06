import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import PaletteDataTable from './data-table/palette-data-table';
import PageHeader from './page-header';
import WindowHeader from './window-header';
import NewTicket from './new-ticket/new-ticket';

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
                                <PaletteDataTable />
                            </>
                        }
                    />
                </Routes>
            </Flex>
        </Flex>
    );
}
