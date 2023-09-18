import { Heading } from '@chakra-ui/react';
import { RmgEnvBadge, RmgWindowHeader } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';

export const WindowHeader = () => {
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
};

export const TicketWindowHeader = () => {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    return (
        <RmgWindowHeader>
            <Heading as="h4" size="md">
                {t('Palette') + ' - ' + t('Upload')}
            </Heading>
            <RmgEnvBadge environment={environment} version={appVersion} />
        </RmgWindowHeader>
    );
};

export const PickerWindowHeader = () => {
    const { t } = useTranslation();

    return (
        <RmgWindowHeader isAppClipHeader>
            <Heading as="h4" size="md">
                {t('Palette') + ' - ' + t('Picker')}
            </Heading>
        </RmgWindowHeader>
    );
};
