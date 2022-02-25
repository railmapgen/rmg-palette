import DataTable, { DataTableFieldType } from './data-table';
import { cityList, CityEntry } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
export default function PaletteDataTable() {
    const data = cityList.filter(city => {
        if (city.country === 'CN') {
            return true;
        } else {
            return false;
        }
    });

    const fields: DataTableFieldType<CityEntry>[] = [
        { label: 'City', displayHandler: city => city.name.en! },
        { label: 'Lines', displayHandler: city => <LineBadges city={city.id}></LineBadges> },
    ];

    return <DataTable data={data} fields={fields} />;
}
