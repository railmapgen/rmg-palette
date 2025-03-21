import classes from '../common/palette-card.module.css';
import { ActionIcon, Card, Group, Stack, Switch, Text, TextInput } from '@mantine/core';
import useTranslatedName from '../hooks/use-translated-name';
import { ColourHex, MonoColour } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { PaletteEntryWithTranslationEntry } from '../../redux/ticket/util';
import { LineDetailUpdates } from '../../redux/ticket/ticket-slice';
import { LanguageCode } from '@railmapgen/rmg-translate';
import { useRootSelector } from '../../redux';
import { useRef, useState } from 'react';
import PantoneInput from '../common/pantone-input';
import MultiLangEntryCard from './multi-lang-entry-card';
import { MdContentCopy, MdDeleteOutline, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RMLabelledSegmentedControl } from '@railmapgen/mantine-components';
import CompatibleColourInput from '../common/compatible-colour-input';

type EditablePaletteCardProps = {
    lineDetail: PaletteEntryWithTranslationEntry;
    onUpdate?: (updates: LineDetailUpdates) => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onCopy?: () => void;
    onRemove?: () => void;
    onNameUpdate?: (lang: LanguageCode, name: string) => void;
    onLangSwitch?: (prevLang: LanguageCode, nextLang: LanguageCode) => void;
    onNameRemove?: (lang: LanguageCode) => void;
};

export default function EditablePaletteCard({
    lineDetail,
    onUpdate,
    onMoveUp,
    onMoveDown,
    onCopy,
    onRemove,
    onNameUpdate,
    onNameRemove,
    onLangSwitch,
}: EditablePaletteCardProps) {
    const { t } = useTranslation();
    const { translateName } = useTranslatedName();

    const { pantoneReady } = useRootSelector(state => state.app);
    const [inputWithPantone, setInputWithPantone] = useState(!!lineDetail.pantone);
    const [editing, setEditing] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleEdit = () => {
        if (editing) {
            setEditing(false);
        } else {
            setEditing(true);
            setTimeout(() => {
                cardRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    };

    const fgOptions = [
        { label: t('Black'), value: MonoColour.black },
        { label: t('White'), value: MonoColour.white },
    ];

    const fgColour = lineDetail.fg === MonoColour.black ? 'black' : 'white';

    return (
        <Card ref={cardRef} className={classes.editable} withBorder>
            <Card.Section bg={lineDetail.colour} className={classes['card-section']}>
                <Text span style={{ color: fgColour }}>
                    {translateName(Object.fromEntries(lineDetail.nameEntity))}
                </Text>

                <Group gap="xs" ml="auto">
                    <ActionIcon
                        size="xs"
                        variant="subtle"
                        color={fgColour}
                        aria-label={t('Move up')}
                        title={t('Move up')}
                        onClick={onMoveUp}
                    >
                        <MdKeyboardArrowUp />
                    </ActionIcon>
                    <ActionIcon
                        size="xs"
                        variant="subtle"
                        color={fgColour}
                        aria-label={t('Move down')}
                        title={t('Move down')}
                        onClick={onMoveDown}
                    >
                        <MdKeyboardArrowDown />
                    </ActionIcon>
                    <ActionIcon
                        size="xs"
                        variant="subtle"
                        color={fgColour}
                        aria-label={t('Edit')}
                        title={t('Edit')}
                        onClick={handleEdit}
                    >
                        <MdEdit />
                    </ActionIcon>
                    <ActionIcon
                        size="xs"
                        variant="subtle"
                        color={fgColour}
                        aria-label={t('Duplicate')}
                        title={t('Duplicate')}
                        onClick={onCopy}
                    >
                        <MdContentCopy />
                    </ActionIcon>
                    <ActionIcon
                        size="xs"
                        variant="subtle"
                        color={fgColour}
                        aria-label={t('Remove')}
                        title={t('Remove')}
                        onClick={onRemove}
                    >
                        <MdDeleteOutline />
                    </ActionIcon>
                </Group>
            </Card.Section>

            {editing && (
                <Stack gap="xs" mt="xs">
                    <Group gap="xs" className={classes['editable-group']}>
                        <TextInput
                            label={t('Line code')}
                            placeholder="e.g. twl, gz1, sh1"
                            value={lineDetail.id}
                            onChange={({ currentTarget: { value } }) => onUpdate?.({ id: value })}
                            error={
                                lineDetail.id?.match(/[^a-z0-9]/) ? t('Line code should be alphanumeric') : undefined
                            }
                        />
                        <CompatibleColourInput
                            label={t('Background colour')}
                            value={lineDetail.colour}
                            onChange={value => onUpdate?.({ colour: value as ColourHex })}
                            disabled={pantoneReady && inputWithPantone}
                        />
                        {pantoneReady && (
                            <Switch
                                label={t('Use Pantone®')}
                                checked={inputWithPantone}
                                onChange={({ currentTarget: { checked } }) => setInputWithPantone(checked)}
                                mt="xl"
                            />
                        )}
                        {pantoneReady && inputWithPantone && (
                            <PantoneInput
                                value={lineDetail.pantone ?? ''}
                                onChange={(value, hex) => onUpdate?.({ pantone: value, colour: hex })}
                            />
                        )}
                        <RMLabelledSegmentedControl
                            size="sm"
                            label={t('Foreground colour')}
                            data={fgOptions}
                            value={lineDetail.fg}
                            onChange={value => onUpdate?.({ fg: value as MonoColour })}
                        />
                    </Group>
                    <MultiLangEntryCard
                        entries={lineDetail.nameEntity}
                        onUpdate={(lang, name) => onNameUpdate?.(lang, name)}
                        onLangSwitch={(prevLang, nextLang) => onLangSwitch?.(prevLang, nextLang)}
                        onRemove={lang => onNameRemove?.(lang)}
                    />
                </Stack>
            )}
        </Card>
    );
}
