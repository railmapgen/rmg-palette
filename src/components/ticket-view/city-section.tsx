import { chakra, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField, RmgSectionHeader } from '@railmapgen/rmg-components';
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

export default function CitySection() {
    const { t, i18n } = useTranslation();
    const dispatch = useRootDispatch();
    const translateName = useTranslatedName();

    const { cityList } = useRootSelector(state => state.app);
    const { country, city, newCity, cityName } = useRootSelector(state => state.ticket);

    const cityOptions: Record<string, string> = {
        ...cityList
            .filter(entry => entry.country === country)
            .map(entry => [entry.id, translateName(entry.name)])
            .sort((a, b) => a[1].localeCompare(b[1], i18n.languages[0])) // sort
            .reduce(
                (acc, cur) => {
                    return { ...acc, [cur[0]]: cur[1] };
                },
                { '': t('Please select...') }
            ),
        new: t('Add a city') + '...',
    };

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

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: t('City'),
            value: city,
            options: cityOptions,
            disabledOptions: [''],
            onChange: value => handleSelectCity(value as string),
        },
        {
            type: 'input',
            label: t('City code'),
            placeholder: 'e.g. hongkong, guangzhou, shanghai',
            value: newCity,
            onChange: value => dispatch(setNewCity(value)),
            validator: value => value !== '' && !value.match(/[^a-z]/),
            hidden: city !== 'new',
        },
    ];

    return (
        <section>
            <RmgSectionHeader>
                <Heading as="h5" size="sm">
                    {t('City')}
                </Heading>
            </RmgSectionHeader>

            <chakra.div px={1}>
                <RmgFields fields={fields} />
                {city === 'new' && (
                    <MultiLangEntryCard
                        entries={cityName}
                        onUpdate={(lang, name) => dispatch(updateCityName({ lang, name }))}
                        onLangSwitch={(prevLang, nextLang) => dispatch(switchCityNameLang({ prevLang, nextLang }))}
                        onRemove={lang => dispatch(removeCityName(lang))}
                    />
                )}
            </chakra.div>
        </section>
    );
}
