import { useState } from 'react';
import { Box, Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import { RmgLineBadge } from '@railmapgen/rmg-components';
import { Translation } from '@railmapgen/rmg-palette-resources';
import { useRootDispatch, useRootSelector } from '../../redux';
import {
    addLine,
    addLineName,
    copyLine,
    removeLine,
    removeLineName,
    updateLineName,
} from '../../redux/ticket/ticket-slice';
import MultiLangEntryCard from './multi-lang-entry-card';
import { MdAdd, MdContentCopy, MdDelete, MdEdit } from 'react-icons/md';
import { translationEntitySelector } from '../../redux/ticket/util';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import PantoneChecker from './pantone-checker';
import ColourEntryCard from './colour-entry-card';

export default function LinesSection() {
    const { t } = useTranslation();
    const translateName = useTranslatedName();
    const dispatch = useRootDispatch();

    const lines = useRootSelector(state => state.ticket.lines);

    const [selectedLine, setSelectedLine] = useState(Object.keys(lines)[0]);
    const [pantoneReady, setPantoneReady] = useState<boolean>();

    return (
        <Box as="section">
            <Flex mt={3} mb={2} alignItems="center">
                <Heading as="h5" size="sm" mr="auto">
                    {t('Lines')}
                </Heading>

                <PantoneChecker ready={pantoneReady} onReady={setPantoneReady} />
            </Flex>

            <HStack flexWrap="wrap" sx={{ '& .chakra-badge': { mb: 1 } }}>
                {Object.entries(lines).map(([entryId, line]) => {
                    const nameTranslation = translationEntitySelector
                        .selectAll(line.nameEntity)
                        .reduce<Translation>((acc, cur) => ({ ...acc, [cur.lang]: cur.name }), {});
                    const nameToShow = translateName(nameTranslation);

                    return (
                        <RmgLineBadge
                            key={entryId}
                            name={nameToShow}
                            bg={line.colour}
                            fg={line.fg}
                            actions={
                                <>
                                    <IconButton
                                        size="xs"
                                        variant="ghost"
                                        color={line.fg}
                                        aria-label={t('Edit') + ' ' + nameToShow}
                                        title={t('Edit') + ' ' + nameToShow}
                                        icon={<MdEdit />}
                                        onClick={() => setSelectedLine(entryId)}
                                    />
                                    <IconButton
                                        size="xs"
                                        variant="ghost"
                                        color={line.fg}
                                        aria-label={t('Copy') + ' ' + nameToShow}
                                        title={t('Copy') + ' ' + nameToShow}
                                        icon={<MdContentCopy />}
                                        onClick={() => dispatch(copyLine(entryId))}
                                    />
                                    <IconButton
                                        size="xs"
                                        variant="ghost"
                                        color={line.fg}
                                        aria-label={t('Remove') + ' ' + nameToShow}
                                        title={t('Remove') + ' ' + nameToShow}
                                        icon={<MdDelete />}
                                        onClick={() => dispatch(removeLine(entryId))}
                                    />
                                </>
                            }
                        />
                    );
                })}

                <Button
                    size="xs"
                    variant="ghost"
                    leftIcon={<MdAdd />}
                    ml="auto !important"
                    onClick={() => dispatch(addLine())}
                >
                    {t('Add a line')}
                </Button>
            </HStack>

            {lines[selectedLine] && <ColourEntryCard entryId={selectedLine} pantoneReady={pantoneReady} />}
            <MultiLangEntryCard
                entries={lines[selectedLine]?.nameEntity}
                onUpdate={(id, changes) => dispatch(updateLineName({ entryId: selectedLine, id, changes }))}
                onAdd={lang => dispatch(addLineName({ entryId: selectedLine, lang }))}
                onRemove={id => dispatch(removeLineName({ entryId: selectedLine, id }))}
            />
        </Box>
    );
}
