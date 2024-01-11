import { RmgButtonGroup, RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PaletteEntryWithTranslationEntry } from '../../redux/ticket/util';
import { LineDetailUpdates } from '../../redux/ticket/ticket-slice';
import PantoneInput from '../common/pantone-input';

interface ColourEntryCardProps {
    lineDetail: PaletteEntryWithTranslationEntry;
    onUpdate: (updates: LineDetailUpdates) => void;
}

export default function ColourEntryCard(props: ColourEntryCardProps) {
    const { lineDetail, onUpdate } = props;

    const { t } = useTranslation();

    const { pantoneReady } = useRootSelector(state => state.app);

    const [inputWithPantone, setInputWithPantone] = useState(!!lineDetail.pantone);

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
            variant: inputWithPantone ? 'text' : 'color',
            value: lineDetail.colour,
            onChange: value => onUpdate({ colour: value as ColourHex, pantone: undefined }),
            isDisabled: pantoneReady && inputWithPantone,
        },
        {
            type: 'custom',
            label: t('Use Pantone®'),
            component: (
                <RmgButtonGroup
                    selections={colourModeOptions}
                    defaultValue={inputWithPantone}
                    onChange={value => setInputWithPantone(value)}
                />
            ),
            hidden: !pantoneReady,
        },
        {
            type: 'custom',
            label: t('Pantone® code'),
            component: (
                <PantoneInput
                    value={lineDetail.pantone ?? ''}
                    onChange={(value, hex) => onUpdate({ pantone: value, colour: hex })}
                />
            ),
            hidden: !pantoneReady || !inputWithPantone,
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

    return <RmgFields fields={fields} />;
}
