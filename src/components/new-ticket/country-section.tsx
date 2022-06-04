import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import {
    removeCountryName,
    setCountry,
    setNewCountry,
    updateCountryName,
    updateCountryNameLanguage,
} from '../../redux/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CountryCode, countryList } from '@railmapgen/rmg-palette-resources';

export default function CountrySection() {
    const dispatch = useRootDispatch();

    const { country, newCountry, countryName } = useRootSelector(state => state.ticket);

    const countryOptions = {
        ...countryList.reduce<Record<string, string>>((acc, cur) => {
            if (cur.id === CountryCode.UN) {
                // exclude customise
                return acc;
            } else {
                return { ...acc, [cur.id]: cur.name.en! };
            }
        }, {}),
        new: 'Add a new country/region...',
    };

    const countryFields: RmgFieldsField[] = [
        {
            type: 'select',
            label: 'Country/region',
            value: country,
            options: countryOptions,
            onChange: value => dispatch(setCountry(value as CountryCode | 'new')),
        },
        {
            type: 'input',
            label: 'Country code',
            placeholder: 'e.g. CN, HK, JP (ISO 3166-1 alpha-2)',
            value: newCountry,
            onChange: value => dispatch(setNewCountry(value)),
            hidden: country !== 'new',
        },
    ];

    return (
        <Box as="section">
            <Heading as="h5" size="sm" mb={2}>
                Country / Region
            </Heading>

            <RmgFields fields={countryFields} />
            {country === 'new' && (
                <MultiLangEntryCard
                    entries={countryName}
                    onLanguageChange={(prevLang, nextLang) =>
                        dispatch(updateCountryNameLanguage({ prevLang, nextLang }))
                    }
                    onUpdate={(lang, name) => dispatch(updateCountryName({ lang, name }))}
                    onRemove={lang => dispatch(removeCountryName(lang))}
                />
            )}
        </Box>
    );
}
