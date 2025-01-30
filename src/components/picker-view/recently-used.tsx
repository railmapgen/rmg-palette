import { MdClose } from 'react-icons/md';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { clearRecentlyUsed, removeRecentlyUsedItem } from '../../redux/app/app-slice';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { Theme } from '@railmapgen/rmg-palette-resources';
import { useState } from 'react';
import { Button, ColorSwatch, Flex, Group, Title } from '@mantine/core';

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
        <Flex component="section" direction="column" w="100%">
            <Flex>
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
            </Flex>

            <Group gap="xs" mt={8}>
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
        </Flex>
    );
}
