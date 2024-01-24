import { RmgAutoComplete } from '@railmapgen/rmg-components';
import { CityEntry } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { getFlagEmoji } from './emoji-util';
import { useRootSelector } from '../../redux';
import useTranslatedName from '../hooks/use-translated-name';
import { censorFlag } from '../../util/censor-utils';

interface CityPickerProps {
    defaultValueId?: string;
    onChange?: (val: string) => void;
}

export default function CityPicker(props: CityPickerProps) {
    const { defaultValueId, onChange } = props;

    const { i18n } = useTranslation();
    const translateName = useTranslatedName();

    const { countryList, cityList } = useRootSelector(state => state.app);
    const currentItem = defaultValueId ? cityList.find(item => item.id === defaultValueId) : undefined;

    const displayHandler = (item: CityEntry) => (
        <>
            <span className="flag-emoji">{getFlagEmoji(censorFlag(item.country))}</span>
            <span>{translateName(item.name)}</span>
        </>
    );

    const filter = (input: string, item: CityEntry): boolean => {
        const lowerCaseInput = input.toLocaleLowerCase();
        return (
            item.id.toLocaleLowerCase().includes(lowerCaseInput) || // city id match
            Object.values(item.name).some(name => name.toLocaleLowerCase().includes(lowerCaseInput)) || // city name match
            item.country.toLocaleLowerCase().includes(lowerCaseInput) || // country id match
            Object.values(countryList.find(country => item.country === country.id)?.name ?? {}).some(name =>
                name.toLocaleLowerCase().includes(lowerCaseInput)
            ) // country name match
        );
    };

    const data = cityList
        .slice()
        .map(item => ({ ...item, value: translateName(item.name) }))
        .sort((a, b) => {
            if (a.id === 'other') {
                return 1;
            } else if (b.id === 'other') {
                return -1;
            } else {
                return a.value.localeCompare(b.value, i18n.languages[0]);
            }
        });

    return (
        <RmgAutoComplete
            data={data}
            displayHandler={displayHandler}
            filter={filter}
            value={currentItem && translateName(currentItem.name)}
            onChange={item => onChange?.(item.id)}
        />
    );
}
