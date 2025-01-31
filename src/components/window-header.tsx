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
        <RMWindowHeader>
            <Title>{t('Palette') + ' - ' + t('Upload')}</Title>
            <RMEnvBadge env={environment} ver={appVersion} ml={5} />
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
