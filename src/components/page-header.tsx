import { countryList } from '@railmapgen/rmg-palette-resources';
import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../redux/app/app-slice';
import { RmgFields, RmgFieldsField, RmgPageHeader } from '@railmapgen/rmg-components';
import { useRootSelector } from '../redux';
import { Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTranslatedName from './hooks/use-translated-name';

export default function PageHeader() {
    const { t } = useTranslation();
    const translateName = useTranslatedName();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedCountry = useRootSelector(state => state.app.selectedCountry);

    const countryOptions = countryList.reduce<Record<string, string>>(
        (acc, cur) => {
            return { ...acc, [cur.id]: translateName(cur.name) };
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

    return (
        <RmgPageHeader>
            <RmgFields fields={fields} />

            <HStack ml="auto">
                <Button variant="solid" size="sm" colorScheme="teal" onClick={() => navigate('/new')}>
                    {t('Add a city')}
                </Button>
            </HStack>
        </RmgPageHeader>
    );
}
