import { Button, Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket } from '../../redux/ticket/ticket-slice';
import { useRootDispatch } from '../../redux';
import SubmitModal from '../modal/submit-modal';
import { RmgPage } from '@railmapgen/rmg-components';
import { useNavigate } from 'react-router-dom';

export default function NewTicket() {
    const dispatch = useRootDispatch();
    const navigate = useNavigate();

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    return (
        <RmgPage px={2} pt={2} width={520}>
            <Flex direction="column" flex={1} overflowY="auto">
                <CountrySection />
                <CitySection />
                <LinesSection />
            </Flex>

            <Flex my={2}>
                <Button size="sm" onClick={() => navigate('/')}>
                    Go back
                </Button>

                <HStack ml="auto">
                    <Button size="sm" variant="outline" onClick={() => dispatch(resetTicket())}>
                        Reset
                    </Button>
                    <Button size="sm" colorScheme="teal" onClick={() => setIsSubmitModalOpen(true)}>
                        Submit
                    </Button>
                </HStack>
            </Flex>

            <SubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </RmgPage>
    );
}
