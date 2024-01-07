import { RmgAutoComplete } from '@railmapgen/rmg-components';
import { CityEntry } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { getFlagEmoji } from './emoji-util';
import { useRootSelector } from '../../redux';
import useTranslatedName from '../hooks/use-translated-name';

interface CityPickerProps {
    defaultValueId?: string;
    onChange?: (val: string) => void;
}

export default function CityPicker(props: CityPickerProps) {
    const { defaultValueId, onChange } = props;

    const { i18n } = useTranslation();
    const translateName = useTranslatedName();

    const { cityList } = useRootSelector(state => state.app);
    const currentItem = defaultValueId ? cityList.find(item => item.id === defaultValueId) : undefined;

    const displayHandler = (item: CityEntry) => {
        const isCensorTWFlag =
            item.country === 'TW' && ['zh-Hans', 'zh-CN'].includes(i18n.languages[0] as LanguageCode);

        return (
            <>
                <span className="flag-emoji">{isCensorTWFlag ? '🏴' : getFlagEmoji(item.country)}</span>
                <span>{translateName(item.name)}</span>
            </>
        );
    };

    const filter = (input: string, item: CityEntry): boolean => {
        const lowerCaseInput = input.toLocaleLowerCase();
        return (
            item.id.toLocaleLowerCase().includes(lowerCaseInput) ||
            Object.values(item.name).some(name => name.toLowerCase().includes(lowerCaseInput))
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
