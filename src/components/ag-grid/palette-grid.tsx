import { RmgAgGrid, RmgAgGridColDef } from '@railmapgen/rmg-components';
import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CityEntry, cityList, CountryCode } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
import { IconButton } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { initCityNames, setCity, setCountry } from '../../redux/ticket/ticket-slice';
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

    const handleCityEdit = (id: string) => {
        const city = cityList.find(city => city.id === id)!;
        dispatch(setCountry(city.country as CountryCode));
        dispatch(setCity(id));
        dispatch(initCityNames(city.name));

        navigate('/new');
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
                debug={process.env.NODE_ENV !== 'production'}
            />
        </RmgAgGrid>
    );
}
