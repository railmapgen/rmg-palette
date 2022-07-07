import { RmgPage } from '@railmapgen/rmg-components';
import React from 'react';
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
