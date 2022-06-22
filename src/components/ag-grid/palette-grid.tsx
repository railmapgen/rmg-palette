import { RmgAgGrid, RmgAgGridColDef } from '@railmapgen/rmg-components';
import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CityEntry, cityList } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
import { IconButton } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { populateTicket } from '../../redux/ticket/ticket-slice';
import { useNavigate } from 'react-router-dom';

export default function PaletteGrid() {
    const dispatch = useRootDispatch();
    const navigate = useNavigate();

    const selectedCountry = useRootSelector(state => state.app.selectedCountry);
    const rowData = cityList.filter(city => city.country === selectedCountry);

    const [columnDefs] = useState<RmgAgGridColDef<CityEntry>[]>([
        {
            headerName: 'City',
            field: 'name',
            valueFormatter: ({ value }: { value: CityEntry['name'] }) => value.en ?? '',
            wrapText: true,
        },
        {
            headerName: 'Lines',
            field: 'id',
            cellRenderer: ({ value }: { value: CityEntry['id'] }) => <LineBadges city={value} />,
            flex: 1,
            autoHeight: true,
            resizable: false,
        },
        {
            headerName: 'Action',
            field: 'id',
            cellRenderer: ({ value }: { value: CityEntry['id'] }) => (
                <IconButton size="xs" aria-label="Edit city" icon={<MdEdit />} onClick={() => handleCityEdit(value)} />
            ),
            resizable: false,
            width: 72,
        },
    ]);

    const defaultColDef = useMemo(() => ({ resizable: true }), []);

    const handleCityEdit = async (id: string) => {
        try {
            const city = cityList.find(city => city.id === id)!;

            const paletteModule = await import(
                /* webpackChunkName: "palettes" */ `@railmapgen/rmg-palette-resources/palettes/${id}.js`
            );
            const { default: palettes } = paletteModule;

            dispatch(populateTicket({ city, palettes }));
            navigate('/new');
        } catch (e) {
            console.error('PaletteGrid.handleCityEdit():: Unexpected errors', e);
        }
    };

    return (
        <RmgAgGrid>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                getRowId={({ data }) => data.id}
                headerHeight={36}
                rowHeight={36}
                suppressCellFocus={true}
                suppressRowVirtualisation={true}
                debug={process.env.NODE_ENV !== 'production'}
            />
        </RmgAgGrid>
    );
}
