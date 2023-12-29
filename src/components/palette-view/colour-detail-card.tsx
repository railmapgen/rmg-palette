import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { PaletteEntryWithTranslationEntry } from '../../redux/ticket/util';

interface ColourDetailCardProps {
    lineDetail: PaletteEntryWithTranslationEntry;
}

export default function ColourDetailCard(props: ColourDetailCardProps) {
    const { lineDetail } = props;
    const { t } = useTranslation();

    const fields: RmgFieldsField[] = [
        {
            type: 'output',
            label: t('Line code'),
            value: lineDetail.id,
        },
        {
            type: 'output',
            label: t('Background colour'),
            value: lineDetail.colour,
        },
        {
            type: 'output',
            label: t('Pantone® code'),
            value: lineDetail.pantone,
            hidden: !lineDetail.pantone,
        },
        {
            type: 'output',
            label: t('Foreground colour'),
            value: lineDetail.fg === MonoColour.black ? t('Black') : t('White'),
        },
    ];

    return <RmgFields fields={fields} />;
}
