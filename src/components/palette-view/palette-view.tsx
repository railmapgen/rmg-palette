import { RmgLoader, RmgPage } from '@railmapgen/rmg-components';
import { Flex } from '@chakra-ui/react';
import PageHeader from '../page-header';
import PaletteGrid from '../ag-grid/palette-grid';
import SidePanel from './side-panel';
import { useRootSelector } from '../../redux';

export default function PaletteView() {
    const { isDataLoading } = useRootSelector(state => state.app);

    return (
        <RmgPage>
            {isDataLoading && <RmgLoader isIndeterminate />}
            <PageHeader />
            <Flex flex={1} overflow="hidden" position="relative">
                <PaletteGrid />
                <SidePanel />
            </Flex>
        </RmgPage>
    );
}
