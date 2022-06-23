import {
    Button,
    Heading,
    HStack,
    Icon,
    Link,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    OrderedList,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { getGitHubIssueCityBlock, getGitHubIssueLinesBlock, GITHUB_ISSUE_PREAMBLE } from '../../util/constants';
import { MdContentCopy, MdOpenInNew } from 'react-icons/md';
import { RmgDebouncedTextarea } from '@railmapgen/rmg-components';
import { useRootSelector } from '../../redux';
import { ticketSelectors } from '../../redux/ticket/ticket-slice';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmitModal(props: SubmitModalProps) {
    const { isOpen, onClose } = props;

    const [countryErrors, setCountryErrors] = useState<string[]>([]);
    const [cityErrors, setCityErrors] = useState<string[]>([]);
    const [lineErrors, setLineErrors] = useState<Record<string, string[]>>({});
    const [isIgnoreErrors, setIsIgnoreErrors] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const ticket = useRootSelector(state => state.ticket);
    const cityEntry = ticketSelectors.getCityEntry(ticket);
    const paletteList = ticketSelectors.getPalettes(ticket);

    useEffect(() => {
        if (isOpen) {
            setCountryErrors(ticketSelectors.getCountryErrors(ticket));
            setCityErrors(ticketSelectors.getCityErrors(ticket));
            setLineErrors(ticketSelectors.getLineErrors(ticket));
        } else {
            setIsIgnoreErrors(false);
        }
    }, [isOpen]);

    const issueBody = [
        '**Justification:** (Replace the content within these brackets, or we will not proceed your request.)',
        GITHUB_ISSUE_PREAMBLE,
        getGitHubIssueCityBlock(cityEntry),
        getGitHubIssueLinesBlock(paletteList),
    ].join('\n\n');

    const fullSearchParams = new URLSearchParams({
        template: 'new-palettes-request.md',
        label: 'resources',
        title: 'Resources: New palettes of ' + cityEntry?.name?.en,
        body: issueBody,
    });

    const manualSearchParams = new URLSearchParams({
        template: 'new-palettes-request.md',
        label: 'resources',
        title: 'Resources: New palettes of ' + cityEntry?.name?.en,
    });

    const handleCopy = async () => {
        if (textareaRef?.current) {
            textareaRef.current.select();
            await navigator.clipboard.writeText(issueBody);
        }
    };

    const isContainError =
        countryErrors.length > 0 || cityErrors.length > 0 || Object.values(lineErrors).flat().length > 0;

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit palettes</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    {isContainError && (
                        <Text>
                            Your inputs contain the following errors. Please consider fixing it before submitting.
                        </Text>
                    )}

                    {countryErrors.length > 0 && (
                        <>
                            <Heading as="h5" size="sm" my={2}>
                                Country / Region
                            </Heading>
                            <UnorderedList aria-label="List of country errors">
                                {countryErrors.map((e, i) => (
                                    <ListItem key={i}>{e}</ListItem>
                                ))}
                            </UnorderedList>
                        </>
                    )}

                    {cityErrors.length > 0 && (
                        <>
                            <Heading as="h5" size="sm" my={2}>
                                City
                            </Heading>
                            <UnorderedList aria-label="List of city errors">
                                {cityErrors.map((e, i) => (
                                    <ListItem key={i}>{e}</ListItem>
                                ))}
                            </UnorderedList>
                        </>
                    )}

                    {Object.values(lineErrors).flat().length > 0 && (
                        <>
                            <Heading as="h5" size="sm" my={2}>
                                Lines
                            </Heading>
                            <UnorderedList aria-label="List of line errors">
                                {Object.entries(lineErrors).map(([item, errors]) => (
                                    <ListItem key={item}>
                                        {item}
                                        <UnorderedList>
                                            {errors.map((e, i) => (
                                                <ListItem key={i}>{e}</ListItem>
                                            ))}
                                        </UnorderedList>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </>
                    )}

                    {(!isContainError || isIgnoreErrors) && (
                        <>
                            <Text>If the button below doesn't work for you, please follow the instructions below:</Text>
                            <OrderedList>
                                <ListItem>
                                    Open{' '}
                                    <Link
                                        color="teal.500"
                                        href={
                                            'https://github.com/railmapgen/rmg-palette/issues/new?' +
                                            manualSearchParams.toString()
                                        }
                                        isExternal={true}
                                    >
                                        Issue: New Palettes Request <Icon as={MdOpenInNew} />
                                    </Link>
                                    .
                                </ListItem>
                                <ListItem>
                                    Paste following text to the issue body and add anything you want to say.{' '}
                                    <Button size="xs" leftIcon={<MdContentCopy />} onClick={handleCopy}>
                                        Copy
                                    </Button>
                                    <RmgDebouncedTextarea
                                        ref={textareaRef}
                                        isReadOnly={true}
                                        defaultValue={issueBody}
                                        onClick={({ target }) => (target as HTMLTextAreaElement).select()}
                                    />
                                </ListItem>
                            </OrderedList>
                        </>
                    )}
                </ModalBody>

                <ModalFooter>
                    {!isIgnoreErrors && isContainError ? (
                        <HStack>
                            <Button onClick={() => setIsIgnoreErrors(true)}>Submit anyway</Button>
                            <Button colorScheme="teal" onClick={onClose}>
                                Go back
                            </Button>
                        </HStack>
                    ) : (
                        <Button
                            colorScheme="teal"
                            onClick={() =>
                                window.open(
                                    'https://github.com/railmapgen/rmg-palette/issues/new?' +
                                        fullSearchParams.toString(),
                                    '_blank'
                                )
                            }
                        >
                            1-click open issue
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
