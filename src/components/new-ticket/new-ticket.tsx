import { Button, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket, ticketSelectors } from '../../redux/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';

export default function NewTicket() {
    const dispatch = useRootDispatch();

    const ticket = useRootSelector(state => state.ticket);

    const handleSubmit = () => {
        const cityEntry = ticketSelectors.getCityEntry(ticket);
        const palettes = ticketSelectors.getPalettes(ticket);

        alert('city\n' + JSON.stringify(cityEntry) + '\npalettes\n' + JSON.stringify(palettes));
    };

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
                <Button colorScheme="teal" onClick={handleSubmit}>
                    Submit
                </Button>
            </HStack>
        </Flex>
    );
}
