import { Button, Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket } from '../../redux/ticket/ticket-slice';
import { useRootDispatch } from '../../redux';
import SubmitModal from '../modal/submit-modal';
import { useNavigate } from 'react-router-dom';
import { RmgPage } from '@railmapgen/rmg-components';
import { useTranslation } from 'react-i18next';
import rmgRuntime from '@railmapgen/rmg-runtime';
import { Events } from '../../util/constants';

export default function TicketView() {
    const { t } = useTranslation();
    const dispatch = useRootDispatch();
    const navigate = useNavigate();

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const handleReset = () => {
        dispatch(resetTicket());
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
            <Flex direction="column" flex={1} overflowY="auto">
                <CountrySection />
                <CitySection />
                <LinesSection />
            </Flex>

            <Flex my={2}>
                <Button size="sm" onClick={() => navigate('/')}>
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

            <SubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </RmgPage>
    );
}
