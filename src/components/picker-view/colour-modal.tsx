import {
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    IconButton,
    SystemStyleObject,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CityPicker from './city-picker';
import ColourPicker from './colour-picker';
import { ColourHex, MonoColour, Theme } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import {
    RmgButtonGroup,
    RmgFields,
    RmgFieldsField,
    RmgLineBadge,
    RmgSection,
    RmgSectionHeader,
} from '@railmapgen/rmg-components';
import { useRootSelector } from '../../redux';
import { MdCircle } from 'react-icons/md';
import PantoneChecker from '../ticket-view/pantone-checker';
import PantoneInput from '../common/pantone-input';

const hexValidator = (value: string): boolean => {
    return !!value.match(/^#[0-9a-fA-F]{6}$/);
};

const styles: SystemStyleObject = {
    flexDirection: 'column',
    flex: 1,
    mx: 2,
    overflowX: 'hidden',
    overflowY: 'auto',

    '& .chakra-badge': {
        fontSize: '1em',
        width: 'fit-content',
        alignSelf: 'center',
        m: 1,
    },

    '& > section:first-of-type': {
        p: 1,
    },

    '& > section:last-of-type': {
        w: '100%',

        '& > div:last-of-type': {
            px: 2,
        },

        '& .rmg-section__header button': {
            ml: 'auto',
        },
    },
};

interface ColourModalProps {
    defaultTheme?: Theme;
    sessionId?: string;
    onSubmit?: (theme: Theme, displayName?: string) => void;
    onClose: () => void;
    onClearHistory: () => void;
}

export default function ColourModal(props: ColourModalProps) {
    const { defaultTheme, sessionId, onSubmit, onClose, onClearHistory } = props;

    const { t } = useTranslation();
    const { recentlyUsed, pantoneReady } = useRootSelector(state => state.app);

    const [cityCode, setCityCode] = useState(defaultTheme?.[0]);
    const [lineCode, setLineCode] = useState(defaultTheme?.[1]);
    const [bgColour, setBgColour] = useState(defaultTheme?.[2] || '#AAAAAA');
    const [fgColour, setFgColour] = useState(defaultTheme?.[3] || MonoColour.white);
    const [pantoneCode, setPantoneCode] = useState('');
    const [colourMode, setColourMode] = useState<'text' | 'color' | 'pantone'>('color');

    const resetPantoneInput = () => {
        setPantoneCode('');
        setColourMode(prevState => (prevState === 'pantone' ? 'color' : prevState));
    };

    useEffect(() => {
        if (sessionId && defaultTheme) {
            setCityCode(defaultTheme[0]);
            setLineCode(defaultTheme[1]);
            setBgColour(defaultTheme[2]);
            setFgColour(defaultTheme[3]);
            resetPantoneInput();
        }
    }, [sessionId, defaultTheme?.toString()]);

    const colourModeOptions = [
        { label: t('Select'), value: 'color' },
        { label: t('RGB'), value: 'text' },
        { label: t('Pantone®'), value: 'pantone', disabled: !pantoneReady },
    ];

    const fgOptions = [
        { label: t('Black'), value: MonoColour.black },
        { label: t('White'), value: MonoColour.white },
    ];

    const isSubmitEnabled = cityCode && lineCode && bgColour && fgColour && hexValidator(bgColour);

    const handleSubmit = () => {
        if (isSubmitEnabled) {
            // FIXME
            const displayName = `${cityCode} - ${lineCode}`;
            onSubmit?.([cityCode, lineCode, bgColour, fgColour], displayName);
        }
    };

    const paletteFields: RmgFieldsField[] = [
        {
            type: 'custom',
            label: t('City'),
            component: (
                <CityPicker
                    defaultValueId={cityCode}
                    onChange={value => {
                        setCityCode(value);
                        setLineCode(undefined);
                        setBgColour('#AAAAAA');
                        setFgColour(MonoColour.white);
                    }}
                />
            ),
        },
        {
            type: 'custom',
            label: t('Line'),
            component: (
                <ColourPicker
                    city={cityCode}
                    defaultValueId={lineCode}
                    onChange={(line, bg, fg, pantone) => {
                        setLineCode(line);
                        setBgColour(bg);
                        setFgColour(fg);
                        pantone && setPantoneCode(pantone);
                    }}
                    onSubmit={handleSubmit}
                />
            ),
        },
    ];

    const customFields: RmgFieldsField[] = [
        {
            type: 'custom',
            label: t('Input mode'),
            component: (
                <RmgButtonGroup
                    selections={colourModeOptions}
                    defaultValue={colourMode}
                    onChange={value => setColourMode(value as typeof colourMode)}
                />
            ),
        },
        {
            type: 'custom',
            label: t('Pantone® code'),
            component: (
                <PantoneInput
                    value={pantoneCode}
                    onChange={(value, hex) => {
                        setCityCode('other');
                        setLineCode('other');
                        setBgColour(hex);
                        setPantoneCode(value);
                    }}
                />
            ),
            hidden: colourMode !== 'pantone',
        },
        {
            type: 'input',
            label: t('Background colour'),
            variant: colourMode === 'pantone' ? 'color' : colourMode,
            value: bgColour,
            placeholder: '#F3D03E',
            validator: hexValidator,
            onChange: value => {
                setCityCode('other');
                setLineCode('other');
                setBgColour(value as ColourHex);
                resetPantoneInput();
            },
            isDisabled: colourMode === 'pantone',
        },
        {
            type: 'custom',
            label: t('Foreground colour'),
            component: (
                <RmgButtonGroup
                    selections={fgOptions}
                    defaultValue={fgColour}
                    onChange={value => {
                        setCityCode('other');
                        setLineCode('other');
                        setFgColour(value as MonoColour);
                    }}
                />
            ),
        },
    ];

    const handleApply = (theme: Theme) => {
        setCityCode(theme[0]);
        setLineCode(theme[1]);
        setBgColour(theme[2]);
        setFgColour(theme[3]);
        resetPantoneInput();
    };

    return (
        <>
            <Flex sx={styles}>
                <RmgLineBadge name={t('Example')} fg={fgColour} bg={bgColour} />

                <RmgSection>
                    <PantoneChecker hidden={true} />
                    <RmgFields fields={paletteFields} />
                    <RmgFields fields={customFields} />
                </RmgSection>

                <section>
                    <RmgSectionHeader>
                        <Heading as="h5" size="xs">
                            {t('Recently used')}
                        </Heading>

                        <Button variant="ghost" size="xs" onClick={onClearHistory}>
                            {t('Clear')}
                        </Button>
                    </RmgSectionHeader>

                    <Wrap>
                        {recentlyUsed.map(({ theme, displayName }) => (
                            <WrapItem key={theme.join('-')}>
                                <IconButton
                                    size="xs"
                                    aria-label={t('Apply')}
                                    title={displayName}
                                    mt="0.45px"
                                    color={theme[3]}
                                    bg={theme[2]}
                                    icon={<MdCircle />}
                                    onClick={() => handleApply(theme)}
                                />
                            </WrapItem>
                        ))}
                    </Wrap>
                </section>
            </Flex>

            <Divider />

            <HStack p={2} justifyContent="flex-end">
                <Button size="sm" onClick={onClose}>
                    {t('Cancel')}
                </Button>
                <Button size="sm" colorScheme="primary" onClick={handleSubmit} isDisabled={!isSubmitEnabled}>
                    {t('Confirm')}
                </Button>
            </HStack>
        </>
    );
}
