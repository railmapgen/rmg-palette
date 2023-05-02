import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import {
    clearLines,
    populateTicket,
    removeCityName,
    setNewCity,
    switchCityNameLang,
    updateCityName,
} from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { cityList } from '@railmapgen/rmg-palette-resources';
import useTranslatedName from '../hooks/use-translated-name';

export default function CitySection() {
    const { t, i18n } = useTranslation();
    const dispatch = useRootDispatch();
    const translateName = useTranslatedName();

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
        new: t('Add a city...'),
    };

    const handleSelectCity = async (cityId: string) => {
        const city = cityList.find(entry => entry.id === cityId);
        if (city) {
            const paletteModule = await import(
                `../../../node_modules/@railmapgen/rmg-palette-resources/palettes/${cityId}.js`
            );
            const { default: palettes } = paletteModule;

            dispatch(populateTicket({ city, palettes }));
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
        <Box as="section">
            <Heading as="h5" size="sm" mt={3} mb={2}>
                {t('City')}
            </Heading>

            <RmgFields fields={fields} />
            {city === 'new' && (
                <MultiLangEntryCard
                    entries={cityName}
                    onUpdate={(lang, name) => dispatch(updateCityName({ lang, name }))}
                    onLangSwitch={(prevLang, nextLang) => dispatch(switchCityNameLang({ prevLang, nextLang }))}
                    onRemove={lang => dispatch(removeCityName(lang))}
                />
            )}
        </Box>
    );
}
