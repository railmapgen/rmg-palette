import { countryList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app/app-slice';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { useRootSelector } from '../redux';

export default function PageHeader() {
    const dispatch = useDispatch();
    const selectedCountry = useRootSelector(state => state.app.selectedCountry);
    const countryOptions = countryList.reduce<Record<string, string>>(
        (acc, cur) => {
            return { ...acc, [cur.id]: cur.name.en! };
        },
        { '': 'Please select...' }
    );

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: 'Country/Region',
            value: selectedCountry,
            options: countryOptions,
            disabledOptions: [''],
            onChange: value => dispatch(setSelectedCountry(value as string)),
        },
    ];
    return <RmgFields fields={fields} />;
}
