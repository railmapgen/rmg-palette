import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { Button, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import useTranslatedName from '../hooks/use-translated-name';
import { DATA_SOURCE_DISPLAY_TEXT, DataSource } from '../../util/constants';

const urlValidator = (url: string): boolean => !!url.match(/^https?:\/\//)?.[0];

interface SubmitModalStepJustificationProps {
    dataSource: DataSource | '';
    onDataSourceChange: (value: DataSource | '') => void;
    refLink: string;
    onRefLinkChange: (value: string) => void;
    justification: string;
    onJustificationChange: (value: string) => void;
    onPrev?: () => void;
    onNext: () => void;
}

export default function SubmitModalStepJustification(props: SubmitModalStepJustificationProps) {
    const {
        dataSource,
        onDataSourceChange,
        refLink,
        onRefLinkChange,
        justification,
        onJustificationChange,
        onPrev,
        onNext,
    } = props;

    const { t } = useTranslation();
    const translateName = useTranslatedName();

    const dataSourceOptions = Object.fromEntries([
        ['', t('Please select...')],
        ...Object.entries(DATA_SOURCE_DISPLAY_TEXT).map(([key, translation]) => [key, translateName(translation)]),
    ]);

    const fields: RmgFieldsField[] = [
        {
            type: 'select',
            label: t('Data source'),
            options: dataSourceOptions,
            disabledOptions: [''],
            value: dataSource,
            onChange: value => onDataSourceChange(value as DataSource),
        },
        {
            type: 'input',
            value: refLink,
            label: t('Reference link'),
            placeholder: t('Enter a valid URL, e.g.') + ' https://en.wikipedia.org',
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

    const isNextDisabled = !dataSource || !refLink || !justification || !urlValidator(refLink);

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
