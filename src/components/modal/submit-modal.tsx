import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DRAFT_TICKET_KEY, InvalidReasonType } from '../../util/constants';
import { useRootSelector } from '../../redux';
import { ticketSelectors } from '../../redux/ticket/ticket-slice';
import { useTranslation } from 'react-i18next';
import SubmitModalStepError from './submit-modal-step-error';
import SubmitModalStepJustification from './submit-modal-step-justification';
import SubmitModalStepSubmit from './submit-modal-step-submit';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmitModal(props: SubmitModalProps) {
    const { isOpen, onClose } = props;

    const { t } = useTranslation();

    const [countryErrors, setCountryErrors] = useState<InvalidReasonType[]>([]);
    const [cityErrors, setCityErrors] = useState<InvalidReasonType[]>([]);
    const [lineErrors, setLineErrors] = useState<Record<string, InvalidReasonType[]>>({});

    const [refLink, setRefLink] = useState('');
    const [justification, setJustification] = useState('');

    const [isIgnoreErrors, setIsIgnoreErrors] = useState(false);
    const [isFinishJustification, setIsFinishJustification] = useState(false);

    const ticket = useRootSelector(state => state.ticket);
    const countryEntry = ticketSelectors.getCountryEntry(ticket);
    const cityEntry = ticketSelectors.getCityEntry(ticket);
    const paletteList = ticketSelectors.getPalettes(ticket);

    useEffect(() => {
        if (isOpen) {
            setCountryErrors(ticketSelectors.getCountryErrors(ticket));
            setCityErrors(ticketSelectors.getCityErrors(ticket));
            setLineErrors(ticketSelectors.getLineErrors(ticket));
        } else {
            // reset modal
            setIsIgnoreErrors(false);
            setRefLink('');
            setJustification('');
            setIsFinishJustification(false);
        }
    }, [isOpen]);

    const isContainError =
        countryErrors.length > 0 || cityErrors.length > 0 || Object.values(lineErrors).flat().length > 0;
    const isShowStepError = isContainError && !isIgnoreErrors;
    const isShowStepJustification = !isShowStepError && !isFinishJustification;

    const handleCloseAfterFinish = () => {
        if (!isShowStepError && !isShowStepJustification) {
            window.localStorage.removeItem(DRAFT_TICKET_KEY);
        }
        onClose();
    };

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('Submit palettes')}</ModalHeader>
                <ModalCloseButton onClick={handleCloseAfterFinish} />

                {isShowStepError && (
                    <SubmitModalStepError
                        countryErrors={countryErrors}
                        cityErrors={cityErrors}
                        lineErrors={lineErrors}
                        onIgnore={() => setIsIgnoreErrors(true)}
                        onClose={onClose}
                    />
                )}

                {isShowStepJustification && (
                    <SubmitModalStepJustification
                        refLink={refLink}
                        onRefLinkChange={setRefLink}
                        justification={justification}
                        onJustificationChange={setJustification}
                        onPrev={isContainError ? () => setIsIgnoreErrors(false) : undefined}
                        onNext={() => setIsFinishJustification(true)}
                    />
                )}

                {!isShowStepError && !isShowStepJustification && (
                    <SubmitModalStepSubmit
                        countryEntry={countryEntry}
                        cityEntry={cityEntry}
                        paletteList={paletteList}
                        refLink={refLink}
                        justification={justification}
                        onPrev={() => setIsFinishJustification(false)}
                    />
                )}
            </ModalContent>
        </Modal>
    );
}
