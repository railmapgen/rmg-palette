import { RmgAgGrid } from '@railmapgen/rmg-components';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CityEntry } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import {
    AllCommunityModule,
    ColDef,
    ModuleRegistry,
    provideGlobalGridOptions,
    RowSelectionOptions,
    SelectionChangedEvent,
} from 'ag-grid-community';
import { closeSidePanel, setSidePanelCity } from '../../redux/app/app-slice';

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: 'legacy' });

const rowSelection: RowSelectionOptions = {
    mode: 'singleRow',
    checkboxes: false,
    enableClickSelection: true,
};

export default function PaletteGrid() {
    const { t, i18n } = useTranslation();
    const translateName = useTranslatedName();
    const dispatch = useRootDispatch();

    const { cityList, selectedCountry, sidePanelCity } = useRootSelector(state => state.app);
    const rowData = cityList.filter(city => city.country === selectedCountry);

    const gridRef = useRef<AgGridReact>(null);

    useEffect(() => {
        if (!sidePanelCity) {
            gridRef.current?.api?.deselectAll();
        }
    }, [sidePanelCity]);

    const handleSelectionChanged = useCallback(({ api }: SelectionChangedEvent<CityEntry>) => {
        const rowSelections = api.getSelectedRows().map(row => row.id);
        if (rowSelections.length === 1) {
            dispatch(setSidePanelCity(rowSelections[0]));
        } else {
            dispatch(closeSidePanel());
        }
    }, []);

    const columnDefs = useMemo<ColDef<CityEntry>[]>(
        () => [
            {
                headerName: t('City'),
                field: 'name',
                valueFormatter: ({ value }: { value: CityEntry['name'] }) => translateName(value),
                comparator: (a, b) => translateName(a).localeCompare(translateName(b), i18n.languages[0]),
                sortable: true,
                sort: 'asc',
                wrapText: true,
                filter: true,
            },
            {
                headerName: t('Lines'),
                field: 'id',
                cellRenderer: ({ value }: { value: CityEntry['id'] }) => <LineBadges city={value} />,
                flex: 1,
                autoHeight: true,
                resizable: false,
            },
        ],
        [i18n.language]
    );

    const defaultColDef = useMemo(() => ({ resizable: true }), []);

    return (
        <RmgAgGrid>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                getRowId={({ data }) => data.id}
                headerHeight={36}
                rowHeight={36}
                suppressCellFocus={true}
                suppressRowVirtualisation={true}
                rowSelection={rowSelection}
                debug={process.env.NODE_ENV !== 'production'}
                onSelectionChanged={handleSelectionChanged}
            />
        </RmgAgGrid>
    );
}
