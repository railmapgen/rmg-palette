import { Button, Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket } from '../../redux/ticket/ticket-slice';
import { useRootDispatch } from '../../redux';
import SubmitModal from '../modal/submit-modal';

export default function NewTicket() {
    const dispatch = useRootDispatch();

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    return (
        <Flex direction="column" flex={1} p={2} width={520} overflow="hidden">
            <Flex direction="column" flex={1} overflowY="auto">
                <CountrySection />
                <CitySection />
                <LinesSection />
            </Flex>

            <HStack alignSelf="flex-end">
                <Button variant="outline" onClick={() => dispatch(resetTicket())}>
                    Reset
                </Button>
                <Button colorScheme="teal" onClick={() => setIsSubmitModalOpen(true)}>
                    Submit
                </Button>
            </HStack>

            <SubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </Flex>
    );
}
