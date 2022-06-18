import { Button, Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CountrySection from './country-section';
import CitySection from './city-section';
import LinesSection from './lines-section';
import { resetTicket, ticketSelectors } from '../../redux/ticket/ticket-slice';
import { useRootDispatch, useRootSelector } from '../../redux';
import SubmitModal from '../modal/submit-modal';
import { CityEntry, PaletteEntry } from '@railmapgen/rmg-palette-resources';

export default function NewTicket() {
    const dispatch = useRootDispatch();

    const ticket = useRootSelector(state => state.ticket);

    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [submitModalCityEntry, setSubmitModalCityEntry] = useState<CityEntry | null>(null);
    const [submitModalPaletteList, setSubmitModalPaletteList] = useState<PaletteEntry[]>([]);

    const handleSubmit = () => {
        const cityEntry = ticketSelectors.getCityEntry(ticket);
        const palettes = ticketSelectors.getPalettes(ticket);

        setSubmitModalCityEntry(cityEntry);
        setSubmitModalPaletteList(palettes);
        setIsSubmitModalOpen(true);
    };

    const handleSubmitModalClose = () => {
        setIsSubmitModalOpen(false);
        setSubmitModalCityEntry(null);
        setSubmitModalPaletteList([]);
    };

    const invalidReasons = ticketSelectors.getInvalidReasons(ticket);

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
                <Button
                    colorScheme="teal"
                    onClick={handleSubmit}
                    isDisabled={invalidReasons.length !== 0}
                    title={invalidReasons.join(', ')}
                >
                    Submit
                </Button>
            </HStack>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={handleSubmitModalClose}
                cityEntry={submitModalCityEntry}
                paletteList={submitModalPaletteList}
            />
        </Flex>
    );
}
