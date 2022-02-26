import { cityList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app/action';
import RmgFields, { RmgFieldsField } from './common/rmg-fields';

export default function PageHeader() {
    const dispatch = useDispatch();
    const countryOptions = cityList.reduce<Record<string, string>>((acc, cur) => {
        if (Object.keys(acc).includes(cur.country)) {
            return acc;
        } else {
            return { ...acc, [cur.country]: cur.country };
        }
    }, {});
    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: 'Country',
            value: undefined,
            options: countryOptions,
            onChange: value => dispatch(setSelectedCountry(value)),
        },
    ];
    return <RmgFields fields={fields} />;
}
