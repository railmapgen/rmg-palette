import { RmgAutoComplete } from '@railmapgen/rmg-components';
import { CityEntry, cityList } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { getFlagEmoji } from './emoji-util';

interface CityPickerProps {
    defaultValueId?: string;
    onChange?: (val: string) => void;
}

export default function CityPicker(props: CityPickerProps) {
    const { defaultValueId, onChange } = props;

    const { i18n } = useTranslation();

    const currentItem = defaultValueId ? cityList.find(item => item.id === defaultValueId) : undefined;

    const displayValue = (item: CityEntry): string => {
        return (
            i18n.languages.map(lng => item.name[lng as LanguageCode]).find(name => name !== undefined) ??
            item.name.en ??
            ''
        );
    };

    const displayHandler = (item: CityEntry) => {
        const isCensorTWFlag =
            item.country === 'TW' && ['zh-Hans', 'zh-CN'].includes(i18n.languages[0] as LanguageCode);

        const name = i18n.languages.map(lng => item.name[lng as LanguageCode]).find(name => name !== undefined);

        return (
            <>
                <span className="flag-emoji">{isCensorTWFlag ? '🏴' : getFlagEmoji(item.country)}</span>
                <span>{name}</span>
            </>
        );
    };

    const predicate = (item: CityEntry, input: string): boolean => {
        return Object.values(item.name).some(name => name.toLowerCase().includes(input.toLowerCase()));
    };

    const data = cityList.slice().sort((a, b) => {
        if (a.id === 'other') {
            return 1;
        } else if (b.id === 'other') {
            return -1;
        } else {
            return displayValue(a).localeCompare(displayValue(b), i18n.languages[0]);
        }
    });

    return (
        <RmgAutoComplete
            data={data}
            displayValue={displayValue}
            displayHandler={displayHandler}
            predicate={predicate}
            defaultValue={currentItem}
            onChange={item => onChange?.(item.id)}
        />
    );
}
