import classes from './submit-modal.module.css';
import { MdChevronLeft, MdContentCopy, MdOpenInNew } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { CityEntry, CountryEntry, PaletteEntry } from '@railmapgen/rmg-palette-resources';
import { useRef } from 'react';
import {
    DATA_SOURCE_DISPLAY_TEXT,
    DataSource,
    getGitHubIssueDetailsBlock,
    GITHUB_ISSUE_PREAMBLE,
} from '../../util/constants';
import useTranslatedName from '../hooks/use-translated-name';
import { Anchor, Button, Group, List, Stack, Text, Textarea } from '@mantine/core';

interface SubmitModalStepSubmitProps {
    countryEntry: CountryEntry | null;
    cityEntry: CityEntry;
    paletteList: PaletteEntry[];
    dataSource: DataSource | '';
    refLink: string;
    justification: string;
    onPrev: () => void;
}

export default function SubmitModalStepSubmit(props: SubmitModalStepSubmitProps) {
    const { countryEntry, cityEntry, paletteList, dataSource, refLink, justification, onPrev } = props;

    const { t } = useTranslation();
    const { translateName } = useTranslatedName();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const issueBody = [
        `**Data source:** ${dataSource ? translateName(DATA_SOURCE_DISPLAY_TEXT[dataSource]) : '(REPLACE ME)'}`,
        `**Reference link:** ${refLink || '(REPLACE ME)'}`,
        `**Justification:** ${justification || '(REPLACE ME)'}`,
        GITHUB_ISSUE_PREAMBLE,
        getGitHubIssueDetailsBlock('country', countryEntry),
        getGitHubIssueDetailsBlock('city', cityEntry),
        getGitHubIssueDetailsBlock('lines', paletteList),
    ].join('\n\n');

    const fullSearchParams = new URLSearchParams({
        template: 'new-palettes-request.md',
        labels: 'resources',
        title: 'Resources: New palettes of ' + cityEntry?.name?.en,
        body: issueBody,
    });

    const manualSearchParams = new URLSearchParams({
        template: 'new-palettes-request.md',
        labels: 'resources',
        title: 'Resources: New palettes of ' + cityEntry?.name?.en,
    });

    const handleCopy = async () => {
        if (textareaRef?.current) {
            textareaRef.current.select();
            await navigator.clipboard.writeText(issueBody);
        }
    };

    return (
        <>
            <Stack gap="xs" className={classes['step-body']}>
                <Text>{t("If the button below doesn't work for you, please follow the instructions below:")}</Text>
                <List type="ordered" withPadding>
                    <List.Item>
                        {t('Open')}{' '}
                        <Anchor
                            href={
                                'https://github.com/railmapgen/rmg-palette/issues/new?' + manualSearchParams.toString()
                            }
                            target="_blank"
                        >
                            Issue: New Palettes Request <MdOpenInNew />
                        </Anchor>
                    </List.Item>
                    <List.Item>
                        {t('Paste following text to the issue body')}{' '}
                        <Button size="xs" variant="light" leftSection={<MdContentCopy />} onClick={handleCopy}>
                            {t('Copy')}
                        </Button>
                        <Textarea
                            ref={textareaRef}
                            readOnly={true}
                            defaultValue={issueBody}
                            onClick={({ target }) => (target as HTMLTextAreaElement).select()}
                            mt="xs"
                            autosize
                            maxRows={3}
                        />
                    </List.Item>
                </List>
            </Stack>
            <Group gap="sm" pt="xs">
                <Button variant="default" onClick={onPrev} leftSection={<MdChevronLeft />}>
                    {t('Previous')}
                </Button>
                <Button
                    ml="auto"
                    onClick={() =>
                        window.open(
                            'https://github.com/railmapgen/rmg-palette/issues/new?' + fullSearchParams.toString(),
                            '_blank'
                        )
                    }
                >
                    {t('1-click open issue')}
                </Button>
            </Group>
        </>
    );
}
