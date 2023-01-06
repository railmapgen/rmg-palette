import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { Button, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const urlValidator = (url: string): boolean => !!url.match(/^https?:\/\//)?.[0];

interface SubmitModalStepJustificationProps {
    refLink: string;
    onRefLinkChange: (value: string) => void;
    justification: string;
    onJustificationChange: (value: string) => void;
    onPrev?: () => void;
    onNext: () => void;
}

export default function SubmitModalStepJustification(props: SubmitModalStepJustificationProps) {
    const { refLink, onRefLinkChange, justification, onJustificationChange, onPrev, onNext } = props;

    const { t } = useTranslation();

    const fields: RmgFieldsField[] = [
        {
            type: 'input',
            value: refLink,
            label: t('Reference link'),
            placeholder: t('Enter a valid URL'),
            onChange: onRefLinkChange,
            validator: urlValidator,
        },
        {
            type: 'textarea',
            value: justification,
            label: t('Justification'),
            placeholder: t('Briefly describe your changes and provide justification'),
            onChange: onJustificationChange,
        },
    ];

    const isNextDisabled = !refLink || !justification || !urlValidator(refLink);

    return (
        <>
            <ModalBody>
                <Text>{t('Please provide suitable source and justification.')}</Text>
                <RmgFields fields={fields} minW="full" />
            </ModalBody>
            <ModalFooter>
                {onPrev && (
                    <Button variant="ghost" onClick={onPrev} mr="auto" leftIcon={<MdChevronLeft />}>
                        {t('Previous')}
                    </Button>
                )}
                <Button
                    colorScheme="primary"
                    onClick={onNext}
                    rightIcon={<MdChevronRight />}
                    isDisabled={isNextDisabled}
                >
                    {t('Next')}
                </Button>
            </ModalFooter>
        </>
    );
}
