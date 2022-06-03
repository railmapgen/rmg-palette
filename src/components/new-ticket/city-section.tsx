import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import { removeCityName, setCity, updateCityName, updateCityNameLanguage } from '../../redux/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';

export default function CitySection() {
    const dispatch = useRootDispatch();

    const { city, cityName } = useRootSelector(state => state.ticket);

    const cityFields: RmgFieldsField[] = [
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

            <RmgFields fields={cityFields} />
            <MultiLangEntryCard
                entries={cityName}
                onLanguageChange={(prevLang, nextLang) => dispatch(updateCityNameLanguage({ prevLang, nextLang }))}
                onUpdate={(lang, name) => dispatch(updateCityName({ lang, name }))}
                onRemove={lang => dispatch(removeCityName(lang))}
            />
        </Box>
    );
}
