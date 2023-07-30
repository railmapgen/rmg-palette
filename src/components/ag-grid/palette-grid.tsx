import { RmgAgGrid } from '@railmapgen/rmg-components';
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CityEntry, cityList } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
import { IconButton } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { ColDef } from 'ag-grid-community';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { getTicketByCityId } from '../../redux/ticket/util';
import { populateTicket } from '../../redux/ticket/ticket-slice';

export default function PaletteGrid() {
    const { t, i18n } = useTranslation();
    const translateName = useTranslatedName();
    const dispatch = useRootDispatch();
    const navigate = useNavigate();

    const selectedCountry = useRootSelector(state => state.app.selectedCountry);
    const rowData = cityList.filter(city => city.country === selectedCountry);

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
            },
            {
                headerName: t('Lines'),
                field: 'id',
                cellRenderer: ({ value }: { value: CityEntry['id'] }) => <LineBadges city={value} />,
                flex: 1,
                autoHeight: true,
                resizable: false,
            },
            {
                headerName: t('Action'),
                field: 'id',
                cellRenderer: ({ value }: { value: CityEntry['id'] }) => (
                    <IconButton
                        size="xs"
                        aria-label={t('Edit city')}
                        title={t('Edit city')}
                        icon={<MdEdit />}
                        onClick={() => handleCityEdit(value)}
                    />
                ),
                resizable: false,
                width: 72,
            },
        ],
        [i18n.language]
    );

    const defaultColDef = useMemo(() => ({ resizable: true }), []);

    const handleCityEdit = async (id: string) => {
        if (rmgRuntime.isStandaloneWindow()) {
            const ticket = await getTicketByCityId(id);
            if (ticket) {
                dispatch(populateTicket(ticket));
                navigate('/new');
            }
        } else {
            rmgRuntime.closeApp('rmg-palette-upload');
            setTimeout(() => {
                rmgRuntime.openApp('rmg-palette-upload', '/rmg-palette/#/new?city=' + id);
            }, 200);
        }
        rmgRuntime.event(Events.EDIT_CITY, { city: id });
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
