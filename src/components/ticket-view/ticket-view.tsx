import { Button, Flex, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket, TicketState } from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import SubmitModal from '../modal/submit-modal';
import { useNavigate } from 'react-router-dom';
import { RmgLoader, RmgPage } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { DRAFT_TICKET_KEY, Events } from '../../util/constants';
import UnsavedDraftModal from '../modal/unsaved-draft-modal';

export default function TicketView() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();
    const navigate = useNavigate();

    const { isDataLoading } = useRootSelector(state => state.app);

    const [draftTicket, setDraftTicket] = useState<TicketState>();
    const [isUnsavedDraftModalOpen, setIsUnsavedDraftModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    useEffect(() => {
        const draftTicketStr = rmgRuntime.storage.get(DRAFT_TICKET_KEY);
        if (draftTicketStr) {
            try {
                const draftTicket = JSON.parse(draftTicketStr);
                if (Object.keys(draftTicket.lines).length > 0 && (Object.values(draftTicket.lines)[0] as any).id) {
                    setDraftTicket(draftTicket);
                    setIsUnsavedDraftModalOpen(true);
                }
            } catch (e) {
                console.error('TicketView:: unable to restore draft ticket', draftTicketStr);
            }
        }
    }, []);

    const handleGoBack = () => {
        if (rmgRuntime.isStandaloneWindow()) {
            navigate('/');
        } else {
            rmgRuntime.openApp('rmg-palette');
        }
    };

    const handleReset = () => {
        dispatch(resetTicket());
        rmgRuntime.storage.remove(DRAFT_TICKET_KEY);
        rmgRuntime.event(Events.RESET_TICKET, {});
    };

    return (
        <RmgPage
            px={2}
            pt={2}
            sx={{
                width: { base: '100%', md: 520 },
            }}
        >
            {isDataLoading && <RmgLoader isIndeterminate />}

            <Flex direction="column" flex={1} overflowY="auto">
                <CountrySection />
                <CitySection />
                <LinesSection />
            </Flex>

            <Flex my={2}>
                <Button size="sm" onClick={handleGoBack}>
                    {t('Go back')}
                </Button>

                <HStack ml="auto">
                    <Button size="sm" variant="outline" onClick={handleReset}>
                        {t('Reset')}
                    </Button>
                    <Button size="sm" colorScheme="primary" onClick={() => setIsSubmitModalOpen(true)}>
                        {t('Submit')}
                    </Button>
                </HStack>
            </Flex>

            <UnsavedDraftModal
                isOpen={isUnsavedDraftModalOpen}
                onClose={() => setIsUnsavedDraftModalOpen(false)}
                incomingState={draftTicket}
            />
            <SubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </RmgPage>
    );
}
