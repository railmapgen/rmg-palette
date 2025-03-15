import { useRootDispatch, useRootSelector } from '../../redux';
import {
    addLine,
    copyLine,
    moveLineDown,
    moveLineUp,
    removeLine,
    removeLineName,
    switchLineNameLang,
    updateLineDetail,
    updateLineName,
} from '../../redux/ticket/ticket-slice';
import { MdAdd } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import PantoneChecker from './pantone-checker';
import EditablePaletteCard from './editable-palette-card';
import { Button, Stack, Title } from '@mantine/core';
import { useCallback, useRef } from 'react';
import { RMSection, RMSectionHeader } from '@railmapgen/mantine-components';

export default function LinesSection() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const lines = useRootSelector(state => state.ticket.lines);

    const stackRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            stackRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, [stackRef.current]);

    const handleCopy = (entryId: string) => {
        dispatch(copyLine(entryId));
        scrollToBottom();
    };

    const handleAdd = () => {
        dispatch(addLine());
        scrollToBottom();
    };

    return (
        <RMSection>
            <RMSectionHeader>
                <Title order={2} size="h4">
                    {t('Lines')}
                </Title>

                <PantoneChecker ml="auto" />
            </RMSectionHeader>

            <Stack ref={stackRef} py={4} gap="xs">
                {Object.entries(lines).map(([entryId, line]) => (
                    <EditablePaletteCard
                        key={entryId}
                        lineDetail={line}
                        onUpdate={updates => dispatch(updateLineDetail({ entryId, updates }))}
                        onMoveUp={() => dispatch(moveLineUp(entryId))}
                        onMoveDown={() => dispatch(moveLineDown(entryId))}
                        onCopy={() => handleCopy(entryId)}
                        onRemove={() => dispatch(removeLine(entryId))}
                        onNameUpdate={(lang, name) => dispatch(updateLineName({ entryId, lang, name }))}
                        onLangSwitch={(prevLang, nextLang) =>
                            dispatch(switchLineNameLang({ entryId, prevLang, nextLang }))
                        }
                        onNameRemove={lang => dispatch(removeLineName({ entryId, lang }))}
                    />
                ))}

                <Button size="xs" variant="outline" leftSection={<MdAdd />} ml="auto" onClick={handleAdd}>
                    {t('Add a line')}
                </Button>
            </Stack>
        </RMSection>
    );
}
