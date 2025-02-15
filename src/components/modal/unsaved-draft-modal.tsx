import { DRAFT_TICKET_KEY } from '../../util/constants';
import { useRootDispatch } from '../../redux';
import { resetTicket, TicketState } from '../../redux/ticket/ticket-slice';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Button, Flex, Group, Modal, Text } from '@mantine/core';

interface DiscardDraftModalProps {
    isOpen: boolean;
    onClose: () => void;
    incomingState?: TicketState;
}

export default function UnsavedDraftModal(props: DiscardDraftModalProps) {
    const { isOpen, onClose, incomingState } = props;
    const { t } = useTranslation();

    const dispatch = useRootDispatch();

    const handleDiscard = () => {
        rmgRuntime.storage.remove(DRAFT_TICKET_KEY);
        onClose();
    };

    const handleContinue = () => {
        if (incomingState) dispatch(resetTicket(incomingState));
        onClose();
    };

    return (
        <Modal opened={isOpen} onClose={onClose} title={t('Unsaved draft')}>
            <Flex direction="column">
                <Text>{t('Do you want to continue with your last unsaved ticket?')}</Text>

                <Group gap="xs" mt="xs">
                    <Button variant="default" ml="auto" onClick={handleDiscard}>
                        {t('Discard')}
                    </Button>
                    <Button onClick={handleContinue}>{t('Continue')}</Button>
                </Group>
            </Flex>
        </Modal>
    );
}
