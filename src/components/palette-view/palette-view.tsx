import { RmgPage } from '@railmapgen/rmg-components';

import PageHeader from '../page-header';
import PaletteGrid from '../ag-grid/palette-grid';

export default function PaletteView() {
    return (
        <RmgPage>
            <PageHeader />
            <PaletteGrid />
        </RmgPage>
    );
}
