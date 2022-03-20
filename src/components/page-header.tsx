import { countryList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app/action';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { useAppSelector } from '../redux';

export default function PageHeader() {
    const dispatch = useDispatch();
    const selectedCountry = useAppSelector(state => state.app.selectedCountry);
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
