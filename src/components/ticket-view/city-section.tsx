import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import { removeCityName, setCity, switchCityNameLang, updateCityName } from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';

export default function CitySection() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

    const { city, cityName } = useRootSelector(state => state.ticket);

    const fields: RmgFieldsField[] = [
        {
            type: 'input',
            label: t('City code'),
            placeholder: 'e.g. hongkong, guangzhou, shanghai',
            value: city,
            onChange: value => dispatch(setCity(value)),
            validator: value => value !== '' && !value.match(/[^a-z]/),
        },
    ];

    return (
        <Box as="section">
            <Heading as="h5" size="sm" mt={3} mb={2}>
                {t('City')}
            </Heading>

            <RmgFields fields={fields} />
            <MultiLangEntryCard
                entries={cityName}
                onUpdate={(lang, name) => dispatch(updateCityName({ lang, name }))}
                onLangSwitch={(prevLang, nextLang) => dispatch(switchCityNameLang({ prevLang, nextLang }))}
                onRemove={lang => dispatch(removeCityName(lang))}
            />
        </Box>
    );
}
