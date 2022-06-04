import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import { addCityName, removeCityName, setCity, updateCityName } from '../../redux/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';

export default function CitySection() {
    const dispatch = useRootDispatch();

    const { city, cityName } = useRootSelector(state => state.ticket);

    const fields: RmgFieldsField[] = [
        {
            type: 'input',
            label: 'City code',
            placeholder: 'e.g. hongkong, guangzhou, shanghai',
            value: city,
            onChange: value => dispatch(setCity(value)),
        },
    ];

    return (
        <Box as="section">
            <Heading as="h5" size="sm" mt={3} mb={2}>
                City
            </Heading>

            <RmgFields fields={fields} />
            <MultiLangEntryCard
                entries={cityName}
                onUpdate={(id, changes) => dispatch(updateCityName({ id, changes }))}
                onAdd={lang => dispatch(addCityName(lang))}
                onRemove={id => dispatch(removeCityName(id))}
            />
        </Box>
    );
}
