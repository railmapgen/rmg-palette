import { RmgButtonGroup, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { getRGBByPantone } from '../../service/pantone-service';
import { flushSync } from 'react-dom';
import { PaletteEntryWithTranslationEntry } from '../../redux/ticket/util';
import { LineDetailUpdates } from '../../redux/ticket/ticket-slice';

interface ColourEntryCardProps {
    lineDetail: PaletteEntryWithTranslationEntry;
    onUpdate: (updates: LineDetailUpdates) => void;
}

export default function ColourEntryCard(props: ColourEntryCardProps) {
    const { lineDetail, onUpdate } = props;

    const { t } = useTranslation();

    const { pantoneReady } = useRootSelector(state => state.app);

    const [colourMode, setColourMode] = useState<'pantone' | 'hex'>(lineDetail.pantone ? 'pantone' : 'hex');
    const [pantoneInput, setPantoneInput] = useState(lineDetail.pantone ?? '');

    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    const handlePantoneInput = async (value: string) => {
        controllerRef.current.abort();

        if (!pantoneReady) {
            return;
        }

        controllerRef.current = new AbortController();
        try {
            const hex = await getRGBByPantone(value, controllerRef.current.signal);
            onUpdate({ pantone: value, colour: hex });
            setPantoneInput(value);
        } catch (e) {
            flushSync(() => {
                setPantoneInput(value);
            });
            setPantoneInput(lineDetail.pantone ?? '');
        }
    };

    const colourModeOptions = [
        { label: 'RGB', value: 'hex' },
        { label: t('Pantone'), value: 'pantone' },
    ];

    const fields: RmgFieldsField[] = [
        {
            type: 'input',
            label: t('Line code'),
            placeholder: 'e.g. twl, gz1, sh1',
            value: lineDetail.id,
            onChange: value => onUpdate({ id: value }),
            validator: value => value !== '' && !value.match(/[^a-z0-9]/),
        },
        {
            type: 'custom',
            label: t('Colour mode'),
            component: (
                <RmgButtonGroup
                    selections={colourModeOptions}
                    defaultValue={colourMode}
                    onChange={value => setColourMode(value as typeof colourMode)}
                />
            ),
            hidden: !pantoneReady,
        },
        {
            type: 'input',
            label: t('Background colour'),
            variant: 'color',
            value: lineDetail.colour,
            onChange: value => onUpdate({ colour: value as ColourHex }),
            hidden: pantoneReady && colourMode === 'pantone',
        },
        {
            type: 'input',
            label: t('Pantone code'),
            value: pantoneInput,
            onChange: handlePantoneInput,
            debouncedDelay: 1500,
            hidden: !pantoneReady || colourMode !== 'pantone',
        },
        {
            type: 'select',
            label: t('Foreground colour'),
            value: lineDetail.fg,
            options: {
                [MonoColour.white]: t('White'),
                [MonoColour.black]: t('Black'),
            },
            onChange: value => onUpdate({ fg: value as MonoColour }),
        },
    ];

    return <RmgFields fields={fields} />;
}
