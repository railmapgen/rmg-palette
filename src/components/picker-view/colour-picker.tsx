import { RmgAutoComplete, RmgLineBadge } from '@railmapgen/rmg-components';
import { ColourHex, MonoColour, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import usePalette from '../hooks/use-palette';
import useTranslatedName from '../hooks/use-translated-name';

interface ColourPickerProps {
    city?: string;
    defaultValueId?: string;
    onChange?: (lineCode: string, bg: ColourHex, fg: MonoColour, pantone?: string) => void;
    onSubmit?: () => void;
}

export default function ColourPicker(props: ColourPickerProps) {
    const { city, defaultValueId, onChange, onSubmit } = props;

    const translateName = useTranslatedName();

    const paletteList = usePalette(city);

    const currentItem = defaultValueId ? paletteList.find(palette => palette.id === defaultValueId) : undefined;

    const displayHandler = (item: PaletteEntry) => {
        return <RmgLineBadge name={translateName(item.name)} fg={item.fg || MonoColour.white} bg={item.colour} />;
    };

    const filter = (input: string, item: PaletteEntry): boolean => {
        const lowerCaseInput = input.toLocaleLowerCase();
        return (
            item.id.toLocaleLowerCase().includes(lowerCaseInput) ||
            Object.values(item.name).some(name => name.toLocaleLowerCase().includes(lowerCaseInput))
        );
    };

    const data = paletteList.map(item => ({ ...item, value: translateName(item.name) }));

    return (
        <RmgAutoComplete
            data={data}
            displayHandler={displayHandler}
            filter={filter}
            value={currentItem && translateName(currentItem.name)}
            onChange={item => onChange?.(item.id, item.colour, item.fg || MonoColour.white, item.pantone)}
            InputPropsByState={isOpen => ({
                onKeyDown: ({ key }) => !isOpen && key === 'Enter' && onSubmit?.(),
            })}
        />
    );
}
