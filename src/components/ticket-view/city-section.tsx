import MultiLangEntryCard from './multi-lang-entry-card';
import {
    clearLines,
    populateTicket,
    removeCityName,
    setCity,
    setNewCity,
    switchCityNameLang,
    updateCityName,
} from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import { getTicketByCityId } from '../../redux/ticket/util';
import { Group, NativeSelect, Stack, TextInput, Title } from '@mantine/core';
import { RMSection, RMSectionHeader } from '@railmapgen/mantine-components';

export default function CitySection() {
    const { t, i18n } = useTranslation();
    const dispatch = useRootDispatch();
    const { translateName } = useTranslatedName();

    const { cityList } = useRootSelector(state => state.app);
    const { country, city, newCity, cityName } = useRootSelector(state => state.ticket);

    const cityOptions = [
        { value: '', label: t('Please select...'), disabled: true },
        ...cityList
            .filter(entry => entry.country === country)
            .map(entry => ({
                value: entry.id,
                label: translateName(entry.name),
            }))
            .toSorted((a, b) => a.label.localeCompare(b.label, i18n.languages[0])), // sort

        { value: 'new', label: t('Add a city') + '...' },
    ];

    const handleSelectCity = async (cityId: string) => {
        if (cityId === 'new') {
            dispatch(setCity('new'));
            return;
        }

        const ticket = await getTicketByCityId(cityId, cityList);
        if (ticket) {
            dispatch(populateTicket(ticket));
        } else {
            dispatch(clearLines());
        }
    };

    return (
        <RMSection>
            <RMSectionHeader>
                <Title order={2} size="h4">
                    {t('City')}
                </Title>
            </RMSectionHeader>

            <Stack py={4} gap="xs">
                <Group align="flex-start" grow>
                    <NativeSelect
                        label={t('City')}
                        value={city}
                        onChange={({ currentTarget: { value } }) => handleSelectCity(value)}
                        data={cityOptions}
                    />
                    {city === 'new' && (
                        <TextInput
                            label={t('City code')}
                            placeholder="e.g. hongkong, guangzhou, shanghai"
                            value={newCity}
                            onChange={({ currentTarget: { value } }) => dispatch(setNewCity(value))}
                            error={
                                newCity && newCity.match(/[^a-z]/)
                                    ? 'City code should contain lower case letters only'
                                    : undefined
                            }
                        />
                    )}
                </Group>

                {city === 'new' && (
                    <MultiLangEntryCard
                        entries={cityName}
                        onUpdate={(lang, name) => dispatch(updateCityName({ lang, name }))}
                        onLangSwitch={(prevLang, nextLang) => dispatch(switchCityNameLang({ prevLang, nextLang }))}
                        onRemove={lang => dispatch(removeCityName(lang))}
                    />
                )}
            </Stack>
        </RMSection>
    );
}
