import { RmgButtonGroup, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import {
    updateLineBgColour,
    updateLineFgColour,
    updateLineId,
    updateLinePantone,
} from '../../redux/ticket/ticket-slice';
import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { getRGBByPantone } from '../../service/pantone-service';
import { flushSync } from 'react-dom';

interface ColourEntryCardProps {
    entryId: string;
    pantoneReady?: boolean;
}

export default function ColourEntryCard(props: ColourEntryCardProps) {
    const { entryId, pantoneReady } = props;

    const { t } = useTranslation();

    const dispatch = useRootDispatch();
    const lines = useRootSelector(state => state.ticket.lines);
    const line = lines[entryId];

    const [colourMode, setColourMode] = useState<'pantone' | 'hex'>('hex');
    const [pantoneInput, setPantoneInput] = useState('');

    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        controllerRef.current.abort();
        const line = lines[entryId];
        if (line?.pantone) {
            setPantoneInput(line.pantone);
            setColourMode('pantone');
        } else {
            setPantoneInput('');
            setColourMode('hex');
        }
    }, [entryId]);

    const handlePantoneInput = async (value: string) => {
        controllerRef.current.abort();

        if (!line || !pantoneReady) {
            return;
        }

        controllerRef.current = new AbortController();
        try {
            const hex = await getRGBByPantone(value, controllerRef.current.signal);
            dispatch(updateLinePantone({ entryId, pantone: value, hex }));
            setPantoneInput(value);
        } catch (e) {
            flushSync(() => {
                setPantoneInput(value);
            });
            setPantoneInput(line.pantone ?? '');
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
            value: line.id,
            onChange: value => dispatch(updateLineId({ entryId, lineId: value })),
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
            value: line.colour,
            onChange: value => dispatch(updateLineBgColour({ entryId, bgColour: value as ColourHex })),
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
            value: line.fg,
            options: {
                [MonoColour.white]: t('White'),
                [MonoColour.black]: t('Black'),
            },
            onChange: value => dispatch(updateLineFgColour({ entryId, fgColour: value as MonoColour })),
        },
    ];

    return <RmgFields fields={fields} />;
}
