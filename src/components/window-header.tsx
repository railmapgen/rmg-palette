import { Heading } from '@chakra-ui/react';
import { RmgEnvBadge, RmgWindowHeader } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';

export default function WindowHeader() {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    return (
        <RmgWindowHeader>
            <Heading as="h4" size="md">
                {t('Palette')}
            </Heading>
            <RmgEnvBadge environment={environment} version={appVersion} />
        </RmgWindowHeader>
    );
}
