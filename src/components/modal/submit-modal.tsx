import {
    Button,
    Flex,
    Icon,
    Link,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    OrderedList,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { CityEntry, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { getGitHubIssueCityBlock, getGitHubIssueLinesBlock, GITHUB_ISSUE_PREAMBLE } from '../../util/constants';
import { MdOpenInNew } from 'react-icons/md';
import { RmgDebouncedTextarea } from '@railmapgen/rmg-components';

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    cityEntry: CityEntry | null;
    paletteList: PaletteEntry[];
}

export default function SubmitModal(props: SubmitModalProps) {
    const { isOpen, onClose, cityEntry, paletteList } = props;

    const issueBody = [
        '(Input anything you want here)',
        GITHUB_ISSUE_PREAMBLE,
        getGitHubIssueCityBlock(cityEntry),
        getGitHubIssueLinesBlock(paletteList),
    ].join('\n\n');

    const searchParams = new URLSearchParams({
        template: 'new-palettes-request.md',
        label: 'resources',
        title: 'Resources: New palettes of ' + cityEntry?.name?.en,
        body: issueBody,
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit palettes</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Flex mb={3} justifyContent="center">
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            onClick={() =>
                                window.open(
                                    'https://github.com/railmapgen/rmg-palette/issues/new?' + searchParams.toString(),
                                    '_blank'
                                )
                            }
                        >
                            New GitHub issue in one click
                        </Button>
                    </Flex>

                    <Text>If the button above doesn't work for you, please follow the instruction below:</Text>
                    <OrderedList>
                        <ListItem>
                            Open{' '}
                            <Link
                                color="teal.500"
                                href={'https://github.com/railmapgen/rmg-palette/issues'}
                                isExternal={true}
                            >
                                Issues Page of railmapgen/rmg-palette <Icon as={MdOpenInNew} />
                            </Link>{' '}
                            and click 'New issue' button.
                        </ListItem>
                        <ListItem>Login to GitHub at the top right corner if you haven't done so.</ListItem>
                        <ListItem>
                            Paste following text to the issue body and add anything you want to say.
                            <RmgDebouncedTextarea
                                isReadOnly={true}
                                defaultValue={issueBody}
                                onClick={({ target }) => (target as HTMLTextAreaElement).select()}
                            />
                        </ListItem>
                    </OrderedList>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
