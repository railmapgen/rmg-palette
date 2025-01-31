import { MdClose } from 'react-icons/md';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { clearRecentlyUsed, removeRecentlyUsedItem } from '../../redux/app/app-slice';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { Theme } from '@railmapgen/rmg-palette-resources';
import { useState } from 'react';
import { Button, ColorSwatch, Group, Title } from '@mantine/core';
import RMSection, { RMSectionBody, RMSectionHeader } from '../common/rm-section';

type RecentlyUsedProps = {
    onApply: (theme: Theme) => void;
};

export default function RecentlyUsed({ onApply }: RecentlyUsedProps) {
    const { t } = useTranslation();

    const dispatch = useRootDispatch();
    const { recentlyUsed } = useRootSelector(state => state.app);

    const [isClearing, setIsClearing] = useState(false);
    const verb = isClearing ? t('Remove') : t('Apply');

    const handleRemoveItem = (index: number) => {
        dispatch(removeRecentlyUsedItem(index));
        rmgRuntime.event(Events.REMOVE_HISTORY_ITEM, {});
    };

    const handleClearHistory = () => {
        dispatch(clearRecentlyUsed());
        rmgRuntime.event(Events.CLEAR_HISTORY, {});
    };

    return (
        <RMSection w="100%">
            <RMSectionHeader>
                <Title order={2} size="h4">
                    {t('Recently used')}
                </Title>
                <Group gap="xs" ml="auto">
                    {isClearing ? (
                        <>
                            <Button variant="default" size="xs" onClick={handleClearHistory}>
                                {t('Clear all')}
                            </Button>
                            <Button size="xs" onClick={() => setIsClearing(false)}>
                                {t('Done')}
                            </Button>
                        </>
                    ) : (
                        <Button variant="default" size="xs" onClick={() => setIsClearing(true)}>
                            {t('Clear')}
                        </Button>
                    )}
                </Group>
            </RMSectionHeader>

            <RMSectionBody>
                <Group gap="xs" p="xs">
                    {recentlyUsed.map(({ theme, displayName }, idx) => {
                        return (
                            <ColorSwatch
                                key={theme.join('-')}
                                component="button"
                                color={theme[2]}
                                style={{ color: theme[3], fontWeight: 'bold', cursor: 'pointer' }}
                                aria-label={verb + ' ' + displayName}
                                title={verb + ' ' + displayName}
                                onClick={() => (isClearing ? handleRemoveItem(idx) : onApply(theme))}
                            >
                                {isClearing ? <MdClose /> : 'Aa'}
                            </ColorSwatch>
                        );
                    })}
                </Group>
            </RMSectionBody>
        </RMSection>
    );
}
