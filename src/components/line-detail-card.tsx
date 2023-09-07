import { RmgCard } from '@railmapgen/rmg-components';
import { PaletteEntryWithTranslationEntry } from '../redux/ticket/util';
import useTranslatedName from './hooks/use-translated-name';
import { MdContentCopy, MdDelete, MdEdit } from 'react-icons/md';
import { Flex, HStack, IconButton, SystemStyleObject } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ColourEntryCard from './ticket-view/colour-entry-card';
import { MultiLangEntryCardInner } from './ticket-view/multi-lang-entry-card';
import { LineDetailUpdates } from '../redux/ticket/ticket-slice';
import { useMemo, useState } from 'react';
import { LanguageCode } from '@railmapgen/rmg-translate';

interface LineDetailsCardProps {
    lineDetail: PaletteEntryWithTranslationEntry;
    editable?: boolean;
    onUpdate?: (updates: LineDetailUpdates) => void;
    onCopy?: () => void;
    onRemove?: () => void;
    onNameUpdate?: (lang: LanguageCode, name: string) => void;
    onLangSwitch?: (prevLang: LanguageCode, nextLang: LanguageCode) => void;
    onNameRemove?: (lang: LanguageCode) => void;
}

export default function LineDetailCard(props: LineDetailsCardProps) {
    const { lineDetail, editable, onUpdate, onCopy, onRemove, onNameUpdate, onLangSwitch, onNameRemove } = props;

    const { t } = useTranslation();
    const translateName = useTranslatedName();

    const [editing, setEditing] = useState(false);

    const styles: SystemStyleObject = useMemo(
        () => ({
            bg: lineDetail.colour,
            m: -1,
            w: 'calc(100% + var(--chakra-space-1) * 2)',
            px: 2,

            '&, button': {
                color: lineDetail.fg,
            },

            '& > div': {
                ml: 'auto',
            },
        }),
        [lineDetail.colour, lineDetail.fg]
    );

    const displayName = translateName(Object.fromEntries(lineDetail.nameEntity));

    return (
        <RmgCard direction="column" sx={{ pb: 0 }}>
            <RmgCard sx={styles}>
                {displayName}
                {editable && (
                    <HStack spacing={0.5}>
                        <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label={t('Edit') + ' ' + displayName}
                            title={t('Edit') + ' ' + displayName}
                            icon={<MdEdit />}
                            onClick={() => setEditing(prevState => !prevState)}
                        />
                        <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label={t('Copy') + ' ' + displayName}
                            title={t('Copy') + ' ' + displayName}
                            icon={<MdContentCopy />}
                            onClick={onCopy}
                        />
                        <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label={t('Remove') + ' ' + displayName}
                            title={t('Remove') + ' ' + displayName}
                            icon={<MdDelete />}
                            onClick={onRemove}
                        />
                    </HStack>
                )}
            </RmgCard>

            {editing && (
                <Flex direction="column" my={1}>
                    <ColourEntryCard lineDetail={lineDetail} onUpdate={updates => onUpdate?.(updates)} />
                    <MultiLangEntryCardInner
                        entries={lineDetail.nameEntity}
                        onUpdate={(lang, name) => onNameUpdate?.(lang, name)}
                        onLangSwitch={(prevLang, nextLang) => onLangSwitch?.(prevLang, nextLang)}
                        onRemove={lang => onNameRemove?.(lang)}
                    />
                </Flex>
            )}
        </RmgCard>
    );
}
