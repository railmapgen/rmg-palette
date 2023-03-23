import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import {
    removeCountryName,
    setCountry,
    setNewCountry,
    setNewCountryLang,
    switchCountryNameLang,
    updateCountryName,
} from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import { CountryCode, countryList } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { LANGUAGE_NAMES, LanguageCode } from '@railmapgen/rmg-translate';

export default function CountrySection() {
    const { t, i18n } = useTranslation();
    const translateName = useTranslatedName();

    const dispatch = useRootDispatch();

    const { country, newCountry, countryName, newCountryLang } = useRootSelector(state => state.ticket);

    const countryOptions = {
        ...countryList
            .map(country => [country.id, translateName(country.name)]) // translate country name
            .sort((a, b) => a[1].localeCompare(b[1], i18n.languages[0])) // sort
            .reduce<Record<string, string>>((acc, cur) => {
                if (cur[0] === CountryCode.UN) {
                    // exclude customise
                    return acc;
                } else {
                    return { ...acc, [cur[0]]: cur[1] };
                }
            }, {}), // associate to obj
        new: t('Add a country/region...'),
    };

    const languageOptions = Object.entries(LANGUAGE_NAMES).reduce(
        (acc, cur) => ({
            ...acc,
            [cur[0]]: translateName(cur[1]),
        }),
        {} as Record<LanguageCode, string>
    );

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: t('Country / Region'),
            value: country,
            options: countryOptions,
            onChange: value => dispatch(setCountry(value as CountryCode | 'new')),
        },
        {
            type: 'input',
            label: t('Country/region code'),
            placeholder: 'e.g. CN, HK, JP (ISO 3166-1 alpha-2)',
            value: newCountry,
            onChange: value => dispatch(setNewCountry(value)),
            hidden: country !== 'new',
        },
        {
            type: 'select',
            label: t('Official language'),
            value: newCountryLang,
            options: languageOptions,
            onChange: value => dispatch(setNewCountryLang(value ? (value as LanguageCode) : undefined)),
            hidden: country !== 'new',
        },
    ];

    return (
        <Box as="section">
            <Heading as="h5" size="sm" mb={2}>
                {t('Country / Region')}
            </Heading>

            <RmgFields fields={fields} />
            {country === 'new' && (
                <MultiLangEntryCard
                    entries={countryName}
                    onUpdate={(lang, name) => dispatch(updateCountryName({ lang, name }))}
                    onLangSwitch={(prevLang, nextLang) => dispatch(switchCountryNameLang({ prevLang, nextLang }))}
                    onRemove={lang => dispatch(removeCountryName(lang))}
                />
            )}
        </Box>
    );
}
