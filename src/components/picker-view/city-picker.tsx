import { CityEntry } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { useRootSelector } from '../../redux';
import useTranslatedName from '../hooks/use-translated-name';
import { ComboboxItem, OptionsFilter, Select, SelectProps } from '@mantine/core';
import { CountryEntry } from '../../../package/src';
import classes from './city-picker.module.css';

interface CityPickerProps {
    defaultValueId?: string;
    onChange?: (val: string) => void;
}

export default function CityPicker(props: CityPickerProps) {
    const { defaultValueId, onChange } = props;

    const { t, i18n } = useTranslation();
    const { translateName } = useTranslatedName();

    const { countryList, cityList } = useRootSelector(state => state.app);
    const cityMap = cityList.reduce<Record<string, CityEntry>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
    const countryMap = countryList.reduce<Record<string, CountryEntry>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

    const defaultValue = defaultValueId && defaultValueId in cityMap ? defaultValueId : null;

    const renderOption: SelectProps['renderOption'] = ({ option }) => {
        const city = cityMap[option.value];
        const country = city ? countryMap[city.country] : null;
        return (
            city &&
            country && (
                <div>
                    <div>{translateName(city.name)}</div>
                    <div className={classes.countryName}>{translateName(country.name)}</div>
                </div>
            )
        );
    };

    const filter: OptionsFilter = ({ options, search }) => {
        const lowerCaseInput = search.toLocaleLowerCase();
        return (options as ComboboxItem[]).filter(option => {
            const city = cityMap[option.value];
            return (
                city &&
                (city.id.toLocaleLowerCase().includes(lowerCaseInput) || // city id match
                    Object.values(city.name).some(name => name.toLocaleLowerCase().includes(lowerCaseInput)) || // city name match
                    city.country.toLocaleLowerCase().includes(lowerCaseInput) || // country id match
                    Object.values(countryMap[city.country]?.name ?? {}).some(name =>
                        name.toLocaleLowerCase().includes(lowerCaseInput)
                    )) // country name match
            );
        });
    };

    const data = cityList
        .map(item => ({ value: item.id, label: translateName(item.name) }))
        .sort((a, b) => {
            if (a.value === 'other') {
                return 1;
            } else if (b.value === 'other') {
                return -1;
            } else {
                return a.label.localeCompare(b.label, i18n.languages[0]);
            }
        });

    return (
        <Select
            label={t('City')}
            data={data}
            value={defaultValue}
            onChange={value => value && onChange?.(value)}
            renderOption={renderOption}
            searchable
            filter={filter}
        />
    );
}
