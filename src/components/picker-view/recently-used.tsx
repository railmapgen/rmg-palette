import { RmgSectionHeader } from '@railmapgen/rmg-components';
import { Button, ButtonGroup, Heading, IconButton, Wrap, WrapItem } from '@chakra-ui/react';
import { MdCircle, MdDelete } from 'react-icons/md';
import { useRootDispatch, useRootSelector } from '../../redux';
import { useTranslation } from 'react-i18next';
import { clearRecentlyUsed, removeRecentlyUsedItem } from '../../redux/app/app-slice';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';
import { Theme } from '@railmapgen/rmg-palette-resources';
import { useState } from 'react';

type RecentlyUsedProps = {
    onApply: (theme: Theme) => void;
};

export default function RecentlyUsed({ onApply }: RecentlyUsedProps) {
    const { t } = useTranslation();

    const dispatch = useRootDispatch();
    const { recentlyUsed } = useRootSelector(state => state.app);

    const [isClearing, setIsClearing] = useState(false);

    const handleRemoveItem = (index: number) => {
        dispatch(removeRecentlyUsedItem(index));
        rmgRuntime.event(Events.REMOVE_HISTORY_ITEM, {});
    };

    const handleClearHistory = () => {
        dispatch(clearRecentlyUsed());
        rmgRuntime.event(Events.CLEAR_HISTORY, {});
    };

    return (
        <section>
            <RmgSectionHeader>
                <Heading as="h5" size="xs">
                    {t('Recently used')}
                </Heading>

                {isClearing ? (
                    <>
                        <Button variant="ghost" size="xs" onClick={handleClearHistory}>
                            {t('Clear all')}
                        </Button>
                        <Button
                            colorScheme="primary"
                            size="xs"
                            onClick={() => setIsClearing(false)}
                            sx={{ ml: '1 !important' }}
                        >
                            {t('Done')}
                        </Button>
                    </>
                ) : (
                    <Button variant="ghost" size="xs" onClick={() => setIsClearing(true)}>
                        {t('Clear')}
                    </Button>
                )}
            </RmgSectionHeader>

            <Wrap>
                {recentlyUsed.map(({ theme, displayName }, idx) => (
                    <WrapItem key={theme.join('-')}>
                        <ButtonGroup size="xs" isAttached>
                            <IconButton
                                size="xs"
                                aria-label={t('Apply') + ' ' + displayName}
                                title={displayName}
                                mt="0.45px"
                                color={theme[3]}
                                bg={theme[2]}
                                icon={<MdCircle />}
                                onClick={() => onApply(theme)}
                            />
                            {isClearing && (
                                <IconButton
                                    variant="outline"
                                    aria-label={t('Remove') + ' ' + displayName}
                                    title={t('Remove') + ' ' + displayName}
                                    mt="0.45px"
                                    icon={<MdDelete />}
                                    onClick={() => handleRemoveItem(idx)}
                                />
                            )}
                        </ButtonGroup>
                    </WrapItem>
                ))}
            </Wrap>
        </section>
    );
}
