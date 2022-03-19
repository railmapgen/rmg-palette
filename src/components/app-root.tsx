import { Flex } from '@chakra-ui/react';
import PaletteDataTable from './data-table/palette-data-table';
import PageHeader from './page-header';
import WindowHeader from './window-header';

export default function AppRoot() {
    return (
        <Flex direction="column" height="100%" overflow="hidden">
            <WindowHeader />
            <Flex direction="column" flex={1} overflow="hidden">
                <PageHeader />
                <PaletteDataTable />
            </Flex>
        </Flex>
    );
}
