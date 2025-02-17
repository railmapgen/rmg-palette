import { useTranslation } from 'react-i18next';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import useTranslatedName from '../hooks/use-translated-name';
import { DATA_SOURCE_DISPLAY_TEXT, DataSource } from '../../util/constants';
import { Button, Group, NativeSelect, Stack, Text, Textarea, TextInput } from '@mantine/core';
import classes from './submit-modal.module.css';

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
    const { translateName } = useTranslatedName();

    const dataSourceOptions = [
        { value: '', label: t('Please select...'), disabled: true },
        ...Object.entries(DATA_SOURCE_DISPLAY_TEXT).map(([key, translation]) => ({
            value: key,
            label: translateName(translation),
        })),
    ];

    const isNextDisabled = !dataSource || !refLink || !justification || !urlValidator(refLink);

    return (
        <>
            <Stack gap="xs" className={classes['step-body']}>
                <Text>{t('Please provide suitable source and justification.')}</Text>
                <NativeSelect
                    label={t('Data source')}
                    value={dataSource}
                    onChange={({ currentTarget: { value } }) => onDataSourceChange(value as DataSource)}
                    data={dataSourceOptions}
                />
                <TextInput
                    label={t('Reference link')}
                    placeholder={t('Enter a valid URL, e.g.') + ' https://en.wikipedia.org'}
                    value={refLink}
                    onChange={({ currentTarget: { value } }) => onRefLinkChange(value)}
                    error={refLink && !urlValidator(refLink) ? t('URL is invalid') : undefined}
                />
                <Textarea
                    label={t('Justification')}
                    placeholder={t('Briefly describe your changes and provide justification')}
                    value={justification}
                    onChange={({ currentTarget: { value } }) => onJustificationChange(value)}
                    autosize
                    minRows={3}
                />
            </Stack>
            <Group gap="sm" pt="xs">
                {onPrev && (
                    <Button variant="default" onClick={onPrev} leftSection={<MdChevronLeft />}>
                        {t('Previous')}
                    </Button>
                )}
                <Button ml="auto" onClick={onNext} rightSection={<MdChevronRight />} disabled={isNextDisabled}>
                    {t('Next')}
                </Button>
            </Group>
        </>
    );
}
