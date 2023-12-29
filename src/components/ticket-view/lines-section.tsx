import { Button, Heading, VStack } from '@chakra-ui/react';
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
import LineDetailCard from '../common/line-detail-card';
import { RmgSection, RmgSectionHeader } from '@railmapgen/rmg-components';

export default function LinesSection() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const lines = useRootSelector(state => state.ticket.lines);

    return (
        <RmgSection>
            <RmgSectionHeader>
                <Heading as="h5" size="sm" mr="auto">
                    {t('Lines')}
                </Heading>

                <PantoneChecker />
            </RmgSectionHeader>

            <VStack spacing={1} px={1}>
                {Object.entries(lines).map(([entryId, line]) => {
                    return (
                        <LineDetailCard
                            key={entryId}
                            lineDetail={line}
                            editable={true}
                            onUpdate={updates => dispatch(updateLineDetail({ entryId, updates }))}
                            onMoveUp={() => dispatch(moveLineUp(entryId))}
                            onMoveDown={() => dispatch(moveLineDown(entryId))}
                            onCopy={() => dispatch(copyLine(entryId))}
                            onRemove={() => dispatch(removeLine(entryId))}
                            onNameUpdate={(lang, name) => dispatch(updateLineName({ entryId, lang, name }))}
                            onLangSwitch={(prevLang, nextLang) =>
                                dispatch(switchLineNameLang({ entryId, prevLang, nextLang }))
                            }
                            onNameRemove={lang => dispatch(removeLineName({ entryId, lang }))}
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
            </VStack>
        </RmgSection>
    );
}
