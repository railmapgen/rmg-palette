import { cityList, CityEntry } from '@railmapgen/rmg-palette-resources';
import LineBadges from './line-badges';
import { useAppSelector } from '../../redux';
import { RmgDataTable, RmgDataTableFieldType } from '@railmapgen/rmg-components';

export default function PaletteDataTable() {
    const selectedCountry = useAppSelector(state => state.app.selectedCountry);
    const data = cityList.filter(city => {
        if (city.country === selectedCountry) {
            return true;
        } else {
            return false;
        }
    });

    const fields: RmgDataTableFieldType<CityEntry>[] = [
        { label: 'City', displayHandler: city => city.name.en! },
        { label: 'Lines', displayHandler: city => <LineBadges city={city.id} /> },
    ];

    return <RmgDataTable data={data} fields={fields} />;
}
