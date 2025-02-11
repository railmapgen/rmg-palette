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
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { LANGUAGE_NAMES, LanguageCode } from '@railmapgen/rmg-translate';
import { Group, NativeSelect, Stack, TextInput, Title } from '@mantine/core';
import { RMSection, RMSectionHeader } from '@railmapgen/mantine-components';

export default function CountrySection() {
    const { t, i18n } = useTranslation();
    const translateName = useTranslatedName();

    const dispatch = useRootDispatch();

    const { countryList } = useRootSelector(state => state.app);
    const { country, newCountry, countryName, newCountryLang } = useRootSelector(state => state.ticket);

    const countryOptions = [
        { value: '', label: t('Please select...'), disabled: true },
        ...countryList
            .filter(country => country.id !== 'UN')
            .map(country => ({ value: country.id, label: translateName(country.name) })) // translate country name
            .toSorted((a, b) => a.label.localeCompare(b.label, i18n.languages[0])), // sort
        { value: 'new', label: t('Add a country/region...') },
    ];

    const languageOptions = Object.entries(LANGUAGE_NAMES).map(([lang, name]) => ({
        value: lang,
        label: translateName(name),
    }));

    return (
        <RMSection>
            <RMSectionHeader>
                <Title order={2} size="h4">
                    {t('Country/Region')}
                </Title>
            </RMSectionHeader>

            <Stack px={8} py={4} gap="xs">
                <Group align="flex-start" grow>
                    <NativeSelect
                        label={t('Country/Region')}
                        value={country}
                        onChange={({ currentTarget: { value } }) => dispatch(setCountry(value))}
                        data={countryOptions}
                    />
                    {country === 'new' && (
                        <TextInput
                            label={t('Country/region code')}
                            placeholder="e.g. CN, HK, JP (ISO 3166-1 alpha-2)"
                            value={newCountry}
                            onChange={({ currentTarget: { value } }) => dispatch(setNewCountry(value))}
                            error={
                                newCountry && !newCountry.match(/^[A-Z]{2}$|^GB[A-Z]{3}$/)
                                    ? t('Country code should be in the format of ISO 3166-1 alpha-2')
                                    : undefined
                            }
                        />
                    )}
                    {country === 'new' && (
                        <NativeSelect
                            label={t('Official language')}
                            value={newCountryLang}
                            onChange={({ currentTarget: { value } }) =>
                                dispatch(setNewCountryLang(value ? (value as LanguageCode) : undefined))
                            }
                            data={languageOptions}
                        />
                    )}
                </Group>

                {country === 'new' && (
                    <MultiLangEntryCard
                        entries={countryName}
                        onUpdate={(lang, name) => dispatch(updateCountryName({ lang, name }))}
                        onLangSwitch={(prevLang, nextLang) => dispatch(switchCountryNameLang({ prevLang, nextLang }))}
                        onRemove={lang => dispatch(removeCountryName(lang))}
                    />
                )}
            </Stack>
        </RMSection>
    );
}
