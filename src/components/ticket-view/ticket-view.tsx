import { useEffect, useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket, TicketState } from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import SubmitModal from '../modal/submit-modal';
import { useTranslation } from 'react-i18next';
import rmgRuntime, { logger } from '@railmapgen/rmg-runtime';
import { DRAFT_TICKET_KEY, Events } from '../../util/constants';
import UnsavedDraftModal from '../modal/unsaved-draft-modal';
import { Button, Divider, Group, LoadingOverlay } from '@mantine/core';
import { RMPage, RMPageBody, RMPageFooter } from '@railmapgen/mantine-components';
import OpenIssuesAlert from './open-issues-alert';

export default function TicketView() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();

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
            } catch {
                logger.error('<TicketView/>, unable to restore draft ticket', draftTicketStr);
            }
        }
    }, []);

    const handleGoBack = () => {
        rmgRuntime.openApp({ appId: 'rmg-palette' });
    };

    const handleReset = () => {
        dispatch(resetTicket());
        rmgRuntime.storage.remove(DRAFT_TICKET_KEY);
        rmgRuntime.event(Events.RESET_TICKET, {});
    };

    return (
        <RMPage w={{ base: '100%', sm: 600 }} style={{ alignSelf: 'center' }}>
            <LoadingOverlay visible={isDataLoading} />

            <RMPageBody direction="column" px="xs" style={{ overflowY: 'auto' }}>
                <CountrySection />
                <CitySection />
                <OpenIssuesAlert />
                <LinesSection />
            </RMPageBody>

            <Divider />

            <RMPageFooter>
                <Group flex={1} gap="sm">
                    <Button variant="default" onClick={handleGoBack}>
                        {t('Go back')}
                    </Button>

                    <Button variant="default" ml="auto" onClick={handleReset}>
                        {t('Reset')}
                    </Button>
                    <Button onClick={() => setIsSubmitModalOpen(true)}>{t('Submit')}</Button>
                </Group>
            </RMPageFooter>

            <UnsavedDraftModal
                isOpen={isUnsavedDraftModalOpen}
                onClose={() => setIsUnsavedDraftModalOpen(false)}
                incomingState={draftTicket}
            />
            <SubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </RMPage>
    );
}
