import { Heading } from '@chakra-ui/react';
import { RmgEnvBadge, RmgWindowHeader } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';
import RMWindowHeader from './common/rm-window-header';
import { Title } from '@mantine/core';
import RMEnvBadge from './common/rm-env-badge';

export const WindowHeader = () => {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    return (
        <RMWindowHeader>
            <Title>{t('Palette')}</Title>
            <RMEnvBadge env={environment} ver={appVersion} ml={5} />
        </RMWindowHeader>
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
