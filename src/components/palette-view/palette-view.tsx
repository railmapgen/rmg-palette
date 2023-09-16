import { RmgLoader, RmgPage } from '@railmapgen/rmg-components';

import PageHeader from '../page-header';
import PaletteGrid from '../ag-grid/palette-grid';
import { useRootSelector } from '../../redux';

export default function PaletteView() {
    const { isDataLoading } = useRootSelector(state => state.app);

    return (
        <RmgPage>
            {isDataLoading && <RmgLoader isIndeterminate />}
            <PageHeader />
            <PaletteGrid />
        </RmgPage>
    );
}
