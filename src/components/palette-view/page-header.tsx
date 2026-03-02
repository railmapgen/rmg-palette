import { useDispatch } from 'react-redux';
import { setSelectedCountry } from '../../redux/app/app-slice';
import { useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { Button, NativeSelect } from '@mantine/core';
import { RMPageHeader } from '@railmapgen/mantine-components';

export default function PageHeader() {
    const { t, i18n } = useTranslation();
    const { translateName } = useTranslatedName();

    const dispatch = useDispatch();

    const { countryList, selectedCountry } = useRootSelector(state => state.app);

    const countryOptions = [
        { label: t('Please select...'), value: '', disabled: true },
        ...countryList
            .filter(country => country.id !== 'UN')
            .map(country => [country.id, translateName(country.name)]) // translate country name
            .sort((a, b) => a[1].localeCompare(b[1], i18n.languages[0])) // sort
            .map(([id, label]) => {
                return { label, value: id };
            }),
    ];

    const handleAddCity = () => {
        rmgRuntime.openApp({ appId: 'rmg-palette-upload' });
        rmgRuntime.event(Events.ADD_CITY, {});
    };

    return (
        <RMPageHeader>
            <NativeSelect
                label={t('Country/Region')}
                value={selectedCountry}
                onChange={({ currentTarget: { value } }) => dispatch(setSelectedCountry(value))}
                data={countryOptions}
            />

            <Button variant="filled" ml="auto" onClick={handleAddCity}>
                {t('Add a city')}
            </Button>
        </RMPageHeader>
    );
}
