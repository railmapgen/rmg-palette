import classes from './submit-modal.module.css';
import { useEffect, useState } from 'react';
import { DataSource, DRAFT_TICKET_KEY, InvalidReasonType } from '../../util/constants';
import { useRootSelector } from '../../redux';
import { ticketSelectors } from '../../redux/ticket/ticket-slice';
import { useTranslation } from 'react-i18next';
import SubmitModalStepError from './submit-modal-step-error';
import SubmitModalStepJustification from './submit-modal-step-justification';
import SubmitModalStepSubmit from './submit-modal-step-submit';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Modal, Stepper } from '@mantine/core';
import { MdOutlineErrorOutline } from 'react-icons/md';

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

    const [dataSource, setDataSource] = useState<DataSource | ''>('');
    const [refLink, setRefLink] = useState('');
    const [justification, setJustification] = useState('');

    const [isIgnoreErrors, setIsIgnoreErrors] = useState(false);
    const [isFinishJustification, setIsFinishJustification] = useState(false);

    const { countryList } = useRootSelector(state => state.app);
    const ticket = useRootSelector(state => state.ticket);
    const countryEntry = ticketSelectors.getCountryEntry(ticket);
    const cityEntry = ticketSelectors.getCityEntry(ticket);
    const paletteList = ticketSelectors.getPalettes(ticket);

    useEffect(() => {
        if (isOpen) {
            setCountryErrors(ticketSelectors.getCountryErrors(ticket));
            setCityErrors(ticketSelectors.getCityErrors(ticket, countryList));
            setLineErrors(ticketSelectors.getLineErrors(ticket, countryList));
        } else {
            // reset modal
            setIsIgnoreErrors(false);
            setDataSource('');
            setRefLink('');
            setJustification('');
            setIsFinishJustification(false);
        }
    }, [isOpen]);

    const isContainError =
        countryErrors.length > 0 || cityErrors.length > 0 || Object.values(lineErrors).flat().length > 0;
    const isShowStepError = isContainError && !isIgnoreErrors;
    const isShowStepJustification = !isShowStepError && !isFinishJustification;

    const getActiveStep = () => {
        if (isShowStepError) {
            return 0;
        }
        if (isShowStepJustification) {
            return 1;
        }
        return 2;
    };

    const handleCloseAfterFinish = () => {
        if (!isShowStepError && !isShowStepJustification) {
            rmgRuntime.storage.remove(DRAFT_TICKET_KEY);
        }
        onClose();
    };

    return (
        <Modal
            classNames={{ content: classes.content, body: classes.body }}
            opened={isOpen}
            onClose={handleCloseAfterFinish}
            title={t('Submit palettes')}
        >
            <Stepper
                active={getActiveStep()}
                classNames={{ root: classes['stepper-root'], content: classes['stepper-content'] }}
            >
                <Stepper.Step
                    label={t('Validate')}
                    color={isIgnoreErrors ? 'orange' : undefined}
                    completedIcon={isIgnoreErrors ? <MdOutlineErrorOutline size={24} /> : undefined}
                >
                    <SubmitModalStepError
                        countryErrors={countryErrors}
                        cityErrors={cityErrors}
                        lineErrors={lineErrors}
                        onIgnore={() => setIsIgnoreErrors(true)}
                        onClose={onClose}
                    />
                </Stepper.Step>
                <Stepper.Step label={t('Justify')}>
                    <SubmitModalStepJustification
                        dataSource={dataSource}
                        onDataSourceChange={setDataSource}
                        refLink={refLink}
                        onRefLinkChange={setRefLink}
                        justification={justification}
                        onJustificationChange={setJustification}
                        onPrev={isContainError ? () => setIsIgnoreErrors(false) : undefined}
                        onNext={() => setIsFinishJustification(true)}
                    />
                </Stepper.Step>
                <Stepper.Step label={t('Submit')}>
                    <SubmitModalStepSubmit
                        countryEntry={countryEntry}
                        cityEntry={cityEntry}
                        paletteList={paletteList}
                        dataSource={dataSource}
                        refLink={refLink}
                        justification={justification}
                        onPrev={() => setIsFinishJustification(false)}
                    />
                </Stepper.Step>
            </Stepper>
        </Modal>
    );
}
