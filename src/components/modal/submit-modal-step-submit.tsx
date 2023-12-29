import {
    Button,
    Icon,
    Link,
    ListItem,
    ModalBody,
    ModalFooter,
    OrderedList,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdChevronLeft, MdContentCopy, MdOpenInNew } from 'react-icons/md';
import { RmgDebouncedTextarea } from '@railmapgen/rmg-components';
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
    const translateName = useTranslatedName();

    const linkColour = useColorModeValue('primary.500', 'primary.300');
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
            <ModalBody>
                <Text>{t("If the button below doesn't work for you, please follow the instructions below:")}</Text>
                <OrderedList>
                    <ListItem>
                        {t('Open')}{' '}
                        <Link
                            color={linkColour}
                            href={
                                'https://github.com/railmapgen/rmg-palette/issues/new?' + manualSearchParams.toString()
                            }
                            isExternal={true}
                        >
                            Issue: New Palettes Request <Icon as={MdOpenInNew} />
                        </Link>
                    </ListItem>
                    <ListItem>
                        {t('Paste following text to the issue body')}{' '}
                        <Button size="xs" leftIcon={<MdContentCopy />} onClick={handleCopy}>
                            {t('Copy')}
                        </Button>
                        <RmgDebouncedTextarea
                            ref={textareaRef}
                            isReadOnly={true}
                            defaultValue={issueBody}
                            onClick={({ target }) => (target as HTMLTextAreaElement).select()}
                        />
                    </ListItem>
                </OrderedList>
            </ModalBody>
            <ModalFooter>
                <Button variant="ghost" onClick={onPrev} mr="auto" leftIcon={<MdChevronLeft />}>
                    {t('Previous')}
                </Button>
                <Button
                    colorScheme="primary"
                    onClick={() =>
                        window.open(
                            'https://github.com/railmapgen/rmg-palette/issues/new?' + fullSearchParams.toString(),
                            '_blank'
                        )
                    }
                >
                    {t('1-click open issue')}
                </Button>
            </ModalFooter>
        </>
    );
}
