import { INVALID_REASON, InvalidReasonType } from '../../util/constants';
import { Button, Heading, HStack, ListItem, ModalBody, ModalFooter, Text, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useTranslatedName from '../hooks/use-translated-name';

interface SubmitModalStepErrorProps {
    countryErrors: InvalidReasonType[];
    cityErrors: InvalidReasonType[];
    lineErrors: Record<string, InvalidReasonType[]>;
    onIgnore: () => void;
    onClose: () => void;
}

export default function SubmitModalStepError(props: SubmitModalStepErrorProps) {
    const { countryErrors, cityErrors, lineErrors, onIgnore, onClose } = props;

    const { t } = useTranslation();
    const translateName = useTranslatedName();

    return (
        <>
            <ModalBody>
                <Text>
                    {t('Your inputs contain the following errors. Please consider fixing it before submitting.')}
                </Text>

                {countryErrors.length > 0 && (
                    <>
                        <Heading as="h5" size="sm" my={2}>
                            {t('Country / Region')}
                        </Heading>
                        <UnorderedList aria-label="List of country errors">
                            {countryErrors.map((e, i) => (
                                <ListItem key={i}>{translateName(INVALID_REASON[e])}</ListItem>
                            ))}
                        </UnorderedList>
                    </>
                )}

                {cityErrors.length > 0 && (
                    <>
                        <Heading as="h5" size="sm" my={2}>
                            {t('City')}
                        </Heading>
                        <UnorderedList aria-label="List of city errors">
                            {cityErrors.map((e, i) => (
                                <ListItem key={i}>{translateName(INVALID_REASON[e])}</ListItem>
                            ))}
                        </UnorderedList>
                    </>
                )}

                {Object.values(lineErrors).flat().length > 0 && (
                    <>
                        <Heading as="h5" size="sm" my={2}>
                            {t('Lines')}
                        </Heading>
                        <UnorderedList aria-label="List of line errors">
                            {Object.entries(lineErrors).map(([item, errors]) => (
                                <ListItem key={item}>
                                    {item}
                                    <UnorderedList>
                                        {errors.map((e, i) => (
                                            <ListItem key={i}>{translateName(INVALID_REASON[e])}</ListItem>
                                        ))}
                                    </UnorderedList>
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <HStack>
                    <Button onClick={onIgnore}>{t('Submit anyway')}</Button>
                    <Button colorScheme="primary" onClick={onClose}>
                        {t('Go back')}
                    </Button>
                </HStack>
            </ModalFooter>
        </>
    );
}
