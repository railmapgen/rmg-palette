import {
    Button,
    Divider,
    Heading,
    HStack,
    IconButton,
    SystemStyleObject,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CityPicker from './city-picker';
import ColourPicker from './colour-picker';
import { ColourHex, MonoColour, Theme } from '@railmapgen/rmg-palette-resources';
import { useTranslation } from 'react-i18next';
import { RmgButtonGroup, RmgFields, RmgFieldsField, RmgLineBadge } from '@railmapgen/rmg-components';
import { useRootSelector } from '../../redux';
import { MdCircle } from 'react-icons/md';

const hexValidator = (value: string): boolean => {
    return !!value.match(/^#[0-9a-fA-F]{6}$/);
};

const styles: SystemStyleObject = {
    flex: 1,
    mx: 2,

    '& .chakra-badge': {
        fontSize: '1em',
    },

    '& > .chakra-stack': {
        w: '100%',
        p: 2,

        '& > div': {
            w: '100%',
        },
    },

    '& h5': {
        alignSelf: 'flex-start',
    },
};

interface ColourModalProps {
    defaultTheme?: Theme;
    sessionId?: string;
    onSubmit?: (theme: Theme, displayName?: string) => void;
    onClose: () => void;
}

export default function ColourModal(props: ColourModalProps) {
    const { defaultTheme, sessionId, onSubmit, onClose } = props;

    const { t } = useTranslation();
    const { recentlyUsed } = useRootSelector(state => state.app);

    const [cityCode, setCityCode] = useState(defaultTheme?.[0]);
    const [lineCode, setLineCode] = useState(defaultTheme?.[1]);
    const [bgColour, setBgColour] = useState(defaultTheme?.[2] || '#AAAAAA');
    const [fgColour, setFgColour] = useState(defaultTheme?.[3] || MonoColour.white);
    const [colourMode, setColourMode] = useState<'text' | 'color'>('color');

    useEffect(() => {
        if (sessionId && defaultTheme) {
            setCityCode(defaultTheme[0]);
            setLineCode(defaultTheme[1]);
            setBgColour(defaultTheme[2]);
            setFgColour(defaultTheme[3]);
        }
    }, [sessionId, defaultTheme?.toString()]);

    const colourModeOptions = [
        { label: t('Select'), value: 'color' },
        { label: t('Key in'), value: 'text' },
    ];

    const fgOptions = [
        { label: t('Black'), value: MonoColour.black },
        { label: t('White'), value: MonoColour.white },
    ];

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
                    onChange={(line, bg, fg) => {
                        setLineCode(line);
                        setBgColour(bg);
                        setFgColour(fg);
                    }}
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
            type: 'input',
            label: t('Background colour'),
            variant: colourMode,
            value: bgColour,
            placeholder: '#F3D03E',
            validator: hexValidator,
            onChange: value => {
                setCityCode('other');
                setLineCode('other');
                setBgColour(value as ColourHex);
            },
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

    const isSubmitEnabled = cityCode && lineCode && bgColour && fgColour && hexValidator(bgColour);

    const handleSubmit = () => {
        if (isSubmitEnabled) {
            // FIXME
            const displayName = `${cityCode} - ${lineCode}`;
            onSubmit?.([cityCode, lineCode, bgColour, fgColour], displayName);
        }
    };

    const handleApply = (theme: Theme) => {
        setCityCode(theme[0]);
        setLineCode(theme[1]);
        setBgColour(theme[2]);
        setFgColour(theme[3]);
    };

    return (
        <>
            <VStack sx={styles}>
                <RmgLineBadge name={t('Example')} fg={fgColour} bg={bgColour} />

                <VStack>
                    <RmgFields fields={paletteFields} />
                    <RmgFields fields={customFields} />
                </VStack>

                <VStack>
                    <Heading as="h5" size="xs">
                        {t('Recently used')}
                    </Heading>
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
                </VStack>
            </VStack>

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
