import { CountryCode, countryList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app/app-slice';
import { RmgFields, RmgFieldsField, RmgPageHeader } from '@railmapgen/rmg-components';
import { useRootSelector } from '../redux';
import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTranslatedName from './hooks/use-translated-name';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../util/constants';

export default function PageHeader() {
    const { t, i18n } = useTranslation();
    const translateName = useTranslatedName();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedCountry = useRootSelector(state => state.app.selectedCountry);

    const countryOptions = countryList
        .map(country => [country.id, translateName(country.name)]) // translate country name
        .sort((a, b) => a[1].localeCompare(b[1], i18n.languages[0])) // sort
        .reduce<Record<string, string>>(
            (acc, cur) => {
                if (cur[0] === CountryCode.UN) {
                    // exclude customise
                    return acc;
                } else {
                    return { ...acc, [cur[0]]: cur[1] };
                }
            },
            { '': t('Please select...') }
        );

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: t('Country / Region'),
            value: selectedCountry,
            options: countryOptions,
            disabledOptions: [''],
            onChange: value => dispatch(setSelectedCountry(value as string)),
        },
    ];

    const handleAddCity = () => {
        navigate('/new');
        rmgRuntime.event(Events.ADD_CITY, {});
    };

    return (
        <RmgPageHeader>
            <RmgFields fields={fields} />

            <HStack ml="auto">
                <Button variant="solid" size="sm" colorScheme="primary" onClick={handleAddCity}>
                    {t('Add a city')}
                </Button>
            </HStack>
        </RmgPageHeader>
    );
}
