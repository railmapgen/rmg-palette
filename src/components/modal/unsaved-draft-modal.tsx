import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { DRAFT_TICKET_KEY } from '../../util/constants';
import { useRootDispatch } from '../../redux';
import { resetTicket, TicketState } from '../../redux/ticket/ticket-slice';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('Unsaved draft')}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>{t('Do you want to continue with your last unsaved ticket?')}</ModalBody>

                <ModalFooter>
                    <HStack>
                        <Button onClick={handleDiscard}>{t('Discard')}</Button>
                        <Button colorScheme="primary" onClick={handleContinue}>
                            {t('Continue')}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
