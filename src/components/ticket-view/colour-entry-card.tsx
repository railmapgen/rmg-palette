import { RmgButtonGroup, RmgFields, RmgFieldsField, RmgLoader } from '@railmapgen/rmg-components';
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

    const [pantoneInput, setPantoneInput] = useState(!!lineDetail.pantone);
    const [pantoneCode, setPantoneCode] = useState(lineDetail.pantone ?? '');
    const [isLoading, setIsLoading] = useState(false);

    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    const handlePantoneCodeInput = async (value: string) => {
        controllerRef.current.abort();

        if (!pantoneReady) {
            return;
        }

        controllerRef.current = new AbortController();
        setIsLoading(true);
        try {
            const hex = await getRGBByPantone(value, controllerRef.current.signal);
            onUpdate({ pantone: value, colour: hex });
            setPantoneCode(value);
        } catch (e) {
            flushSync(() => {
                setPantoneCode(value);
            });
            setPantoneCode(lineDetail.pantone ?? '');
        } finally {
            setIsLoading(false);
        }
    };

    const colourModeOptions = [
        { label: t('Yes'), value: true },
        { label: t('No'), value: false },
    ];

    const fgOptions = [
        { label: t('Black'), value: MonoColour.black },
        { label: t('White'), value: MonoColour.white },
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
            type: 'input',
            label: t('Background colour'),
            variant: pantoneInput ? 'text' : 'color',
            value: lineDetail.colour,
            onChange: value => onUpdate({ colour: value as ColourHex }),
            isDisabled: pantoneReady && pantoneInput,
        },
        {
            type: 'custom',
            label: t('Use Pantone'),
            component: (
                <RmgButtonGroup
                    selections={colourModeOptions}
                    defaultValue={pantoneInput}
                    onChange={value => setPantoneInput(value)}
                />
            ),
            hidden: !pantoneReady,
        },
        {
            type: 'input',
            label: t('Pantone code'),
            value: pantoneCode,
            onChange: handlePantoneCodeInput,
            debouncedDelay: 1500,
            hidden: !pantoneReady || !pantoneInput,
        },
        {
            type: 'custom',
            label: t('Foreground colour'),
            component: (
                <RmgButtonGroup
                    selections={fgOptions}
                    defaultValue={lineDetail.fg}
                    onChange={value => onUpdate({ fg: value as MonoColour })}
                />
            ),
        },
    ];

    return (
        <>
            {isLoading && <RmgLoader isIndeterminate />}
            <RmgFields fields={fields} />
        </>
    );
}
