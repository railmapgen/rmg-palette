import PageHeader from './page-header';
import { useRootSelector } from '../../redux';
import CityList from './city-list';
import { RMPage, RMPageBody } from '@railmapgen/mantine-components';
import { LoadingOverlay } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function PaletteView() {
    const { t } = useTranslation();
    const { isDataLoading, selectedCountry } = useRootSelector(state => state.app);

    return (
        <RMPage>
            <LoadingOverlay visible={isDataLoading} />
            <PageHeader />
            <RMPageBody>
                <LoadingOverlay
                    visible={!selectedCountry}
                    loaderProps={{ children: t('Select a country or region to begin.') }}
                />
                <CityList />
            </RMPageBody>
        </RMPage>
    );
}
