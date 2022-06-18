import React, { Fragment } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import { useRootDispatch, useRootSelector } from '../../redux';
import {
    addLine,
    addLineName,
    removeLineName,
    updateLineBgColour,
    updateLineFgColour,
    updateLineId,
    updateLineName,
} from '../../redux/ticket/ticket-slice';
import MultiLangEntryCard from './multi-lang-entry-card';
import { MdAdd } from 'react-icons/md';
import { ColourHex } from '../../util/constants';
import { PaletteEntryWithTranslationEntity } from '../../redux/ticket/util';

export default function LinesSection() {
    const dispatch = useRootDispatch();

    const lines = useRootSelector(state => state.ticket.lines);

    const getFields = (entryId: string, line: PaletteEntryWithTranslationEntity): RmgFieldsField[] => [
        {
            type: 'input',
            label: 'Line code',
            placeholder: 'e.g. twl, gz1, sh1',
            value: line.id,
            onChange: value => dispatch(updateLineId({ entryId, lineId: value })),
            validator: value => value !== '' && !value.match(/[^a-z0-9]/),
        },
        {
            type: 'input',
            label: 'Background colour',
            variant: 'color',
            value: line.colour,
            onChange: value => dispatch(updateLineBgColour({ entryId, bgColour: value as ColourHex })),
        },
        {
            type: 'select',
            label: 'Foreground colour',
            value: line.fg,
            options: {
                [MonoColour.white]: 'White',
                [MonoColour.black]: 'Black',
            },
            onChange: value => dispatch(updateLineFgColour({ entryId, fgColour: value as MonoColour })),
        },
    ];

    return (
        <Box as="section">
            <Flex mt={3} mb={2} alignItems="center">
                <Heading as="h5" size="sm" mr="auto">
                    Lines
                </Heading>

                <Button size="xs" variant="ghost" leftIcon={<MdAdd />} mr={1} onClick={() => dispatch(addLine())}>
                    Add line
                </Button>
            </Flex>

            {Object.entries(lines).map(([entryId, line]) => (
                <Fragment key={entryId}>
                    <RmgFields fields={getFields(entryId, line)} />
                    <MultiLangEntryCard
                        entries={line.nameEntity}
                        onUpdate={(id, changes) => dispatch(updateLineName({ entryId, id, changes }))}
                        onAdd={lang => dispatch(addLineName({ entryId, lang }))}
                        onRemove={id => dispatch(removeLineName({ entryId, id }))}
                    />
                </Fragment>
            ))}
        </Box>
    );
}
