import { Box, Heading } from '@chakra-ui/react';
import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import MultiLangEntryCard from './multi-lang-entry-card';
import { addCityName, removeCityName, setCity, updateCityName } from '../../redux/ticket/ticket-slice';
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
                onUpdate={(id, changes) => dispatch(updateCityName({ id, changes }))}
                onAdd={lang => dispatch(addCityName(lang))}
                onRemove={id => dispatch(removeCityName(id))}
            />
        </Box>
    );
}
