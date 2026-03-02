import { ColourHex, MonoColour, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import usePalette from '../hooks/use-palette';
import useTranslatedName from '../hooks/use-translated-name';
import { Badge, ComboboxItem, OptionsFilter, Select, SelectProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface ColourPickerProps {
    city?: string;
    defaultValueId?: string;
    onChange?: (lineCode: string, bg: ColourHex, fg: MonoColour, pantone?: string) => void;
    onSubmit?: () => void;
}

export default function ColourPicker(props: ColourPickerProps) {
    const { city, defaultValueId, onChange, onSubmit } = props;

    const { t } = useTranslation();
    const { translateName } = useTranslatedName();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const paletteList = usePalette(city);
    const paletteMap = paletteList.reduce<Record<string, PaletteEntry>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

    const defaultValue = defaultValueId && defaultValueId in paletteMap ? defaultValueId : null;

    const handleSelect = (value: string | null) => {
        if (value) {
            const line = paletteMap[value];
            onChange?.(line.id, line.colour, line.fg || MonoColour.white, line.pantone);
        }
    };

    const renderOption: SelectProps['renderOption'] = ({ option }) => {
        const line = paletteMap[option.value];
        return (
            line && (
                <Badge size="lg" radius="sm" color={line.colour} style={{ color: line.fg || MonoColour.white }}>
                    {translateName(line.name)}
                </Badge>
            )
        );
    };

    const filter: OptionsFilter = ({ options, search }) => {
        const lowerCaseInput = search.toLocaleLowerCase();
        return (options as ComboboxItem[]).filter(option => {
            const line = paletteMap[option.value];
            return (
                line &&
                (line.id.toLocaleLowerCase().includes(lowerCaseInput) ||
                    Object.values(line.name).some(name => name.toLocaleLowerCase().includes(lowerCaseInput)))
            );
        });
    };

    const data = paletteList.map(item => ({ value: item.id, label: translateName(item.name) }));

    return (
        <Select
            label={t('Line')}
            data={data}
            value={defaultValue}
            onChange={handleSelect}
            renderOption={renderOption}
            searchable
            filter={filter}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            onKeyDown={({ key }) => !isDropdownOpen && key === 'Enter' && onSubmit?.()}
            disabled={!city}
        />
    );
}
