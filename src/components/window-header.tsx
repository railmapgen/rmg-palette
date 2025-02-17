import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Title } from '@mantine/core';
import { RMEnvBadge, RMWindowHeader } from '@railmapgen/mantine-components';

export const WindowHeader = () => {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    return (
        <RMWindowHeader>
            <Title>{t('Palette')}</Title>
            <RMEnvBadge env={environment} ver={appVersion} />
        </RMWindowHeader>
    );
};

export const TicketWindowHeader = () => {
    const { t } = useTranslation();

    const environment = rmgRuntime.getEnv();
    const appVersion = rmgRuntime.getAppVersion();

    return (
        <RMWindowHeader>
            <Title>{t('Palette') + ' - ' + t('Upload')}</Title>
            <RMEnvBadge env={environment} ver={appVersion} />
        </RMWindowHeader>
    );
};

export const PickerWindowHeader = () => {
    const { t } = useTranslation();

    return (
        <RMWindowHeader isAppClipHeader>
            <Title>{t('Palette') + ' - ' + t('Picker')}</Title>
        </RMWindowHeader>
    );
};
