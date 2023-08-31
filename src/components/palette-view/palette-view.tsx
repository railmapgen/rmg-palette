import { RmgPage } from '@railmapgen/rmg-components';
import { Flex } from '@chakra-ui/react';
import PageHeader from '../page-header';
import PaletteGrid from '../ag-grid/palette-grid';
import SidePanel from './side-panel';

export default function PaletteView() {
    return (
        <RmgPage>
            <PageHeader />
            <Flex flex={1} overflow="hidden" position="relative">
                <PaletteGrid />
                <SidePanel />
            </Flex>
        </RmgPage>
    );
}
