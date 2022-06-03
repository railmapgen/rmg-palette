import { Button, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';

export default function NewTicket() {
    return (
        <Flex direction="column" flex={1} p={2} width={520} overflow="hidden">
            <Flex direction="column" flex={1} overflowY="auto">
                <CountrySection />
                <CitySection />
                <LinesSection />
            </Flex>

            <HStack alignSelf="flex-end">
                <Button variant="outline">Reset</Button>
                <Button colorScheme="teal">Submit</Button>
            </HStack>
        </Flex>
    );
}
